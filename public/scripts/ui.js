import { saveToHistory } from './history.js';
import { addBookmark, isBookmarked, removeBookmarkByCommandId } from './bookmarks.js';

let appState = null;

/**
 * Initialize UI functionality
 */
export function initializeUI(state) {
	appState = state;

	const commandCard = document.getElementById('command-card');
	const closeButton = document.getElementById('close-card');
	const copyButton = document.getElementById('copy-button');
	const bookmarkButton = document.getElementById('bookmark-command-button');
	const commandPreview = document.getElementById('command-preview');
	const globalIndexInput = document.getElementById('global-index-input');

	// Listen for command selection
	document.addEventListener('command-selected', (e) => {
		showCommandCard(e.detail);
	});

	// Close button handler
	closeButton.addEventListener('click', () => {
		hideCommandCard();
	});

	// Copy button handler
	copyButton.addEventListener('click', () => {
		copyCommand();
	});

	// Bookmark button handler
	bookmarkButton.addEventListener('click', () => {
		bookmarkCommand();
	});

	// Click on command preview to select text
	commandPreview.addEventListener('click', () => {
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(commandPreview);
		selection.removeAllRanges();
		selection.addRange(range);
	});

	// Global index input handler
	globalIndexInput.addEventListener('input', () => {
		// If a command card is open, rebuild command with new global index
		if (appState.currentCommand) {
			buildCommand();
		}
	});
}

/**
 * Show command card with details
 */
export function showCommandCard(command) {
	const commandCard = document.getElementById('command-card');
	const cardTitle = document.getElementById('card-title');
	const cardDescription = document.getElementById('card-description');
	const cardContent = document.getElementById('card-content');

	// Store command in state
	appState.currentCommand = command;

	// Set title and description
	cardTitle.textContent = command.name;
	cardDescription.textContent = command.description;

	// Clear previous content
	cardContent.innerHTML = '';

	// Render presets if available
	if (command.presets && command.presets.length > 0) {
		renderPresets(command.presets, command, cardContent);
	}

	// Render parameters
	if (command.params) {
		renderParams(command.params, cardContent);
	}

	// Render flags
	if (command.flags) {
		renderFlags(command.flags, cardContent);
	}

	// Render mezz analyzer for getblademezzstatus and show system fpga health commands
	if (command.id === 'getblademezzstatus' || command.base.includes('getblademezzstatus') ||
	    command.id === 'show-system-fpga-health' || command.base.includes('show system fpga health')) {
		renderMezzAnalyzer(cardContent, command.name);
	}

	// Show the card
	commandCard.classList.remove('hidden');

	// Move card to top position (first in #cards)
	const cardsContainer = document.getElementById('cards');
	if (cardsContainer && cardsContainer.firstChild !== commandCard) {
		cardsContainer.insertBefore(commandCard, cardsContainer.firstChild);
	}

	// Update bookmark button state
	updateBookmarkButtonState(command.id);

	// Build and display initial command
	buildCommand();
}

/**
 * Hide command card
 */
function hideCommandCard() {
	const commandCard = document.getElementById('command-card');
	commandCard.classList.add('hidden');
	appState.currentCommand = null;
}

/**
 * Render preset buttons
 */
function renderPresets(presets, command, container) {
	const presetsDiv = document.createElement('div');
	presetsDiv.className = 'preset-buttons';

	for (const preset of presets) {
		const button = document.createElement('button');
		button.className = 'btn btn-primary btn-sm';
		button.textContent = preset.label;

		button.addEventListener('click', () => {
			applyPreset(preset.values, command);
		});

		presetsDiv.appendChild(button);
	}

	container.appendChild(presetsDiv);
}

/**
 * Apply preset values to inputs
 */
function applyPreset(values, command) {
	for (const [key, value] of Object.entries(values)) {
		const input = document.querySelector(`[data-param="${key}"]`);
		if (input) {
			input.value = value;
			buildCommand();
		}
	}
}

/**
 * Render parameters
 */
function renderParams(params, container) {
	// Create container for two-column grid
	const inputGroupsContainer = document.createElement('div');
	inputGroupsContainer.className = 'input-groups-container';

	for (const [key, param] of Object.entries(params)) {
		// Skip blade index parameter (handled by global input field)
		if (key === 'i' && (param.description === 'Blade index' || param.description === 'Global blade index')) {
			continue;
		}

		const inputGroup = document.createElement('div');
		inputGroup.className = 'input-group';

		const label = document.createElement('label');
		label.textContent = `${param.description || param.flag}${param.required ? ' *' : ''}`;
		inputGroup.appendChild(label);

		const input = document.createElement('input');
		input.type = 'text';
		input.placeholder = param.placeholder || '';
		input.dataset.param = key;
		input.dataset.flag = param.flag;
		input.dataset.required = param.required || false;

		if (param.default) {
			input.value = param.default;
		}

		input.addEventListener('input', () => {
			buildCommand();
		});

		inputGroup.appendChild(input);
		inputGroupsContainer.appendChild(inputGroup);
	}

	// Only append if there are any input groups
	if (inputGroupsContainer.children.length > 0) {
		container.appendChild(inputGroupsContainer);
	}
}

