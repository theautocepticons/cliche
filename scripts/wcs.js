// Theme toggle functionality
function toggleTheme() {
	const body = document.body;
	const button = document.getElementById('themeToggle');
	const currentTheme = body.getAttribute('data-theme');
	const newTheme = currentTheme === 'light' ? 'dark' : 'light';
	body.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme);
	button.textContent = newTheme === 'light' ? '🌙' : '☀️';
}

// Tab switching functionality
let activeTab = 'gen5'; // Default tab
const tabOrder = ['gen5', 'gen6', 'sac', 'fru'];

function switchTab(tabId) {
	const previousTab = activeTab;

	// Calculate direction based on tab order
	const previousIndex = tabOrder.indexOf(previousTab);
	const newIndex = tabOrder.indexOf(tabId);
	const direction = newIndex > previousIndex ? 'right' : 'left';

	activeTab = tabId;

	// Update active button
	document.querySelectorAll('.tab-btn').forEach(btn => {
		btn.classList.remove('active');
	});
	document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');

	// Filter commands based on active tab with animation
	filterCommandsByTab(direction);

	// Reapply search if there's an active search term
	const searchInput = document.getElementById('searchInput');
	if (searchInput && searchInput.value.trim()) {
		searchInput.dispatchEvent(new Event('input'));
	}

	// Save to localStorage
	localStorage.setItem('activeTab', tabId);
}

function filterCommandsByTab(direction) {
	const tabContents = document.querySelectorAll('.tab-content');
	const mainContent = document.querySelector('.main-content');

	if (!direction) {
		// No animation - just show/hide (for initial load)
		tabContents.forEach(tabContent => {
			const generation = tabContent.getAttribute('data-generation');
			if (generation === activeTab) {
				tabContent.classList.remove('hidden');
			} else {
				tabContent.classList.add('hidden');
			}
		});
		return;
	}

	// Container-based smooth transition
	const tabContentsArray = Array.from(tabContents);
	const oldContainer = tabContentsArray.find(tab => !tab.classList.contains('hidden'));
	const newContainer = tabContentsArray.find(tab => tab.getAttribute('data-generation') === activeTab);

	if (!oldContainer || !newContainer) return;

	// Save current height to prevent container collapse
	const currentHeight = mainContent.offsetHeight;
	mainContent.style.minHeight = `${currentHeight}px`;

	// Force a reflow to ensure minHeight is applied before animations start
	void mainContent.offsetHeight;

	// Clean up any existing animation classes
	tabContentsArray.forEach(tabContent => {
		tabContent.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
	});

	// Slide out old container
	const slideOutClass = direction === 'right' ? 'slide-out-left' : 'slide-out-right';
	oldContainer.classList.add(slideOutClass);

	// Slide in new container
	const slideInClass = direction === 'right' ? 'slide-in-right' : 'slide-in-left';
	newContainer.classList.remove('hidden');
	newContainer.classList.add(slideInClass);

	// Clean up after animation completes
	const animationDuration = 400;
	setTimeout(() => {
		oldContainer.classList.add('hidden');
		oldContainer.classList.remove(slideOutClass);
		newContainer.classList.remove(slideInClass);

		// Release the height constraint after animation
		mainContent.style.minHeight = '';
	}, animationDuration);
}

