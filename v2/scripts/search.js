let appState = null;

/**
 * Initialize search functionality
 */
export function initializeSearch(state) {
	appState = state;

	const searchInput = document.getElementById('search-input');
	const searchResults = document.getElementById('search-results');

	// Focus handler - show all commands or search results
	searchInput.addEventListener('focus', () => {
		const query = searchInput.value.trim();
		if (query === '') {
			showAllCommands();
		} else {
			performSearch(query);
		}
	});

	// Click handler - show all commands or search results
	searchInput.addEventListener('click', () => {
		const query = searchInput.value.trim();
		if (query === '') {
			showAllCommands();
		} else {
			performSearch(query);
		}
	});

	// Input handler - perform fuzzy search
	searchInput.addEventListener('input', (e) => {
		const query = e.target.value.trim();

		if (query === '') {
			showAllCommands();
		} else {
			performSearch(query);
		}
	});

	// Click outside to close
	document.addEventListener('click', (e) => {
		if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
			hideSearchResults();
		}
	});
}

/**
 * Show all commands grouped by category
 */
function showAllCommands() {
	const searchResults = document.getElementById('search-results');
	const commands = appState.commands[appState.currentGeneration];

	if (commands.length === 0) {
		searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-color);">No commands available for this generation</div>';
		searchResults.classList.remove('hidden');
		return;
	}

	// Group commands by category
	const grouped = groupByCategory(commands);

	// Render results
	searchResults.innerHTML = '';
	for (const [category, categoryCommands] of Object.entries(grouped)) {
		renderCategory(category, categoryCommands, searchResults);
	}

	searchResults.classList.remove('hidden');
}

/**
 * Perform fuzzy search on commands
 */
function performSearch(query) {
	const searchResults = document.getElementById('search-results');
	const commands = appState.commands[appState.currentGeneration];

	// Easter egg: JoJo reference
	if (query.toLowerCase() === 'jojo') {
		searchResults.innerHTML = `
			<div style="display: flex; align-items: center; justify-content: center; padding: 40px; gap: 20px;">
				<img src="images/menacing.gif" alt="menacing" style="width: 100px; height: 100px; object-fit: contain;">
				<img src="images/kirby.webp" alt="kirby" style="width: 200px; height: 200px; object-fit: contain;">
				<img src="images/menacing.gif" alt="menacing" style="width: 100px; height: 100px; object-fit: contain;">
			</div>
		`;
		searchResults.classList.remove('hidden');
		return;
	}

	if (commands.length === 0) {
		searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-color);">No commands available for this generation</div>';
		searchResults.classList.remove('hidden');
		return;
	}

	// Perform fuzzy search
	const results = fuzzySearch(query, commands);

	if (results.length === 0) {
		searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-color);">No results found</div>';
		searchResults.classList.remove('hidden');
		return;
	}

	// Group results by category
	const grouped = groupByCategory(results);

	// Render results
	searchResults.innerHTML = '';
	for (const [category, categoryCommands] of Object.entries(grouped)) {
		renderCategory(category, categoryCommands, searchResults);
	}

	searchResults.classList.remove('hidden');
}

/**
 * Fuzzy search algorithm
 * Searches across: command name, description, keywords, flag names, param names
 */
function fuzzySearch(query, commands) {
	const queryLower = query.toLowerCase();
	const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);

	return commands
		.map(command => {
			let score = 0;

			// Search in command name
			if (command.name.toLowerCase().includes(queryLower)) {
				score += 100;
			}

			// Search in command base
			if (command.base.toLowerCase().includes(queryLower)) {
				score += 90;
			}

			// Search in description
			if (command.description.toLowerCase().includes(queryLower)) {
				score += 80;
			}

			// Search in keywords
			if (command.keywords) {
				for (const keyword of command.keywords) {
					if (keyword.toLowerCase().includes(queryLower)) {
						score += 60;
					}
				}
			}

			// Search in category
			if (command.category.toLowerCase().includes(queryLower)) {
				score += 50;
			}

			// Search in parameters
			if (command.params) {
				for (const [key, param] of Object.entries(command.params)) {
					if (param.description && param.description.toLowerCase().includes(queryLower)) {
						score += 40;
					}
					if (param.flag && param.flag.toLowerCase().includes(queryLower)) {
						score += 35;
					}
				}
			}

			// Search in flags
			if (command.flags) {
				for (const [key, flag] of Object.entries(command.flags)) {
					if (flag.description && flag.description.toLowerCase().includes(queryLower)) {
						score += 40;
					}
					if (flag.flag && flag.flag.toLowerCase().includes(queryLower)) {
						score += 35;
					}
				}
			}

			// Bonus for multi-word matches
			let wordMatches = 0;
			for (const word of queryWords) {
				const searchText = `${command.name} ${command.description} ${(command.keywords || []).join(' ')}`.toLowerCase();
				if (searchText.includes(word)) {
					wordMatches++;
				}
			}
			if (wordMatches === queryWords.length && queryWords.length > 1) {
				score += 200; // All words found
			}

			return { command, score };
		})
		.filter(result => result.score > 0)
		.sort((a, b) => b.score - a.score)
		.map(result => result.command);
}

/**
 * Group commands by category
 */
function groupByCategory(commands) {
	const grouped = {};

	for (const command of commands) {
		const category = command.category;
		if (!grouped[category]) {
			grouped[category] = [];
		}
		grouped[category].push(command);
	}

	return grouped;
}

/**
 * Render a category with its commands
 */
function renderCategory(category, commands, container) {
	// Category header
	const categoryDiv = document.createElement('div');
	categoryDiv.className = 'result-category';
	categoryDiv.textContent = category;
	container.appendChild(categoryDiv);

	// Commands
	for (const command of commands) {
		const resultItem = document.createElement('div');
		resultItem.className = 'result-item';
		resultItem.innerHTML = `
			<div class="result-item-description">${command.description}</div>
		`;

		resultItem.addEventListener('click', () => {
			selectCommand(command);
		});

		container.appendChild(resultItem);
	}
}

/**
 * Select a command and display it in the card
 */
function selectCommand(command) {
	appState.currentCommand = command;

	// Hide search results
	hideSearchResults();

	// Dispatch event to show command card
	const event = new CustomEvent('command-selected', { detail: command });
	document.dispatchEvent(event);
}

/**
 * Hide search results
 */
function hideSearchResults() {
	const searchResults = document.getElementById('search-results');
	searchResults.classList.add('hidden');
}
