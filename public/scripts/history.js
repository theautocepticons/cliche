/**
 * Command History Management Module
 * Handles localStorage-based command history for copied commands
 */

const HISTORY_KEY = 'cliche_command_history';
const MAX_HISTORY_SIZE = 50;

/**
 * Get command history from localStorage
 * @param {number} limit - Optional limit on number of entries to return
 * @returns {Array} Array of history entries
 */
export function getHistory(limit = null) {
    try {
        const historyJson = localStorage.getItem(HISTORY_KEY);
        if (!historyJson) {
            return [];
        }

        const history = JSON.parse(historyJson);

        if (limit && limit > 0) {
            return history.slice(0, limit);
        }

        return history;
    } catch (error) {
        console.error('Error reading command history:', error);
        return [];
    }
}

/**
 * Save a command to history
 * @param {string} command - The command string
 * @param {string} commandName - Human-readable command name
 * @param {string} generation - Generation type (legacy or gen6)
 * @param {string} commandId - Optional command ID from wcs.json
 */
export function saveToHistory(command, commandName, generation, commandId = null) {
    try {
        // Don't save empty commands
        if (!command || command.trim() === '') {
            return;
        }

        const history = getHistory();

        // Create history entry
        const entry = {
            command: command.trim(),
            commandName: commandName,
            commandId: commandId,
            generation: generation,
            timestamp: Date.now()
        };

        // Check if this exact command is already the most recent entry
        if (history.length > 0 && history[0].command === entry.command) {
            // Update timestamp of existing entry
            history[0].timestamp = entry.timestamp;
        } else {
            // Add to beginning of array (most recent first)
            history.unshift(entry);

            // Limit history size
            if (history.length > MAX_HISTORY_SIZE) {
                history.splice(MAX_HISTORY_SIZE);
            }
        }

        // Save back to localStorage
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

        return true;
    } catch (error) {
        console.error('Error saving to command history:', error);
        return false;
    }
}

/**
 * Clear all command history
 */