/**
 * Render flags (checkboxes)
 */
function renderFlags(flags, container) {
	// Create container for flags
	const flagsContainer = document.createElement('div');
	flagsContainer.className = 'flags-container';

	// Add title
	const title = document.createElement('div');
	title.className = 'flags-container-title';
	title.textContent = 'Flags';
	flagsContainer.appendChild(title);

	for (const [key, flag] of Object.entries(flags)) {
		const checkboxGroup = document.createElement('div');
		checkboxGroup.className = 'checkbox-group';

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = `flag-${key}`;
		checkbox.dataset.flag = flag.flag;

		if (flag.default) {
			checkbox.checked = true;
		}

		checkbox.addEventListener('change', () => {
			buildCommand();
		});

		const label = document.createElement('label');
		label.htmlFor = `flag-${key}`;
		label.textContent = `${flag.flag} - ${flag.description}`;

		checkboxGroup.appendChild(checkbox);
		checkboxGroup.appendChild(label);
		flagsContainer.appendChild(checkboxGroup);
	}

	container.appendChild(flagsContainer);
}

/**
 * Syntax highlight a command string
 * @param {string} commandString - Full command string
 * @param {string} baseCommand - The base command (e.g., "show network ping")
 */
function highlightSyntax(commandString, baseCommand = '') {
	const tokens = [];
	let i = 0;

	// Track position relative to base command
	const baseLength = baseCommand.length;
	let inBaseCommand = baseLength > 0;

	while (i < commandString.length) {
		// Skip whitespace
		if (/\s/.test(commandString[i])) {
			tokens.push(commandString[i]);
			i++;
			continue;
		}

		// Check for quoted strings (only after base command)
		if (!inBaseCommand && (commandString[i] === '"' || commandString[i] === "'")) {
			const quote = commandString[i];
			let str = quote;
			i++;
			while (i < commandString.length && commandString[i] !== quote) {
				str += commandString[i];
				i++;
			}
			if (i < commandString.length) {
				str += commandString[i];
				i++;
			}
			tokens.push({ type: 'string', value: str });
			continue;
		}

		// Read word
		let word = '';
		while (i < commandString.length && !/\s/.test(commandString[i])) {
			word += commandString[i];
			i++;
		}

		// Check if we're still within base command
		if (inBaseCommand && i <= baseLength) {
			tokens.push({ type: 'command', value: word });
			// Check if we've passed the base command
			if (i >= baseLength) {
				inBaseCommand = false;
			}
		}
		// Classify word after base command
		else if (word.startsWith('-')) {
			tokens.push({ type: 'flag', value: word });
		} else if (/^\d+$/.test(word)) {
			tokens.push({ type: 'number', value: word });
		} else {
			// Everything else is text (value after flag)
			tokens.push({ type: 'text', value: word });
		}
	}

	// Build HTML
	return tokens.map(token => {
		if (typeof token === 'string') {
			return token;
		}
		return `<span class="syntax-${token.type}">${escapeHtml(token.value)}</span>`;
	}).join('');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}

/**
 * Build command string from inputs
 */
function buildCommand() {
	const command = appState.currentCommand;
	if (!command) return;

	let commandString = command.base;

	// Check if command has blade index parameter and add from global input
	const globalIndexInput = document.getElementById('global-index-input');
	if (command.params && command.params.i &&
	    (command.params.i.description === 'Blade index' || command.params.i.description === 'Global blade index')) {
		if (globalIndexInput.value.trim()) {
			commandString += ` ${command.params.i.flag} ${globalIndexInput.value.trim()}`;
		}
	}

	// Add parameters
	const paramInputs = document.querySelectorAll('[data-param]');
	paramInputs.forEach(input => {
		if (input.value.trim()) {
			const flag = input.dataset.flag;
			commandString += ` ${flag} ${input.value.trim()}`;
		}
	});

	// Add flags
	const flagCheckboxes = document.querySelectorAll('input[type="checkbox"][data-flag]');
	flagCheckboxes.forEach(checkbox => {
		if (checkbox.checked) {
			commandString += ` ${checkbox.dataset.flag}`;
		}
	});

	// Update preview with syntax highlighting
	const commandPreview = document.getElementById('command-preview');
	commandPreview.innerHTML = highlightSyntax(commandString, command.base);
	commandPreview.dataset.plainText = commandString;

	// Dispatch event for command builder
	const event = new CustomEvent('command-built', { detail: commandString });
	document.dispatchEvent(event);
}

