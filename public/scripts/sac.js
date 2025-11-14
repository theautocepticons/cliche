// SAC (Special Administration Console) Command Builders

// Kill process command
function buildKillProcessCommand() {
    const commandDiv = document.querySelector('.command[data-command="sac-kill"]');
    const display = commandDiv.querySelector('.command-display');
    const pid = commandDiv.querySelector('input[data-param="pid"]').value;

    let command = 'k';
    if (pid) {
        command += ` ${pid}`;
    }

    display.value = command;
}

// Lower process priority command
function buildLowerPriorityCommand() {
    const commandDiv = document.querySelector('.command[data-command="sac-lower"]');
    const display = commandDiv.querySelector('.command-display');
    const pid = commandDiv.querySelector('input[data-param="pid"]').value;

    let command = 'l';
    if (pid) {
        command += ` ${pid}`;
    }

    display.value = command;
}

// Raise process priority command
function buildRaisePriorityCommand() {
    const commandDiv = document.querySelector('.command[data-command="sac-raise"]');
    const display = commandDiv.querySelector('.command-display');
    const pid = commandDiv.querySelector('input[data-param="pid"]').value;

    let command = 'r';
    if (pid) {
        command += ` ${pid}`;
    }

    display.value = command;
}

// Limit process memory command
function buildLimitMemoryCommand() {
    const commandDiv = document.querySelector('.command[data-command="sac-memory"]');
    const display = commandDiv.querySelector('.command-display');
    const pid = commandDiv.querySelector('input[data-param="pid"]').value;
    const mb = commandDiv.querySelector('input[data-param="mb"]').value;

    let command = 'm';
    if (pid) {
        command += ` ${pid}`;
        if (mb) {
            command += ` ${mb}`;
        }
    }

    display.value = command;
}

// Set IP address command
function buildSetIPCommand() {
    const commandDiv = document.querySelector('.command[data-command="sac-setip"]');
    const display = commandDiv.querySelector('.command-display');
    const network = commandDiv.querySelector('input[data-param="network"]').value;
    const ip = commandDiv.querySelector('input[data-param="ip"]').value;
    const subnet = commandDiv.querySelector('input[data-param="subnet"]').value;
    const gateway = commandDiv.querySelector('input[data-param="gateway"]').value;

    let command = 'i';
    if (network) {
        command += ` ${network}`;
        if (ip) {
            command += ` ${ip}`;
            if (subnet) {
                command += ` ${subnet}`;
                if (gateway) {
                    command += ` ${gateway}`;
                }
            }
        }
    }

    display.value = command;
}

// Set time/date command
function buildSetTimeCommand() {
    const commandDiv = document.querySelector('.command[data-command="sac-settime"]');
    const display = commandDiv.querySelector('.command-display');
    const date = commandDiv.querySelector('input[data-param="date"]').value;
    const time = commandDiv.querySelector('input[data-param="time"]').value;

    let command = 's';
    if (date) {
        command += ` ${date}`;
        if (time) {
            command += ` ${time}`;
        }
    }

    display.value = command;
}

// Initialize all SAC command listeners
function initSACCommands() {
    // Kill process
    const killDiv = document.querySelector('.command[data-command="sac-kill"]');
    if (killDiv) {
        const killInputs = killDiv.querySelectorAll('input[type="text"]:not(.command-display)');
        killInputs.forEach(input => input.addEventListener('input', buildKillProcessCommand));
        buildKillProcessCommand();
    }

    // Lower priority
    const lowerDiv = document.querySelector('.command[data-command="sac-lower"]');
    if (lowerDiv) {
        const lowerInputs = lowerDiv.querySelectorAll('input[type="text"]:not(.command-display)');
        lowerInputs.forEach(input => input.addEventListener('input', buildLowerPriorityCommand));
        buildLowerPriorityCommand();
    }

    // Raise priority
    const raiseDiv = document.querySelector('.command[data-command="sac-raise"]');
    if (raiseDiv) {
        const raiseInputs = raiseDiv.querySelectorAll('input[type="text"]:not(.command-display)');
        raiseInputs.forEach(input => input.addEventListener('input', buildRaisePriorityCommand));
        buildRaisePriorityCommand();
    }

    // Limit memory
    const memDiv = document.querySelector('.command[data-command="sac-memory"]');
    if (memDiv) {
        const memInputs = memDiv.querySelectorAll('input[type="text"]:not(.command-display)');
        memInputs.forEach(input => input.addEventListener('input', buildLimitMemoryCommand));
        buildLimitMemoryCommand();
    }

    // Set IP
    const ipDiv = document.querySelector('.command[data-command="sac-setip"]');
    if (ipDiv) {
        const ipInputs = ipDiv.querySelectorAll('input[type="text"]:not(.command-display)');
        ipInputs.forEach(input => input.addEventListener('input', buildSetIPCommand));
        buildSetIPCommand();
    }

    // Set time
    const timeDiv = document.querySelector('.command[data-command="sac-settime"]');
    if (timeDiv) {
        const timeInputs = timeDiv.querySelectorAll('input[type="text"]:not(.command-display)');
        timeInputs.forEach(input => input.addEventListener('input', buildSetTimeCommand));
        buildSetTimeCommand();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initSACCommands);
