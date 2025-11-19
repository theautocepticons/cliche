/**
 * Command Bookmarks Management Module
 * Handles localStorage-based bookmarks for saved commands
 */

const BOOKMARKS_KEY = 'cliche_bookmarks';
const MAX_BOOKMARKS_SIZE = 100;

/**
 * Get bookmarks from localStorage
 * @returns {Array} Array of bookmark entries
 */
export function getBookmarks() {
	try {
		const bookmarksJson = localStorage.getItem(BOOKMARKS_KEY);
		if (!bookmarksJson) {
			return [];
		}
		return JSON.parse(bookmarksJson);
	} catch (error) {
		console.error('Error reading bookmarks:', error);
		return [];
	}
}

/**
 * Save a command to bookmarks
 * @param {string} command - The command string
 * @param {string} commandName - Human-readable command name
 * @param {string} generation - Generation type (legacy or gen6)
 * @param {string} commandId - Optional command ID from wcs.json
 * @param {string} name - Custom name for the bookmark
 */
export function addBookmark(command, commandName, generation, commandId = null, name = null) {
	try {
		if (!command || command.trim() === '') {
			return false;
		}

		const bookmarks = getBookmarks();

		// Create bookmark entry
		const entry = {
			id: Date.now().toString(36) + Math.random().toString(36).substr(2),
			command: command.trim(),
			commandName: commandName,
			commandId: commandId,
			generation: generation,
			name: name || commandName,
			timestamp: Date.now()
		};

		// Add to beginning of array (most recent first)
		bookmarks.unshift(entry);

		// Limit size
		if (bookmarks.length > MAX_BOOKMARKS_SIZE) {
			bookmarks.splice(MAX_BOOKMARKS_SIZE);
		}

		// Save to localStorage
		localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
		return true;
	} catch (error) {
		console.error('Error saving bookmark:', error);
		return false;
	}
}

/**
 * Remove a bookmark by ID
 * @param {string} id - Bookmark ID to remove
 */
export function removeBookmark(id) {
	try {
		const bookmarks = getBookmarks();
		const index = bookmarks.findIndex(b => b.id === id);

		if (index !== -1) {
			bookmarks.splice(index, 1);
			localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
			return true;
		}
		return false;
	} catch (error) {
		console.error('Error removing bookmark:', error);
		return false;
	}
}

/**
 * Check if a command is bookmarked
 * @param {string} commandId - Command ID to check
 * @returns {boolean} True if bookmarked
 */
export function isBookmarked(commandId) {
	if (!commandId) return false;
	const bookmarks = getBookmarks();
	return bookmarks.some(b => b.commandId === commandId);
}

/**
 * Remove a bookmark by command ID
 * @param {string} commandId - Command ID to remove
 * @returns {boolean} True if removed
 */
export function removeBookmarkByCommandId(commandId) {
	try {
		const bookmarks = getBookmarks();
		const index = bookmarks.findIndex(b => b.commandId === commandId);

		if (index !== -1) {
			bookmarks.splice(index, 1);
			localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
			return true;
		}
		return false;
	} catch (error) {
		console.error('Error removing bookmark:', error);
		return false;
	}
}

/**
 * Clear all bookmarks
 */
export function clearBookmarks() {
	try {
		localStorage.removeItem(BOOKMARKS_KEY);
		return true;
	} catch (error) {
		console.error('Error clearing bookmarks:', error);
		return false;
	}
}

/**
 * Show bookmarks modal
 */
export function showBookmarksModal() {
	const bookmarks = getBookmarks();

	// Create modal if it doesn't exist
	let modal = document.getElementById('bookmarks-modal');
	if (!modal) {
		modal = createBookmarksModal();
		document.body.appendChild(modal);
	}

	// Populate with bookmarks
	populateBookmarksModal(modal, bookmarks);

	// Show modal
	modal.classList.add('active');

	// Focus on search input
	const searchInput = modal.querySelector('.history-search-input');
	if (searchInput) {
		searchInput.value = '';
		searchInput.focus();
	}
}

/**
 * Create bookmarks modal DOM element
 * @returns {HTMLElement} Modal element
 */
function createBookmarksModal() {
	const modal = document.createElement('div');
	modal.id = 'bookmarks-modal';
	modal.className = 'modal bookmarks-modal';

	modal.innerHTML = `
		<div class="modal-overlay"></div>
		<div class="modal-content">
			<div class="modal-header">
				<div></div>
				<span>Bookmarks</span>
				<button class="modal-close" aria-label="Close">&times;</button>
			</div>
			<div class="modal-body">
				<div class="history-controls">
					<input type="text" class="history-search-input" placeholder="Search bookmarks..." />
					<button class="btn btn-danger">Clear All Bookmarks</button>
				</div>
				<div class="history-list bookmarks-list"></div>
			</div>
		</div>
	`;

	// Add event listeners
	const overlay = modal.querySelector('.modal-overlay');
	const closeBtn = modal.querySelector('.modal-close');
	const clearBtn = modal.querySelector('.btn-danger');
	const searchInput = modal.querySelector('.history-search-input');

	overlay.addEventListener('click', () => hideBookmarksModal());
	closeBtn.addEventListener('click', () => hideBookmarksModal());
	clearBtn.addEventListener('click', handleClearBookmarks);
	searchInput.addEventListener('input', (e) => filterBookmarks(e.target.value));

	// Close on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modal.classList.contains('active')) {
			hideBookmarksModal();
		}
	});

	return modal;
}

