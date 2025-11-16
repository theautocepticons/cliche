let appState = null;

/**
 * Initialize command builder
 */
export function initializeCommandBuilder(state) {
	appState = state;

	// Listen for command built events
	document.addEventListener('command-built', (e) => {
		const commandString = e.detail;
		validateCommand(commandString);
	});
}

/**
 * Validate command (check required fields, etc.)
 */
function validateCommand(commandString) {
	const command = appState.currentCommand;
	if (!command) return true;

	let isValid = true;
	const missingFields = [];

	// Check required parameters
	if (command.params) {
		for (const [key, param] of Object.entries(command.params)) {
			if (param.required) {
				const input = document.querySelector(`[data-param="${key}"]`);
				if (!input || !input.value.trim()) {
					isValid = false;
					missingFields.push(param.description || param.flag);
				}
			}
		}
	}

	// Could add visual feedback for validation here
	// For now, just log if invalid
	if (!isValid) {
		console.log('Missing required fields:', missingFields);
	}

	return isValid;
}

/**
 * Build command from command object and values
 * This is a utility function that can be used programmatically
 */
export function buildCommandString(command, paramValues = {}, flagValues = {}) {
	let commandString = command.base;

	// Add parameters
	if (command.params) {
		for (const [key, param] of Object.entries(command.params)) {
			if (paramValues[key]) {
				commandString += ` ${param.flag} ${paramValues[key]}`;
			}
		}
	}

	// Add flags
	if (command.flags) {
		for (const [key, flag] of Object.entries(command.flags)) {
			if (flagValues[key]) {
				commandString += ` ${flag.flag}`;
			}
		}
	}

	return commandString;
}

/**
 * Parse command string back into components
 * Useful for pre-populating fields from a command string
 */
export function parseCommandString(commandString, command) {
	const parts = commandString.split(/\s+/);
	const paramValues = {};
	const flagValues = {};

	for (let i = 1; i < parts.length; i++) {
		const part = parts[i];

		// Check if it's a parameter
		if (command.params) {
			for (const [key, param] of Object.entries(command.params)) {
				if (part === param.flag && i + 1 < parts.length) {
					paramValues[key] = parts[i + 1];
					i++; // Skip next part
					break;
				}
			}
		}

		// Check if it's a flag
		if (command.flags) {
			for (const [key, flag] of Object.entries(command.flags)) {
				if (part === flag.flag) {
					flagValues[key] = true;
					break;
				}
			}
		}
	}

	return { paramValues, flagValues };
}
