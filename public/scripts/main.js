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
	if (tabId === previousTab) return;

	activeTab = tabId;

	// Update active button
	document.querySelectorAll('.tab-btn').forEach(btn => {
		btn.classList.remove('active');
	});
	document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');

	// Show/hide tabs
	filterCommandsByTab();

	// Initialize gen6 tab if switching to it (lazy initialization)
	if (tabId === 'gen6' && typeof initializeGen6Tab === 'function') {
		// Wait for tab to be visible before initializing
		setTimeout(() => {
			initializeGen6Tab();
		}, 50);
	}

	// Reapply search if there's an active search term
	const searchInput = document.getElementById('searchInput');
	if (searchInput && searchInput.value.trim()) {
		searchInput.dispatchEvent(new Event('input'));
	}

	// Save to localStorage
	localStorage.setItem('activeTab', tabId);
}

function filterCommandsByTab() {
	const tabContents = document.querySelectorAll('.tab-content');

	// Simple show/hide with fade effect
	tabContents.forEach(tabContent => {
		const generation = tabContent.getAttribute('data-generation');
		if (generation === activeTab) {
			tabContent.classList.remove('hidden');
		} else {
			tabContent.classList.add('hidden');
		}
	});
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
	// Load saved theme on page load
	const savedTheme = localStorage.getItem('theme') || 'light';
	document.body.setAttribute('data-theme', savedTheme);

	// Set theme toggle button emoji
	const button = document.getElementById('themeToggle');
	button.textContent = savedTheme === 'light' ? '🌙' : '☀️';

	// Initialize tab switching
	initTabSwitching();

	// Initialize fuzzy search
	initFuzzySearch();
});
