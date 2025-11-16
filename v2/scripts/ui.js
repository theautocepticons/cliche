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
		commandPreview.select();
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
		button.className = 'preset-button';
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

	// Update preview
	const commandPreview = document.getElementById('command-preview');
	commandPreview.value = commandString;

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

	// Select and copy
	commandPreview.select();
	document.execCommand('copy');

	// Save to history
	if (appState.currentCommand) {
		const command = commandPreview.value;
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
}