function initTabSwitching() {
	// Load saved tab or use default
	const savedTab = localStorage.getItem('activeTab') || 'gen5';
	activeTab = savedTab;

	// Set active button
	document.querySelectorAll('.tab-btn').forEach(btn => {
		btn.classList.remove('active');
		if (btn.getAttribute('data-tab') === savedTab) {
			btn.classList.add('active');
		}
	});

	// Add click listeners to tab buttons
	document.querySelectorAll('.tab-btn').forEach(btn => {
		btn.addEventListener('click', function() {
			switchTab(this.getAttribute('data-tab'));
		});
	});

	// Filter commands initially
	filterCommandsByTab();
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
	const savedTheme = localStorage.getItem('theme') || 'light';
	document.body.setAttribute('data-theme', savedTheme);

	// Set theme toggle button emoji
	const button = document.getElementById('themeToggle');
	button.textContent = savedTheme === 'light' ? '🌙' : '☀️';

	// Initialize tab switching
	initTabSwitching();

	// Initialize command builders
	initCMConnectionListeners();
	initBIOSConfigListeners();
	initNextBootListeners();
	initSetNICListeners();
	initBladeInfoListeners();
	initBladeHealthListeners();
	initChassisHealthListeners();
	initChassisInfoListeners();

	// Initialize global index listener
	initGlobalIndexListener();

	// Initialize fuzzy search
	initFuzzySearch();

	// Initialize Blade Mezz auto-analyzer
	initMezzAnalyzer();
});

// Fuzzy search functionality
function initFuzzySearch() {
	const searchInput = document.getElementById('searchInput');

	searchInput.addEventListener('input', function() {
		const searchTerm = this.value.toLowerCase().trim();

		// Get the active tab container
		const activeTabContainer = document.querySelector(`.tab-content[data-generation="${activeTab}"]`);
		if (!activeTabContainer) return;

		const commands = activeTabContainer.querySelectorAll('.command');

		if (searchTerm === '') {
			// If no search term, show all commands in active tab
			commands.forEach(command => {
				command.style.display = '';
			});
			return;
		}

		// Search within commands in the active tab
		commands.forEach(command => {
			const commandName = command.querySelector('h2')?.textContent.toLowerCase() || '';
			const commandDisplays = Array.from(command.querySelectorAll('.command-display'));
			const commandValues = commandDisplays.map(el => el.value.toLowerCase()).join(' ');
			const description = command.querySelector('[style*="background-color: var(--bg-tertiary)"]')?.textContent.toLowerCase() || '';

			// Get all checkbox labels
			const checkboxLabels = Array.from(command.querySelectorAll('.checkbox-group label'));
			const checkboxText = checkboxLabels.map(label => label.textContent.toLowerCase()).join(' ');

			// Get all option group labels
			const optionLabels = Array.from(command.querySelectorAll('.option-group label'));
			const optionText = optionLabels.map(label => label.textContent.toLowerCase()).join(' ');

			// Get preset button text
			const presetButtons = Array.from(command.querySelectorAll('.preset-btn'));
			const presetText = presetButtons.map(btn => btn.textContent.toLowerCase()).join(' ');

			const matches = commandName.includes(searchTerm) ||
			                commandValues.includes(searchTerm) ||
			                description.includes(searchTerm) ||
			                checkboxText.includes(searchTerm) ||
			                optionText.includes(searchTerm) ||
			                presetText.includes(searchTerm);

			if (matches) {
				command.style.display = '';
			} else {
				command.style.display = 'none';
			}
		});
	});

	// Navigate to first visible command on Enter
	searchInput.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') {
			const activeTabContainer = document.querySelector(`.tab-content[data-generation="${activeTab}"]`);
			if (!activeTabContainer) return;

			const commands = activeTabContainer.querySelectorAll('.command');
			const firstVisible = Array.from(commands).find(cmd => cmd.style.display !== 'none');
			if (firstVisible) {
				firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}
	});
}

// Copy command to clipboard
function copyCommand(button) {
	const commandDiv = button.closest('.command');
	const commandDisplay = commandDiv.querySelector('.command-display');

	// Select and copy the text
	commandDisplay.select();
	document.execCommand('copy');

	// Visual feedback
	const originalText = button.textContent;
	button.textContent = 'Copied!';
	button.style.backgroundColor = '#10b981';

	setTimeout(() => {
		button.textContent = originalText;
		button.style.backgroundColor = '';
	}, 1500);
}