/**
 * Copy command to clipboard
 */
function copyCommand() {
	const commandPreview = document.getElementById('command-preview');
	const copyButton = document.getElementById('copy-button');

	// Get plain text command
	const command = commandPreview.dataset.plainText || commandPreview.textContent;

	// Copy to clipboard using modern API
	navigator.clipboard.writeText(command).then(() => {
		// Save to history
		if (appState.currentCommand) {
			const commandName = appState.currentCommand.name;
			const commandId = appState.currentCommand.id;
			const generation = appState.activeGeneration || 'legacy';

			saveToHistory(command, commandName, generation, commandId);
		}

		// Visual feedback
		const originalText = copyButton.textContent;
		copyButton.textContent = 'Copied!';
		copyButton.classList.add('copied');

		setTimeout(() => {
			copyButton.textContent = originalText;
			copyButton.classList.remove('copied');
		}, 1500);
	}).catch(err => {
		console.error('Failed to copy:', err);
	});
}

/**
 * Update bookmark button state based on whether command is bookmarked
 */
function updateBookmarkButtonState(commandId) {
	const bookmarkButton = document.getElementById('bookmark-command-button');
	const bookmarked = isBookmarked(commandId);

	if (bookmarked) {
		bookmarkButton.classList.remove('btn-secondary');
		bookmarkButton.classList.add('btn-bookmarked');
		bookmarkButton.title = 'Remove Bookmark';
	} else {
		bookmarkButton.classList.remove('btn-bookmarked');
		bookmarkButton.classList.add('btn-secondary');
		bookmarkButton.title = 'Bookmark';
	}
}

/**
 * Toggle bookmark for current command
 */
function bookmarkCommand() {
	const commandPreview = document.getElementById('command-preview');

	// Get plain text command
	const command = commandPreview.dataset.plainText || commandPreview.textContent;

	if (!command || !appState.currentCommand) {
		return;
	}

	const commandName = appState.currentCommand.name;
	const commandId = appState.currentCommand.id;
	const generation = appState.activeGeneration || 'legacy';

	// Check if already bookmarked - toggle
	if (isBookmarked(commandId)) {
		removeBookmarkByCommandId(commandId);
	} else {
		addBookmark(command, commandName, generation, commandId);
	}

	// Update button state
	updateBookmarkButtonState(commandId);
}

/**
 * Render mezz analyzer section for commands with FPGA health output
 */
function renderMezzAnalyzer(container, commandName = 'this command') {
	const analyzerDiv = document.createElement('div');
	analyzerDiv.className = 'mezz-analyzer';

	analyzerDiv.innerHTML = `
		<div class="mezz-analyzer-title">Paste Status Output for Analysis</div>
		<textarea id="mezzStatusInput" class="mezz-textarea" placeholder="Paste the output of ${commandName} here..."></textarea>
		<div id="mezzStatusResults" class="mezz-results"></div>
	`;

	container.appendChild(analyzerDiv);

	// Initialize auto-analysis
	const textarea = analyzerDiv.querySelector('#mezzStatusInput');
	let debounceTimer;

	// Auto-analyze on input with debounce
	textarea.addEventListener('input', () => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			analyzeBlademezzStatus();
		}, 500);
	});

	// Immediate analysis on paste
	textarea.addEventListener('paste', () => {
		setTimeout(() => {
			analyzeBlademezzStatus();
		}, 100);
	});
}

/**
 * Analyze Blade Mezz Status output
 */