/**
 * Hide bookmarks modal
 */
export function hideBookmarksModal() {
	const modal = document.getElementById('bookmarks-modal');
	if (modal) {
		modal.classList.remove('active');
	}
}

/**
 * Populate bookmarks modal with entries
 * @param {HTMLElement} modal - Modal element
 * @param {Array} bookmarks - Bookmark entries
 */
function populateBookmarksModal(modal, bookmarks) {
	const listContainer = modal.querySelector('.bookmarks-list');

	if (!bookmarks || bookmarks.length === 0) {
		listContainer.innerHTML = '<div class="history-empty">No bookmarks yet. Bookmark a command to get started!</div>';
		return;
	}

	listContainer.innerHTML = '';

	bookmarks.forEach((entry) => {
		const item = document.createElement('div');
		item.className = 'history-item';
		item.dataset.id = entry.id;

		const badge = entry.generation === 'legacy' ? 'Gen &lt; 6' : 'Gen 6+';
		const badgeClass = entry.generation === 'legacy' ? 'badge-legacy' : 'badge-gen6';

		item.innerHTML = `
			<div class="history-item-content">
				<span class="history-item-badge ${badgeClass}">${badge}</span>
				<code class="history-item-command" title="${escapeHtml(entry.command)}">${escapeHtml(entry.name)}</code>
			</div>
			<div class="history-item-actions">
				<button class="btn btn-primary btn-sm bookmark-item-use" data-id="${entry.id}">Use</button>
				<button class="btn btn-danger btn-sm bookmark-item-delete" data-id="${entry.id}">Delete</button>
			</div>
		`;

		listContainer.appendChild(item);
	});

	// Add event listeners to buttons
	listContainer.querySelectorAll('.bookmark-item-use').forEach(btn => {
		btn.addEventListener('click', (e) => {
			const id = e.target.dataset.id;
			useBookmark(id);
		});
	});

	listContainer.querySelectorAll('.bookmark-item-delete').forEach(btn => {
		btn.addEventListener('click', (e) => {
			const id = e.target.dataset.id;
			deleteBookmarkEntry(id);
		});
	});
}

/**
 * Use a bookmarked command
 * @param {string} id - Bookmark ID
 */
async function useBookmark(id) {
	const bookmarks = getBookmarks();
	const entry = bookmarks.find(b => b.id === id);

	if (!entry || !entry.commandId) return;

	try {
		// Hide the modal
		hideBookmarksModal();

		// Clear the search
		const searchInput = document.getElementById('search-input');
		if (searchInput) {
			searchInput.value = '';
		}

		// Load the command data
		const dataFile = entry.generation === 'legacy' ? 'data/wcs.json' : 'data/rscm.json';
		const response = await fetch(dataFile);

		if (!response.ok) {
			console.error('Failed to load command data');
			return;
		}

		const data = await response.json();
		const command = data.commands.find(cmd => cmd.id === entry.commandId);

		if (!command) {
			console.error('Command not found:', entry.commandId);
			return;
		}

		// Dispatch command-selected event
		const event = new CustomEvent('command-selected', { detail: command });
		document.dispatchEvent(event);

	} catch (error) {
		console.error('Error using bookmark:', error);
	}
}

/**
 * Delete a bookmark entry
 * @param {string} id - Bookmark ID to delete
 */
function deleteBookmarkEntry(id) {
	if (confirm('Delete this bookmark?')) {
		removeBookmark(id);

		// Refresh the modal
		const modal = document.getElementById('bookmarks-modal');
		if (modal && modal.classList.contains('active')) {
			const bookmarks = getBookmarks();
			populateBookmarksModal(modal, bookmarks);
		}
	}
}

/**
 * Handle clear all bookmarks button
 */
function handleClearBookmarks() {
	if (confirm('Clear all bookmarks? This cannot be undone.')) {
		clearBookmarks();

		// Refresh the modal
		const modal = document.getElementById('bookmarks-modal');
		if (modal && modal.classList.contains('active')) {
			populateBookmarksModal(modal, []);
		}
	}
}

/**
 * Filter bookmarks based on search query
 * @param {string} query - Search query
 */
function filterBookmarks(query) {
	const allBookmarks = getBookmarks();
	const filtered = allBookmarks.filter(entry => {
		const searchStr = query.toLowerCase();
		return (
			entry.command.toLowerCase().includes(searchStr) ||
			entry.commandName.toLowerCase().includes(searchStr) ||
			entry.name.toLowerCase().includes(searchStr)
		);
	});

	const modal = document.getElementById('bookmarks-modal');
	if (modal) {
		populateBookmarksModal(modal, filtered);
	}
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}
