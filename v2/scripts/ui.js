import { saveToHistory } from './history.js';

let appState = null;

/**
 * Initialize UI functionality
 */
export function initializeUI(state) {
	appState = state;

	const commandCard = document.getElementById('command-card');
	const closeButton = document.getElementById('close-card');
	const copyButton = document.getElementById('copy-button');
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

	// Show the card
	commandCard.classList.remove('hidden');

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
		if (key === 'i' && param.description === 'Blade index') {
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
 */
function highlightSyntax(commandString) {
	const tokens = [];
	let i = 0;

	while (i < commandString.length) {
		// Skip whitespace
		if (/\s/.test(commandString[i])) {
			tokens.push(commandString[i]);
			i++;
			continue;
		}

		// Check for quoted strings
		if (commandString[i] === '"' || commandString[i] === "'") {
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

		// Classify word
		if (word.startsWith('-')) {
			tokens.push({ type: 'flag', value: word });
		} else if (/^\d+$/.test(word)) {
			tokens.push({ type: 'number', value: word });
		} else if (tokens.length === 0 || (tokens.length === 1 && typeof tokens[0] === 'string')) {
			// First non-whitespace token is the command
			tokens.push({ type: 'command', value: word });
		} else {
			// Everything else is text
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
	if (command.params && command.params.i && command.params.i.description === 'Blade index') {
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
	commandPreview.innerHTML = highlightSyntax(commandString);
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