function analyzeBlademezzStatus() {
	const input = document.getElementById('mezzStatusInput').value;
	const resultsDiv = document.getElementById('mezzStatusResults');

	if (!input.trim()) {
		resultsDiv.innerHTML = '';
		return;
	}

	// Helper function to parse boolean value - returns true/false/null
	function parseBool(pattern) {
		const match = pattern.exec(input);
		if (!match) return null;
		return match[1].toLowerCase() === 'true';
	}

	// Parse the status values using regex
	const status = {
		pcieLane0Up: parseBool(/Pcie\s+Lane\s+0\s+Up\s*=\s*(True|False)/i),
		pcieLane1Up: parseBool(/Pcie\s+Lane\s+1\s+Up\s*=\s*(True|False)/i),
		networkLink0Up: parseBool(/Network\s+Link\s+0\s+Up\s*=\s*(True|False)/i),
		networkLink0Tx: parseBool(/Network\s+Link\s+0\s+Tx\s+Activity\s*=\s*(True|False)/i),
		networkLink0Rx: parseBool(/Network\s+Link\s+0\s+Rx\s+Activity\s*=\s*(True|False)/i),
		networkLink1Up: parseBool(/Network\s+Link\s+1\s+Up\s*=\s*(True|False)/i),
		networkLink1Tx: parseBool(/Network\s+Link\s+1\s+Tx\s+Activity\s*=\s*(True|False)/i),
		networkLink1Rx: parseBool(/Network\s+Link\s+1\s+Rx\s+Activity\s*=\s*(True|False)/i),
		statusCode: /Status\s*=\s*(0x[0-9A-Fa-f]+)/i.exec(input)?.[1]?.toUpperCase()
	};

	// Check if we found any values
	const hasData = Object.values(status).some(val => val !== null);
	if (!hasData) {
		resultsDiv.innerHTML = '<div class="mezz-error">Could not parse status values. Please check the format.<br><br>Expected format:<br>Pcie Lane 0 Up = True<br>Network Link 0 Up = False<br>etc.</div>';
		return;
	}

	// Determine fault condition
	let diagnosis = '';
	let severity = '';
	let recommendation = '';

	// Rule 1: Bad Loop back cable - Link 0 down with Tx only, Link 1 up with Rx only
	if (status.pcieLane0Up === true && status.pcieLane1Up === true &&
	    status.networkLink0Up === false && status.networkLink0Tx === true && status.networkLink0Rx === false &&
	    status.networkLink1Up === true && status.networkLink1Tx === false && status.networkLink1Rx === true) {
		diagnosis = 'Bad Loop Back Cable';
		severity = 'fault';
		recommendation = 'Replace the loop back cable from the NIC to the network interface.';
	}
	// Rule 2: Network Cable to Backplane/Switch Port - All network links down
	else if (status.pcieLane0Up === true && status.pcieLane1Up === true &&
	         status.networkLink0Up === false && status.networkLink0Tx === false && status.networkLink0Rx === false &&
	         status.networkLink1Up === false && status.networkLink1Tx === false && status.networkLink1Rx === false) {
		diagnosis = 'Network Cable to Backplane/Switch Port Issue';
		severity = 'fault';
		recommendation = 'Check the network cable connection from the blade to the backplane or switch port.';
	}
	// Rule 3: Bad Motherboard/NIC/Backplane - PCIe lanes down (network links don\'t matter)
	else if (status.pcieLane0Up === false && status.pcieLane1Up === false) {
		diagnosis = 'Bad Motherboard, NIC, or Backplane';
		severity = 'fault';
		recommendation = 'Hardware failure detected. PCIe lanes are down. Check the motherboard, NIC card, or backplane. May require component replacement.';
	}
	// Rule 4: Reseat all DAC Cables - Links up but Rx/Tx issues, Status = 0xAF
	else if (status.pcieLane0Up === true && status.pcieLane1Up === true &&
	         status.networkLink0Up === true && status.networkLink0Tx === true && status.networkLink0Rx === false &&
	         status.networkLink1Up === true && status.networkLink1Tx === false && status.networkLink1Rx === true &&
	         status.statusCode === '0XAF') {
		diagnosis = 'Reseat All DAC Cables';
		severity = 'warning';
		recommendation = 'Network links are up but showing Tx/Rx activity issues. Reseat all DAC cable connections.';
	}
	// Rule 5: Good Status - All links up and functioning
	else if (status.pcieLane0Up === true && status.pcieLane1Up === true &&
	         status.networkLink0Up === true && status.networkLink1Up === true &&
	         status.networkLink0Tx === true && status.networkLink0Rx === true &&
	         status.networkLink1Tx === true && status.networkLink1Rx === true) {
		diagnosis = 'Good Status';
		severity = 'good';
		recommendation = 'System is functioning properly. Both PCIe lanes and network links are up with full activity.';
	}
	// Default: Unknown condition
	else {
		diagnosis = 'Unknown Condition';
		severity = 'warning';
		recommendation = 'The status does not match known fault patterns. Review the values manually or consult documentation.';
	}

	// Build results HTML
	resultsDiv.innerHTML = `
		<div class="mezz-diagnosis mezz-${severity}">
			<h3>${diagnosis}</h3>
			<p>${recommendation}</p>
		</div>
	`;
}