// Build CM Connection command
function buildCMConnectionCommand() {
	const cmCommand = document.querySelector('.command[data-command="cm-connection"]');
	const display = cmCommand.querySelector('.command-display');

	let command = `-establishcmconnection`;

	// Get input values
	const port = cmCommand.querySelector('input[placeholder*="Port"]').value;
	const username = cmCommand.querySelector('input[placeholder*="Username"]').value;
	const password = cmCommand.querySelector('input[placeholder*="Password"]').value;
	const mask = cmCommand.querySelector('input[placeholder*="Mask"]').value;
	const sslEnabled = cmCommand.querySelector('#cm-flag-s').checked;

	// Add flags
	if (port) command += ` -p ${port}`;
	command += ` -s ${sslEnabled ? '1' : '0'}`;
	if (mask) command += ` -m ${mask}`;
	if (username) command += ` -u ${username}`;
	if (password) command += ` -x ${password}`;

	display.value = command;
}

// Apply CM credential preset
function applyCMPreset(username, password) {
	const cmCommand = document.querySelector('.command[data-command="cm-connection"]');
	cmCommand.querySelector('input[placeholder*="Username"]').value = username;
	cmCommand.querySelector('input[placeholder*="Password"]').value = password;
	buildCMConnectionCommand();
}

// Initialize CM Connection command listeners
function initCMConnectionListeners() {
	const cmCommand = document.querySelector('.command[data-command="cm-connection"]');
	if (!cmCommand) return;

	// Add listeners to all inputs
	const inputs = cmCommand.querySelectorAll('input[type="text"], input[type="password"], input[type="checkbox"]');
	inputs.forEach(input => {
		input.addEventListener('input', buildCMConnectionCommand);
		input.addEventListener('change', buildCMConnectionCommand);
	});

	// Build initial command
	buildCMConnectionCommand();
}

// Build BIOS Config command
function buildBIOSConfigCommand() {
	const biosCommand = document.querySelector('.command[data-command="bios-config"]');
	const displays = biosCommand.querySelectorAll('.command-display');
	const getDisplay = displays[0]; // First display is the GET command
	const setDisplay = displays[1]; // Second display is the SET command

	let getCommand = `-getbladebiosconfig -i`;
	let setCommand = `-setbladebiosconfig -i`;

	// Get input values
	const jValue = biosCommand.querySelector('input[data-flag="j"]').value;
	const nValue = biosCommand.querySelector('input[data-flag="n"]').value;

	// Add flags
	if (jValue) setCommand += ` -j ${jValue}`;
	if (nValue) setCommand += ` -n ${nValue}`;

	// Substitute -i with actual index value
	getDisplay.value = substituteIndex(getCommand);
	setDisplay.value = substituteIndex(setCommand);
}

// Apply BIOS preset configuration
function applyBIOSPreset(jValue, nValue) {
	const biosCommand = document.querySelector('.command[data-command="bios-config"]');
	biosCommand.querySelector('input[data-flag="j"]').value = jValue;
	biosCommand.querySelector('input[data-flag="n"]').value = nValue;
	buildBIOSConfigCommand();
}

// Initialize BIOS Config command listeners
function initBIOSConfigListeners() {
	const biosCommand = document.querySelector('.command[data-command="bios-config"]');
	if (!biosCommand) return;

	// Add listeners to all inputs
	const inputs = biosCommand.querySelectorAll('input[type="text"]');
	inputs.forEach(input => {
		input.addEventListener('input', buildBIOSConfigCommand);
		input.addEventListener('change', buildBIOSConfigCommand);
	});

	// Build initial command
	buildBIOSConfigCommand();
}

// Build Next Boot command
function buildNextBootCommand() {
	const bootCommand = document.querySelector('.command[data-command="next-boot"]');
	const display = bootCommand.querySelector('.command-display');

	let command = `-setnextboot -i`;

	// Get input values
	const tValue = bootCommand.querySelector('input[data-flag="t"]').value;
	const mValue = bootCommand.querySelector('input[data-flag="m"]').value;
	const pValue = bootCommand.querySelector('input[data-flag="p"]').value;
	const nValue = bootCommand.querySelector('input[data-flag="n"]').value;

	// Add flags
	if (tValue) command += ` -t ${tValue}`;
	if (mValue) command += ` -m ${mValue}`;
	if (pValue) command += ` -p ${pValue}`;
	if (nValue) command += ` -n ${nValue}`;

	// Substitute -i with actual index value
	command = substituteIndex(command);

	display.value = command;
}