export function clearHistory() {
    try {
        localStorage.removeItem(HISTORY_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing command history:', error);
        return false;
    }
}

/**
 * Remove a specific entry from history by index
 * @param {number} index - Index of entry to remove
 */
export function removeHistoryEntry(index) {
    try {
        const history = getHistory();

        if (index >= 0 && index < history.length) {
            history.splice(index, 1);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error removing history entry:', error);
        return false;
    }
}

/**
 * Format timestamp for display
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date/time string
 */
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    // If today, show time only
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // If this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Otherwise show full date
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Show history modal with recent commands
 */
export function showHistoryModal() {
    const history = getHistory();

    // Create modal if it doesn't exist
    let modal = document.getElementById('history-modal');
    if (!modal) {
        modal = createHistoryModal();
        document.body.appendChild(modal);
    }

    // Populate with history
    populateHistoryModal(modal, history);

    // Show modal
    modal.classList.add('active');

    // Focus on search input if exists
    const searchInput = modal.querySelector('.history-search-input');
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
}

/**
 * Create history modal DOM element
 * @returns {HTMLElement} Modal element
 */
function createHistoryModal() {
    const modal = document.createElement('div');
    modal.id = 'history-modal';
    modal.className = 'modal history-modal';

    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
				<div></div>
                <span>Command History</span>
                <button class="modal-close" aria-label="Close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="history-controls">
                    <input type="text" class="history-search-input" placeholder="Search history..." />
                    <button class="btn btn-danger">Clear All History</button>
                </div>
                <div class="history-list"></div>
            </div>
        </div>
    `;

    // Add event listeners
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    const clearBtn = modal.querySelector('.btn-danger');
    const searchInput = modal.querySelector('.history-search-input');

    overlay.addEventListener('click', () => hideHistoryModal());
    closeBtn.addEventListener('click', () => hideHistoryModal());
    clearBtn.addEventListener('click', handleClearHistory);
    searchInput.addEventListener('input', (e) => filterHistory(e.target.value));

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideHistoryModal();
        }
    });

    return modal;
}

/**
 * Hide history modal
 */
export function hideHistoryModal() {
    const modal = document.getElementById('history-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Populate history modal with entries
 * @param {HTMLElement} modal - Modal element
 * @param {Array} history - History entries
 */
function populateHistoryModal(modal, history) {
    const listContainer = modal.querySelector('.history-list');

    if (!history || history.length === 0) {
        listContainer.innerHTML = '<div class="history-empty">No command history yet. Copy a command to get started!</div>';
        return;
    }

    listContainer.innerHTML = '';

    history.forEach((entry, index) => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.dataset.index = index;

        const badge = entry.generation === 'legacy' ? 'Gen &lt; 6' : 'Gen 6+';
        const badgeClass = entry.generation === 'legacy' ? 'badge-legacy' : 'badge-gen6';

        item.innerHTML = `
            <div class="history-item-content">
                <span class="history-item-badge ${badgeClass}">${badge}</span>
                <code class="history-item-command">${escapeHtml(entry.command)}</code>
            </div>
            <div class="history-item-actions">
                <button class="btn btn-primary btn-sm history-item-reuse" data-index="${index}">Use</button>
                <button class="btn btn-danger btn-sm history-item-delete" data-index="${index}">Delete</button>
            </div>
        `;

        listContainer.appendChild(item);
    });

    // Add event listeners to buttons
    listContainer.querySelectorAll('.history-item-reuse').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            reuseHistoryCommand(index);
        });
    });

    listContainer.querySelectorAll('.history-item-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            deleteHistoryEntry(index);
        });
    });
}

/**
 * Reuse a command from history
 * @param {number} index - Index of history entry
 */
async function reuseHistoryCommand(index) {
    const history = getHistory();
    const entry = history[index];

    if (!entry || !entry.commandId) return;

    try {
        // Hide the modal
        hideHistoryModal();

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
        console.error('Error reusing command:', error);
    }
}

/**
 * Delete a history entry
 * @param {number} index - Index of entry to delete
 */
function deleteHistoryEntry(index) {
    if (confirm('Delete this command from history?')) {
        removeHistoryEntry(index);

        // Refresh the modal
        const modal = document.getElementById('history-modal');
        if (modal && modal.classList.contains('active')) {
            const history = getHistory();
            populateHistoryModal(modal, history);
        }
    }
}

/**
 * Handle clear all history button
 */
function handleClearHistory() {
    if (confirm('Clear all command history? This cannot be undone.')) {
        clearHistory();

        // Refresh the modal
        const modal = document.getElementById('history-modal');
        if (modal && modal.classList.contains('active')) {
            populateHistoryModal(modal, []);
        }
    }
}

/**
 * Filter history based on search query
 * @param {string} query - Search query
 */
function filterHistory(query) {
    const allHistory = getHistory();
    const filtered = allHistory.filter(entry => {
        const searchStr = query.toLowerCase();
        return (
            entry.command.toLowerCase().includes(searchStr) ||
            entry.commandName.toLowerCase().includes(searchStr)
        );
    });

    const modal = document.getElementById('history-modal');
    if (modal) {
        populateHistoryModal(modal, filtered);
    }
}

/**
 * Show recent history as initial display on page load
 * @param {number} count - Number of recent commands to show
 */
export function showRecentHistory(count = 10) {
    // Don't show if already visible
    if (document.getElementById('recent-history-panel')) {
        return;
    }

    const history = getHistory(count);

    if (!history || history.length === 0) {
        return; // Don't show anything if no history
    }

    // Create recent history panel
    const panel = document.createElement('div');
    panel.id = 'recent-history-panel';
    panel.className = 'recent-history-panel card-margin';

    panel.innerHTML = `
        <div class="recent-history-header">
			<div></div>
            <span class="recent-history-title">Recent Commands</span>
            <button class="recent-history-close" aria-label="Close">&times;</button>
        </div>
        <div class="recent-history-items"></div>
    `;

    const itemsContainer = panel.querySelector('.recent-history-items');

    history.forEach((entry, index) => {
        const item = document.createElement('button');
        item.className = 'recent-history-item';
        item.dataset.index = index;

        const badge = entry.generation === 'legacy' ? 'Gen &lt; 6' : 'Gen 6+';
        const badgeClass = entry.generation === 'legacy' ? 'badge-legacy' : 'badge-gen6';

        item.innerHTML = `
            <span class="recent-history-item-name">${escapeHtml(entry.commandName)}</span>
            <span class="recent-history-item-badge ${badgeClass}">${badge}</span>
        `;

        item.addEventListener('click', () => {
            reuseHistoryCommand(index);
            dismissRecentHistory();
        });

        itemsContainer.appendChild(item);
    });

    // Add close button listener
    const closeBtn = panel.querySelector('.recent-history-close');
    closeBtn.addEventListener('click', dismissRecentHistory);

    // Insert panel at top of #cards container
    const cardsContainer = document.getElementById('cards');
    if (cardsContainer) {
        cardsContainer.insertBefore(panel, cardsContainer.firstChild);
    }
}

/**
 * Dismiss the recent history panel
 */
export function dismissRecentHistory() {
    const panel = document.getElementById('recent-history-panel');
    if (panel) {
        panel.remove();
    }
}

/**
 * Auto-hide recent history when user starts searching
 */
export function autoHideRecentHistory() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            dismissRecentHistory();
        }, { once: true });
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
