import { initializeSearch } from './search.js';
import { initializeUI } from './ui.js';
import { initializeCommandBuilder } from './command-builder.js';
import { showHistoryModal, showRecentHistory, autoHideRecentHistory } from './history.js';

// App State
const state = {
	currentGeneration: 'legacy', // 'legacy' or '6plus'
	activeGeneration: 'legacy', // For history tracking
	commands: {
		legacy: [],
		'6plus': []
	},
	currentCommand: null
};

// Initialize App
async function init() {
	// Load commands
	await loadCommands();

	// Initialize modules
	initializeTheme();
	initializeGenToggle();
	initializeSearch(state);
	initializeUI(state);
	initializeCommandBuilder(state);
	initializeHistory();
}

// History Management
function initializeHistory() {
	const historyButton = document.getElementById('history-button');

	// History button click handler
	historyButton.addEventListener('click', () => {
		showHistoryModal();
	});

	// Show recent history on page load
	showRecentHistory(10);

	// Auto-hide recent history when user starts searching
	autoHideRecentHistory();
}

// Load Commands from JSON
async function loadCommands() {
	try {
		// Load WCS (Gen < 6) commands
		const wcsResponse = await fetch('data/wcs.json');
		if (wcsResponse.ok) {
			const wcsData = await wcsResponse.json();
			state.commands.legacy = wcsData.commands || [];
			console.log(`Loaded ${state.commands.legacy.length} WCS commands`);
		}

		// Load RSCM (Gen 6+) commands (when available)
		try {
			const rscmResponse = await fetch('data/rscm.json');
			if (rscmResponse.ok) {
				const rscmData = await rscmResponse.json();
				state.commands['6plus'] = rscmData.commands || [];
				console.log(`Loaded ${state.commands['6plus'].length} RSCM commands`);
			}
		} catch (e) {
			console.log('RSCM commands not yet available');
		}
	} catch (error) {
		console.error('Error loading commands:', error);
	}
}

// Theme Management
function initializeTheme() {
	const themeToggle = document.getElementById('theme-toggle');
	const savedTheme = localStorage.getItem('theme') || 'light';

	// Apply saved theme
	document.documentElement.setAttribute('data-theme', savedTheme);
	updateThemeIcon(savedTheme);

	// Theme toggle click handler
	themeToggle.addEventListener('click', () => {
		const currentTheme = document.documentElement.getAttribute('data-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
		updateThemeIcon(newTheme);
	});
}

function updateThemeIcon(theme) {
	const themeIcon = document.querySelector('.theme-icon');
	themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Generation Toggle
function initializeGenToggle() {
	const genLegacy = document.getElementById('gen-legacy');
	const gen6Plus = document.getElementById('gen-6plus');

	genLegacy.addEventListener('click', () => {
		if (state.currentGeneration !== 'legacy') {
			state.currentGeneration = 'legacy';
			state.activeGeneration = 'legacy';
			genLegacy.classList.add('active');
			gen6Plus.classList.remove('active');

			// Trigger search update
			const searchInput = document.getElementById('search-input');
			searchInput.dispatchEvent(new Event('input'));
		}
	});

	gen6Plus.addEventListener('click', () => {
		if (state.currentGeneration !== '6plus') {
			state.currentGeneration = '6plus';
			state.activeGeneration = '6plus';
			gen6Plus.classList.add('active');
			genLegacy.classList.remove('active');

			// Trigger search update
			const searchInput = document.getElementById('search-input');
			searchInput.dispatchEvent(new Event('input'));
		}
	});
}

// Start the app
init();

// Export state for other modules
export { state };