// Apply Boot preset configuration
function applyBootPreset(tValue, mValue, pValue, nValue) {
	const bootCommand = document.querySelector('.command[data-command="next-boot"]');
	bootCommand.querySelector('input[data-flag="t"]').value = tValue;
	bootCommand.querySelector('input[data-flag="m"]').value = mValue;
	bootCommand.querySelector('input[data-flag="p"]').value = pValue;
	bootCommand.querySelector('input[data-flag="n"]').value = nValue !== null ? nValue : '';
	buildNextBootCommand();
}

// Initialize Next Boot command listeners
function initNextBootListeners() {
	const bootCommand = document.querySelector('.command[data-command="next-boot"]');
	if (!bootCommand) return;

	// Add listeners to all inputs
	const inputs = bootCommand.querySelectorAll('input[type="text"]');
	inputs.forEach(input => {
		input.addEventListener('input', buildNextBootCommand);
		input.addEventListener('change', buildNextBootCommand);
	});

	// Build initial command
	buildNextBootCommand();
}

// Build Set NIC command
function buildSetNICCommand() {
	const nicCommand = document.querySelector('.command[data-command="set-nic"]');
	const display = nicCommand.querySelector('.command-display');

	let command = `-setnic`;

	// Get input values
	const aCheckbox = nicCommand.querySelector('input[data-flag="a"]:checked');
	const aValue = aCheckbox ? aCheckbox.value : '';
	const iValue = nicCommand.querySelector('input[data-flag="i"]').value;
	const mValue = nicCommand.querySelector('input[data-flag="m"]').value;
	const gValue = nicCommand.querySelector('input[data-flag="g"]').value;
	const pValue = nicCommand.querySelector('input[data-flag="p"]').value;
	const dValue = nicCommand.querySelector('input[data-flag="d"]').value;
	const tValue = nicCommand.querySelector('input[data-flag="t"]').value;

	// Add flags
	if (aValue) command += ` -a ${aValue}`;
	if (iValue) command += ` -i ${iValue}`;
	if (mValue) command += ` -m ${mValue}`;
	if (gValue) command += ` -g ${gValue}`;
	if (pValue) command += ` -p ${pValue}`;
	if (dValue) command += ` -d ${dValue}`;
	if (tValue) command += ` -t ${tValue}`;

	display.value = command;
}

// Initialize Set NIC command listeners
function initSetNICListeners() {
	const nicCommand = document.querySelector('.command[data-command="set-nic"]');
	if (!nicCommand) return;

	// Add mutual exclusion for checkbox group
	const groupCheckboxes = nicCommand.querySelectorAll('input[data-group="nic-source"]');
	groupCheckboxes.forEach(checkbox => {
		checkbox.addEventListener('change', function() {
			if (this.checked) {
				// Uncheck other checkboxes in the same group
				groupCheckboxes.forEach(other => {
					if (other !== this) {
						other.checked = false;
					}
				});
			}
			buildSetNICCommand();
		});
	});

	// Add listeners to all text inputs
	const textInputs = nicCommand.querySelectorAll('input[type="text"]');
	textInputs.forEach(input => {
		input.addEventListener('input', buildSetNICCommand);
		input.addEventListener('change', buildSetNICCommand);
	});

	// Build initial command
	buildSetNICCommand();
}

// Get global index value
function getGlobalIndex() {
	const indexInput = document.getElementById('globalIndex');
	return indexInput ? indexInput.value : '1';
}

// Substitute -i with -i <index>
function substituteIndex(command) {
	const index = getGlobalIndex();
	return command.replace(/-i\b/g, `-i ${index}`);
}

// Generic function to build commands with checkboxes
function buildCheckboxCommand(commandSelector, baseCommand) {
	const command = document.querySelector(`.command[data-command="${commandSelector}"]`);
	const display = command.querySelector('.command-display');

	let cmd = baseCommand;

	// Get all checked checkboxes with data-flag
	const checkedBoxes = command.querySelectorAll('input[type="checkbox"][data-flag]:checked');
	checkedBoxes.forEach(checkbox => {
		const flag = checkbox.getAttribute('data-flag');
		cmd += ` -${flag}`;
	});

	// Substitute -i with actual index value
	cmd = substituteIndex(cmd);

	display.value = cmd;
}

// Build functions for each command
function buildBladeInfoCommand() {
	buildCheckboxCommand('blade-info', '-getbladeinfo -i');
}

function buildBladeHealthCommand() {
	buildCheckboxCommand('blade-health', '-getbladehealth -i');
}

function buildChassisHealthCommand() {
	buildCheckboxCommand('chassis-health', '-getchassishealth');
}

function buildChassisInfoCommand() {
	buildCheckboxCommand('chassis-info', '-getchassisinfo');
}

// Generic init function for checkbox commands
function initCheckboxCommand(commandSelector, buildFunction) {
	const command = document.querySelector(`.command[data-command="${commandSelector}"]`);
	if (!command) return;

	const checkboxes = command.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach(checkbox => {
		checkbox.addEventListener('change', buildFunction);
	});

	buildFunction();
}

// Initialize all checkbox-based commands
function initBladeInfoListeners() {
	initCheckboxCommand('blade-info', buildBladeInfoCommand);
}

function initBladeHealthListeners() {
	initCheckboxCommand('blade-health', buildBladeHealthCommand);
}

function initChassisHealthListeners() {
	initCheckboxCommand('chassis-health', buildChassisHealthCommand);
}

function initChassisInfoListeners() {
	initCheckboxCommand('chassis-info', buildChassisInfoCommand);
}

// Update all static command displays with current index
function updateStaticCommands() {
	// Find all command displays that are not in dynamic commands
	const allDisplays = document.querySelectorAll('.command-display');
	allDisplays.forEach(display => {
		// Skip if it's in a command with data-command attribute (those are handled by their own builders)
		const parentCommand = display.closest('.command[data-command]');
		if (parentCommand) return;

		// Get the original value from the readonly attribute or data attribute
		let originalValue = display.getAttribute('data-original-value');
		if (!originalValue) {
			// Store the original value first time
			originalValue = display.value;
			display.setAttribute('data-original-value', originalValue);
		}

		// Substitute -i with actual index value
		display.value = substituteIndex(originalValue);
	});
}

// Rebuild all commands (called when global index changes)
function rebuildAllCommands() {
	buildBladeInfoCommand();
	buildBladeHealthCommand();
	buildChassisHealthCommand();
	buildChassisInfoCommand();
	buildBIOSConfigCommand();
	buildNextBootCommand();
	updateStaticCommands();
}

// Initialize global index listener
function initGlobalIndexListener() {
	const indexInput = document.getElementById('globalIndex');
	if (!indexInput) return;

	indexInput.addEventListener('input', rebuildAllCommands);
	indexInput.addEventListener('change', rebuildAllCommands);

	// Update static commands on initial load
	updateStaticCommands();
}

// Initialize Mezz Analyzer with auto-analysis
function initMezzAnalyzer() {
	const textarea = document.getElementById('mezzStatusInput');
	if (!textarea) return;

	// Auto-analyze on input with debounce
	let debounceTimer;
	textarea.addEventListener('input', function() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			analyzeBlademezzStatus();
		}, 500); // Wait 500ms after user stops typing
	});

	// Immediate analysis on paste
	textarea.addEventListener('paste', function() {
		setTimeout(() => {
			analyzeBlademezzStatus();
		}, 100); // Small delay to ensure paste content is available
	});
}

// Analyze Blade Mezz Status
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
		if (!match) return null; // Field not found
		return match[1].toLowerCase() === 'true'; // true or false
	}

	// Parse the status values using regex (flexible whitespace matching)
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

	// Check if we found any values (null means not found, true/false means found)
	const hasData = Object.values(status).some(val => val !== null);
	if (!hasData) {
		resultsDiv.innerHTML = '<div class="mezz-error">Could not parse status values. Please check the format.<br><br>Expected format:<br>Pcie Lane 0 Up = True<br>Network Link 0 Up = False<br>etc.</div>';
		return;
	}

	// Determine fault condition
	let diagnosis = '';
	let severity = '';
	let recommendation = '';

	// Rule 1: Good/Reseat all DAC Cables - PCIe up, both links up, Status = 0xAF
	if (status.pcieLane0Up === true && status.pcieLane1Up === true &&
	    status.networkLink0Up === true && status.networkLink1Up === true &&
	    status.statusCode === '0XAF') {
		diagnosis = 'Good Status (Reseat all DAC Cables)';
		severity = 'good';
		recommendation = 'System is functioning properly. Both PCIe lanes and network links are up with status code 0xAF.';
	}
	// Rule 2: Bad Loop back cable - PCIe up, Link 0 down with Tx (no Rx), Link 1 up with Rx (no Tx)
	else if (status.pcieLane0Up === true && status.pcieLane1Up === true &&
	         status.networkLink0Up === false && status.networkLink0Tx === true && status.networkLink0Rx === false &&
	         status.networkLink1Up === true && status.networkLink1Tx === false && status.networkLink1Rx === true) {
		diagnosis = 'Bad Loop Back Cable';
		severity = 'fault';
		recommendation = 'Replace the loop back cable from the NIC to the network interface.';
	}
	// Rule 3: Bad DAC cable - PCIe up, both network links down, no activity
	else if (status.pcieLane0Up === true && status.pcieLane1Up === true &&
	         status.networkLink0Up === false && status.networkLink0Tx === false && status.networkLink0Rx === false &&
	         status.networkLink1Up === false && status.networkLink1Tx === false && status.networkLink1Rx === false) {
		diagnosis = 'Bad DAC Cable from TOR to Tray Backplane';
		severity = 'fault';
		recommendation = 'Check and replace the DAC cable connection between the TOR (Top of Rack) switch and the tray backplane.';
	}
	// Rule 4: Bad Motherboard/NIC/Backplane - All PCIe and links down
	else if (status.pcieLane0Up === false && status.pcieLane1Up === false &&
	         status.networkLink0Up === false && status.networkLink0Tx === false && status.networkLink0Rx === false &&
	         status.networkLink1Up === false && status.networkLink1Tx === false && status.networkLink1Rx === false) {
		diagnosis = 'Bad Motherboard, NIC, or Tray Backplane';
		severity = 'fault';
		recommendation = 'Hardware failure detected. Check the motherboard, NIC card, or tray backplane. May require component replacement.';
	}
	// Rule 5: Reseat all Cabling - PCIe up, both links up, but status not 0xAF
	else if (status.pcieLane0Up === true && status.pcieLane1Up === true &&
	         status.networkLink0Up === true && status.networkLink1Up === true) {
		diagnosis = 'Reseat All Cabling';
		severity = 'warning';
		recommendation = 'Links are up but status is not optimal. Try reseating all cable connections.';
	}
	// Default: Unknown condition
	else {
		diagnosis = 'Unknown Condition';
		severity = 'warning';
		recommendation = 'The status does not match known fault patterns. Review the values manually or consult documentation.';
	}

	// Build results HTML
	let html = `
		<div class="mezz-diagnosis mezz-${severity}">
			<h3>${diagnosis}</h3>
			<p>${recommendation}</p>
		</div>
	`;

	resultsDiv.innerHTML = html;
}
