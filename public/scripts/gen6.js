// Gen 6+ Commands - Tree Navigation Controller
// Manages command building with hierarchical navigation

// Command Definitions
const gen6NetworkCommands = {
	show: {
		'network': {
			base: 'show network',
			description: 'Show physical interfaces list',
			params: {},
			flags: {}
		},
		'network-interface': {
			base: 'show network interface',
			description: 'Show specific interface details',
			params: {
				interface: { flag: '-i', required: true, placeholder: 'eth0', description: 'Interface name' }
			},
			flags: {}
		},
		'network-ping': {
			base: 'show network ping',
			description: 'Test network connectivity',
			params: {
				address: { flag: '-a', required: true, placeholder: '192.168.1.1', description: 'IP address' }
			},
			flags: {
				count: { flag: '-c', placeholder: '4', description: 'Number of packets' },
				timeout: { flag: '-w', placeholder: '5', description: 'Timeout in seconds' }
			}
		},
		'network-traceroute': {
			base: 'show network traceroute',
			description: 'Discover route to host',
			params: {
				address: { flag: '-a', required: true, placeholder: '192.168.1.1', description: 'IP address' }
			},
			flags: {
				udp: { flag: '-u', boolean: true, description: 'Use UDP instead of ICMP' }
			}
		}
	},
	set: {
		'network-static': {
			base: 'set network static',
			description: 'Configure static IP address',
			params: {
				interface: { flag: '-i', required: true, placeholder: 'eth0', description: 'Interface name' },
				address: { flag: '-a', required: true, placeholder: '192.168.1.100', description: 'IP address' },
				subnet: { flag: '-s', required: true, placeholder: '255.255.255.0', description: 'Subnet mask' }
			},
			flags: {
				gateway: { flag: '-g', placeholder: '192.168.1.1', description: 'Gateway address' },
				broadcast: { flag: '-b', placeholder: '192.168.1.255', description: 'Broadcast address' },
				ipv6: { flag: '-v', value: '6', boolean: true, description: 'Use IPv6' }
			}
		},
		'network-dhcp': {
			base: 'set network dhcp',
			description: 'Enable DHCP on interface',
			params: {
				interface: { flag: '-i', required: true, placeholder: 'eth0', description: 'Interface name' }
			},
			flags: {
				ipv6: { flag: '-v', value: '6', boolean: true, description: 'Use IPv6' },
				gateway: { flag: '-g', placeholder: '192.168.1.1', description: 'Gateway address' }
			}
		},
		'network-enable': {
			base: 'set network enable',
			description: 'Enable network interface',
			params: {
				interface: { flag: '-i', required: true, placeholder: 'eth0', description: 'Interface name' }
			},
			flags: {}
		},
		'network-disable': {
			base: 'set network disable',
			description: 'Disable network interface',
			params: {
				interface: { flag: '-i', required: true, placeholder: 'eth0', description: 'Interface name' }
			},
			flags: {}
		}
	}
};

// Manager Info & Health Commands
const gen6ManagerInfoCommands = {
	show: {
		'manager-info': {
			base: 'show manager info',
			description: 'Show manager components info',
			params: {},
			flags: {
				servers: { flag: '-s', boolean: true, description: 'Show servers info' },
				psus: { flag: '-p', boolean: true, description: 'Show PSUs info' },
				manager: { flag: '-m', boolean: true, description: 'Show manager info' }
			}
		},
		'manager-health': {
			base: 'show manager health',
			description: 'Show health status',
			params: {},
			flags: {
				servers: { flag: '-s', boolean: true, description: 'Show servers health' },
				psus: { flag: '-p', boolean: true, description: 'Show PSUs health' },
				manager: { flag: '-m', boolean: true, description: 'Show manager health' }
			}
		},
		'manager-version': {
			base: 'show manager version',
			description: 'Show manager version information',
			params: {},
			flags: {}
		},
		'manager-inventory': {
			base: 'show manager inventory',
			description: 'Show manager inventory details',
			params: {},
			flags: {}
		},
		'manager-scandevice': {
			base: 'show manager scandevice',
			description: 'Display rack manager system information',
			params: {},
			flags: {}
		},
		'manager-fru': {
			base: 'show manager fru',
			description: 'Get FRU information of R-SCM board',
			params: {},
			flags: {}
		},
		'manager-type': {
			base: 'show manager type',
			description: 'Display manager type',
			params: {},
			flags: {}
		}
	},
	set: {
		'manager-led-on': {
			base: 'set manager led on',
			description: 'Turn manager LED ON',
			params: {},
			flags: {}
		},
		'manager-led-off': {
			base: 'set manager led off',
			description: 'Turn manager LED OFF',
			params: {},
			flags: {}
		},
		'manager-fru-update': {
			base: 'set manager fru',
			description: 'Update manager FRU information',
			params: {
				board: { flag: '-b', required: true, placeholder: 'mb', description: 'Board type (mb or ps)' },
				filename: { flag: '-f', required: true, placeholder: 'fru.bin', description: 'Filename' },
				size: { flag: '-s', required: true, placeholder: '256', description: 'Size in bytes' }
			},
			flags: {}
		}
	}
};

// Manager Power Commands
const gen6ManagerPowerCommands = {
	show: {
		'manager-powermeter-alert': {
			base: 'show manager powermeter alert',
			description: 'Show rack alert policy',
			params: {},
			flags: {}
		},
		'manager-powermeter-limit': {
			base: 'show manager powermeter limit',
			description: 'Show rack power limit policy',
			params: {},
			flags: {}
		},
		'manager-powermeter-throttletype': {
			base: 'show manager powermeter throttletype',
			description: 'Show powershelf throttle mode',
			params: {},
			flags: {}
		},
		'manager-powermeter-reading': {
			base: 'show manager powermeter reading',
			description: 'Show rack power readings',
			params: {},
			flags: {}
		},
		'manager-powermeter-multipolicy-active': {
			base: 'show manager powermeter multipolicy active',
			description: 'Show active requestor multi-policy config',
			params: {},
			flags: {}
		},
		'manager-powermeter-multipolicy-single': {
			base: 'show manager powermeter multipolicy single',
			description: 'Show single requestor multi-policy config',
			params: {
				requestorId: { flag: '-i', required: true, placeholder: '1', description: 'Requestor ID' }
			},
			flags: {}
		},
		'manager-powermeter-multipolicy-all': {
			base: 'show manager powermeter multipolicy all',
			description: 'Show all requestors multi-policy config',
			params: {},
			flags: {}
		},
		'manager-power-reading': {
			base: 'show manager power reading',
			description: 'Show manager power reading',
			params: {},
			flags: {}
		},
		'manager-power-status': {
			base: 'show manager power status',
			description: 'Show manager power status',
			params: {},
			flags: {}
		},
		'manager-throttle-force': {
			base: 'show manager throttle force',
			description: 'Show if throttle signal is active and enabled',
			params: {},
			flags: {}
		}
	},
	set: {
		'manager-power-faults': {
			base: 'set manager power faults',
			description: 'Clear manager power faults',
			params: {},
			flags: {}
		},
		'manager-powermeter-alert-set': {
			base: 'set manager powermeter alert',
			description: 'Set rack power alert policy',
			params: {
				policy: { flag: '-e', required: true, placeholder: '0', description: 'Policy (0-3)' },
				dcthrottle: { flag: '-d', required: true, placeholder: '0', description: 'DC throttle' },
				powerlimit: { flag: '-p', required: true, placeholder: '10000', description: 'Power limit in watts' }
			},
			flags: {}
		},
		'manager-powermeter-limit-set': {
			base: 'set manager powermeter limit',
			description: 'Set rack power limit',
			params: {
				powerlimit: { flag: '-p', required: true, placeholder: '10000', description: 'Power limit in watts' }
			},
			flags: {}
		},
		'manager-powermeter-multipolicy-set': {
			base: 'set manager powermeter multipolicy',
			description: 'Set multi-policy power configuration',
			params: {
				requestorId: { flag: '-i', required: true, placeholder: '1', description: 'Requestor ID' },
				rackAlert: { flag: '-a', required: true, placeholder: '9000', description: 'Rack alert' },
				dcThrottle: { flag: '-t', required: true, placeholder: '0', description: 'DC throttle' },
				rackLimit: { flag: '-l', required: true, placeholder: '10000', description: 'Rack limit' },
				bladeLimit: { flag: '-p', required: true, placeholder: '500', description: 'Blade limit' },
				alertAction: { flag: '-e', required: true, placeholder: '0', description: 'Alert action' },
				throttleDuration: { flag: '-f', required: true, placeholder: '60', description: 'Throttle duration' },
				removeDelay: { flag: '-d', required: true, placeholder: '30', description: 'Remove delay' }
			},
			flags: {
				remediation: { flag: '-r', placeholder: '0', description: 'Remediation' }
			}
		},
		'manager-powermeter-clearmax': {
			base: 'set manager powermeter max',
			description: 'Clear rack max power',
			params: {},
			flags: {}
		},
		'manager-powermeter-clearfaults': {
			base: 'set manager powermeter faults',
			description: 'Clear rack power faults',
			params: {},
			flags: {}
		}
	}
};

// Manager Logging Commands
const gen6ManagerLoggingCommands = {
	show: {
		'manager-log': {
			base: 'show manager log',
			description: 'Show rack manager telemetry log',
			params: {},
			flags: {
				starttime: { flag: '-b', placeholder: '2024-01-01', description: 'Start time' },
				endtime: { flag: '-e', placeholder: '2024-12-31', description: 'End time' },
				startid: { flag: '-s', placeholder: '1', description: 'Start ID' },
				endid: { flag: '-f', placeholder: '100', description: 'End ID' },
				loglevel: { flag: '-l', placeholder: '0', description: 'Log level (0-3)' },
				component: { flag: '-c', placeholder: 'system', description: 'Component name' },
				deviceid: { flag: '-i', placeholder: '1', description: 'Device ID' },
				portid: { flag: '-p', placeholder: '1', description: 'Port ID' }
			}
		},
		'manager-logread': {
			base: 'show manager logread',
			description: 'Show system log contents',
			params: {
				filename: { flag: '-f', required: true, placeholder: 'system.log', description: 'Filename' }
			},
			flags: {
				grepstr: { flag: '-g', placeholder: 'error', description: 'Grep string' },
				numlines: { flag: '-l', placeholder: '100', description: 'Number of lines' }
			}
		},
		'manager-loglevel': {
			base: 'show manager loglevel',
			description: 'Show loglevel of ocsevent.log',
			params: {},
			flags: {}
		}
	},
	set: {
		'manager-log-clear': {
			base: 'set manager log clear',
			description: 'Clear all log entries',
			params: {},
			flags: {}
		},
		'manager-loglevel-set': {
			base: 'set manager loglevel',
			description: 'Change loglevel of ocsevent.log',
			params: {
				loglevel: { flag: '-l', required: true, placeholder: '0', description: 'Log level (0-3)' }
			},
			flags: {}
		}
	}
};

// Manager Network & Services Commands
const gen6ManagerNetworkCommands = {
	show: {
		'manager-ntp-status': {
			base: 'show manager ntp status',
			description: 'Show NTP service status',
			params: {},
			flags: {}
		},
		'manager-ntp-server': {
			base: 'show manager ntp server',
			description: 'Show time server used by NTP service',
			params: {},
			flags: {}
		},
		'manager-ssh-status': {
			base: 'show manager ssh status',
			description: 'Show SSH cipher security configuration level',
			params: {},
			flags: {}
		},
		'manager-nfs-status': {
			base: 'show manager nfs status',
			description: 'Get NFS server status',
			params: {},
			flags: {}
		},
		'manager-tftp-list': {
			base: 'show manager tftp list',
			description: 'List files under TFTP location',
			params: {},
			flags: {}
		},
		'manager-session-list': {
			base: 'show manager session list',
			description: 'Show active manager SSH sessions',
			params: {},
			flags: {}
		},
		'manager-time': {
			base: 'show manager time',
			description: 'Display manager system time and date in UTC',
			params: {},
			flags: {}
		}
	},
	set: {
		'manager-tftp-get': {
			base: 'set manager tftp get',
			description: 'Get file from TFTP server',
			params: {
				server: { flag: '-s', required: true, placeholder: '192.168.1.100', description: 'Server IP' },
				filename: { flag: '-f', required: true, placeholder: 'file.bin', description: 'Filename' }
			},
			flags: {}
		},
		'manager-tftp-put': {
			base: 'set manager tftp put',
			description: 'Put file to TFTP server',
			params: {
				server: { flag: '-s', required: true, placeholder: '192.168.1.100', description: 'Server IP' },
				localfile: { flag: '-l', required: true, placeholder: 'local.bin', description: 'Local file' },
				remotefile: { flag: '-f', required: true, placeholder: 'remote.bin', description: 'Remote file' },
				type: { flag: '-t', required: true, placeholder: 'firmware', description: 'Type' }
			},
			flags: {}
		},
		'manager-tftp-delete': {
			base: 'set manager tftp delete',
			description: 'Delete file from TFTP',
			params: {
				filename: { flag: '-f', required: true, placeholder: 'file.bin', description: 'Filename' }
			},
			flags: {}
		},
		'manager-sftp-get': {
			base: 'set manager sftp get',
			description: 'Get file from SFTP server',
			params: {
				server: { flag: '-s', required: true, placeholder: '192.168.1.100', description: 'Server IP' },
				filename: { flag: '-f', required: true, placeholder: 'file.bin', description: 'Filename' },
				username: { flag: '-u', required: true, placeholder: 'user', description: 'Username' }
			},
			flags: {}
		},
		'manager-sftp-put': {
			base: 'set manager sftp put',
			description: 'Put file to SFTP server',
			params: {
				server: { flag: '-s', required: true, placeholder: '192.168.1.100', description: 'Server IP' },
				filename: { flag: '-f', required: true, placeholder: 'file.bin', description: 'Filename' },
				type: { flag: '-t', required: true, placeholder: 'firmware', description: 'Type' },
				username: { flag: '-u', required: true, placeholder: 'user', description: 'Username' }
			},
			flags: {}
		},
		'manager-nfs-start': {
			base: 'set manager nfs start',
			description: 'Start NFS server',
			params: {},
			flags: {}
		},
		'manager-nfs-stop': {
			base: 'set manager nfs stop',
			description: 'Stop NFS server',
			params: {},
			flags: {}
		},
		'manager-nfs-enable': {
			base: 'set manager nfs enable',
			description: 'Enable NFS server',
			params: {},
			flags: {}
		},
		'manager-nfs-disable': {
			base: 'set manager nfs disable',
			description: 'Disable NFS server',
			params: {},
			flags: {}
		},
		'manager-ntp-start': {
			base: 'set manager ntp start',
			description: 'Start NTP service',
			params: {},
			flags: {}
		},
		'manager-ntp-stop': {
			base: 'set manager ntp stop',
			description: 'Stop NTP service',
			params: {},
			flags: {}
		},
		'manager-ntp-restart': {
			base: 'set manager ntp restart',
			description: 'Restart NTP service',
			params: {},
			flags: {}
		},
		'manager-ntp-enable': {
			base: 'set manager ntp enable',
			description: 'Enable NTP service',
			params: {},
			flags: {}
		},
		'manager-ntp-disable': {
			base: 'set manager ntp disable',
			description: 'Disable NTP service',
			params: {},
			flags: {}
		},
		'manager-ntp-server-set': {
			base: 'set manager ntp server',
			description: 'Set NTP time server',
			params: {
				server: { flag: '-s', required: true, placeholder: '192.168.1.100', description: 'Server IP' }
			},
			flags: {}
		},
		'manager-time-set': {
			base: 'set manager time',
			description: 'Set manager system time',
			params: {
				month: { flag: '-m', required: true, placeholder: '12', description: 'Month (1-12)' },
				day: { flag: '-d', required: true, placeholder: '25', description: 'Day (1-31)' },
				year: { flag: '-y', required: true, placeholder: '2024', description: 'Year' },
				hour: { flag: '-H', required: true, placeholder: '14', description: 'Hour (0-23)' },
				minute: { flag: '-M', required: true, placeholder: '30', description: 'Minute (0-59)' },
				second: { flag: '-S', required: true, placeholder: '0', description: 'Second (0-59)' }
			},
			flags: {}
		},
		'manager-hostname-set': {
			base: 'set manager hostname',
			description: 'Set manager hostname',
			params: {
				hostname: { flag: '-n', required: true, placeholder: 'rscm01', description: 'Hostname' }
			},
			flags: {}
		}
	}
};

// Manager Configuration Commands
const gen6ManagerConfigCommands = {
	show: {
		'manager-pubsub-config': {
			base: 'show manager pubsub config',
			description: 'Display PubSub settings',
			params: {},
			flags: {}
		},
		'manager-userconfigs': {
			base: 'show manager userconfigs',
			description: 'Display user configuration parameters',
			params: {},
			flags: {
				key: { flag: '-k', placeholder: 'param_name', description: 'Key name' },
				grepstr: { flag: '-g', placeholder: 'search', description: 'Grep string' }
			}
		},
		'manager-serialstats': {
			base: 'show manager serialstats',
			description: 'Run serial terminal statistics',
			params: {
				interval: { flag: '-i', required: true, placeholder: '5', description: 'Interval in seconds' }
			},
			flags: {}
		},
		'manager-serialcheck': {
			base: 'show manager serialcheck',
			description: 'Run serial terminal health check',
			params: {
				loop: { flag: '-l', required: true, placeholder: '10', description: 'Loop count' }
			},
			flags: {}
		},
		'manager-healthmonitor-log': {
			base: 'show manager healthmonitor log',
			description: 'Display logs collected by RM health monitoring',
			params: {},
			flags: {}
		},
		'manager-iptables-profiles': {
			base: 'show manager iptables profiles',
			description: 'Display list of configurable profiles',
			params: {},
			flags: {}
		},
		'manager-iptables-rules': {
			base: 'show manager iptables rules',
			description: 'Display iptables rules',
			params: {},
			flags: {
				version: { flag: '-v', placeholder: '4', description: 'IP version (4 or 6)' },
				all: { flag: '-a', boolean: true, description: 'Show all rules' },
				profile: { flag: '', placeholder: 'profile_name', description: 'Profile name' }
			}
		},
		'manager-rsyslog': {
			base: 'show manager rsyslog',
			description: 'Display external server for rsyslog streaming',
			params: {},
			flags: {}
		},
		'manager-portmap': {
			base: 'show manager portmap',
			description: 'Show port mapping details for RSCM connections',
			params: {},
			flags: {}
		},
		'manager-throttle-count': {
			base: 'show manager throttle count',
			description: 'Show rack manager throttle count',
			params: {},
			flags: {
				debug: { flag: 'debug', boolean: true, noFlag: true, description: 'Show debug info' }
			}
		},
		'manager-menu': {
			base: 'show manager menu',
			description: 'Show recovery menu status',
			params: {},
			flags: {}
		}
	},
	set: {
		'manager-gca-refresh': {
			base: 'set manager gca refresh',
			description: 'Refresh GCA cache',
			params: {},
			flags: {}
		},
		'manager-throttle-count-clear': {
			base: 'set manager throttle count clear',
			description: 'Clear throttle count and reset time',
			params: {},
			flags: {}
		},
		'manager-throttle-force-enable-on': {
			base: 'set manager throttle force enable on',
			description: 'Enable throttle signal',
			params: {},
			flags: {}
		},
		'manager-throttle-force-enable-off': {
			base: 'set manager throttle force enable off',
			description: 'Disable throttle signal',
			params: {},
			flags: {}
		},
		'manager-session-kill': {
			base: 'set manager session kill',
			description: 'Kill active SSH session',
			params: {
				sessionId: { flag: '-s', required: true, placeholder: '1', description: 'Session ID' }
			},
			flags: {}
		},
		'manager-menu-on': {
			base: 'set manager menu on',
			description: 'Enable recovery menu',
			params: {},
			flags: {}
		},
		'manager-menu-off': {
			base: 'set manager menu off',
			description: 'Disable recovery menu',
			params: {},
			flags: {}
		},
		'manager-defaults': {
			base: 'set manager defaults',
			description: 'Reset manager to defaults',
			params: {},
			flags: {}
		},
		'manager-pubsub-set': {
			base: 'set manager pubsub',
			description: 'Add/update PubSub configs',
			params: {
				brokers: { flag: '-l', required: true, placeholder: 'broker1,broker2', description: 'Broker list' },
				topic: { flag: '-t', required: true, placeholder: 'topic', description: 'Topic' },
				ssl: { flag: '-s', required: true, placeholder: 'true', description: 'SSL enabled' }
			},
			flags: {}
		},
		'manager-userconfigs-set': {
			base: 'set manager userconfigs',
			description: 'Set userconfig key to value',
			params: {
				keyname: { flag: '-k', required: true, placeholder: 'key', description: 'Key name' },
				value: { flag: '-v', required: true, placeholder: 'value', description: 'Value' }
			},
			flags: {}
		},
		'manager-powercycle': {
			base: 'set manager powercycle',
			description: 'AC power cycle the RSCM',
			params: {},
			flags: {}
		},
		'manager-rsyslog-set': {
			base: 'set manager rsyslog',
			description: 'Set external server for rsyslog streaming',
			params: {
				server: { flag: '-s', required: true, placeholder: '192.168.1.100', description: 'Server IP' }
			},
			flags: {}
		},
		'manager-iptables-add': {
			base: 'set manager iptables add',
			description: 'Add iptables rule',
			params: {
				profile: { flag: '', required: true, placeholder: 'whitelist', description: 'Profile name' },
				source: { flag: '-s', required: true, placeholder: '192.168.1.0/24', description: 'Source IP/CIDR' }
			},
			flags: {
				version: { flag: '-v', placeholder: '4', description: 'IP version (4 or 6)' }
			}
		},
		'manager-iptables-bulkadd': {
			base: 'set manager iptables bulkadd',
			description: 'Bulk add iptables rules',
			params: {
				filepath: { flag: '-s', required: true, placeholder: '/tmp/ips.txt', description: 'File path' }
			},
			flags: {}
		},
		'manager-iptables-delete': {
			base: 'set manager iptables delete',
			description: 'Delete iptables rule',
			params: {
				profile: { flag: '', required: true, placeholder: 'whitelist', description: 'Profile name' },
				source: { flag: '-s', required: true, placeholder: '192.168.1.100', description: 'Source IP' }
			},
			flags: {
				version: { flag: '-v', placeholder: '4', description: 'IP version (4 or 6)' }
			}
		},
		'manager-iptables-enable': {
			base: 'set manager iptables enable',
			description: 'Enable iptables profile',
			params: {
				profile: { flag: '', required: true, placeholder: 'whitelist', description: 'Profile name' }
			},
			flags: {}
		},
		'manager-iptables-disable': {
			base: 'set manager iptables disable',
			description: 'Disable iptables profile',
			params: {
				profile: { flag: '', required: true, placeholder: 'whitelist', description: 'Profile name' }
			},
			flags: {}
		},
		'manager-iptables-restore': {
			base: 'set manager iptables restore',
			description: 'Restore iptables to default',
			params: {},
			flags: {}
		}
	}
};

// Manager Security (Cerberus) Commands
const gen6ManagerCerberusCommands = {
	show: {
		'manager-cerberus': {
			base: 'show manager cerberus',
			description: 'Show manager Cerberus information',
			params: {},
			flags: {}
		},
		'manager-cerberus-version': {
			base: 'show manager cerberus version',
			description: 'Show manager Cerberus version',
			params: {},
			flags: {}
		},
		'manager-cerberus-log': {
			base: 'show manager cerberus log',
			description: 'Show manager Cerberus log',
			params: {},
			flags: {}
		},
		'manager-cerberus-pfm-id': {
			base: 'show manager cerberus pfm id',
			description: 'Show manager Cerberus PFM ID',
			params: {},
			flags: {}
		},
		'manager-cerberus-pfm-version': {
			base: 'show manager cerberus pfm version',
			description: 'Show manager Cerberus PFM version',
			params: {},
			flags: {}
		},
		'manager-cerberus-deviceinfo': {
			base: 'show manager cerberus deviceinfo',
			description: 'Show manager Cerberus device information',
			params: {},
			flags: {}
		},
		'manager-cerberus-certstate': {
			base: 'show manager cerberus certstate',
			description: 'Show manager Cerberus certificate state',
			params: {},
			flags: {}
		}
	},
	set: {
		'manager-cerberus-update': {
			base: 'set manager cerberus update',
			description: 'Update manager Cerberus firmware',
			params: {},
			flags: {}
		},
		'manager-cerberus-pfm-update': {
			base: 'set manager cerberus pfm update',
			description: 'Update manager Cerberus PFM',
			params: {},
			flags: {}
		},
		'manager-cerberus-set': {
			base: 'set manager cerberus',
			description: 'Set manager Cerberus configuration',
			params: {},
			flags: {}
		},
		'manager-cerberus-clear': {
			base: 'set manager cerberus clear',
			description: 'Clear manager Cerberus data',
			params: {},
			flags: {}
		},
		'manager-cerberus-cmd': {
			base: 'set manager cerberus cmd',
			description: 'Send manager Cerberus command',
			params: {},
			flags: {}
		},
		'manager-cerberus-pcd-update': {
			base: 'set manager cerberus pcd update',
			description: 'Update manager Cerberus PCD',
			params: {},
			flags: {}
		}
	}
};

// Manager Firmware & System Commands
const gen6ManagerSystemCommands = {
	show: {
		'manager-fwupdate-status': {
			base: 'show manager fwupdate status',
			description: 'Show most recent firmware update status',
			params: {},
			flags: {}
		},
		'manager-fwupdate-list': {
			base: 'show manager fwupdate list',
			description: 'List available Rack Manager firmware packages',
			params: {},
			flags: {}
		},
		'manager-led': {
			base: 'show manager led',
			description: 'Get manager LED status',
			params: {},
			flags: {}
		}
	},
	set: {
		'manager-fwupdate': {
			base: 'set manager fwupdate',
			description: 'Update manager firmware',
			params: {
				filename: { flag: '-f', required: true, placeholder: 'firmware.bin', description: 'Filename' }
			},
			flags: {}
		},
		'manager-cpld-update': {
			base: 'set manager cpld update',
			description: 'Update manager CPLD firmware',
			params: {},
			flags: {}
		}
	}
};

// System Info & General Commands
const gen6SystemInfoCommands = {
	show: {
		'system-info': {
			base: 'show system info',
			description: 'Show system information (serial number, version)',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-health': {
			base: 'show system health',
			description: 'Get health information including PCIe',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				pcie: { flag: '-p', boolean: true, description: 'Include PCIe info' }
			}
		},
		'system-fru': {
			base: 'show system fru',
			description: 'Get FRU information (Asset Tag, Serial #, Node MSF, etc.)',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				fruId: { flag: '-f', placeholder: '1', description: 'FRU ID (0=Product FRU [default], 1+=other FRUs)' }
			}
		},
		'system-state': {
			base: 'show system state',
			description: 'Get ON/OFF state and datasafe status',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-presence': {
			base: 'show system presence',
			description: 'Show system physical presence',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-default-power': {
			base: 'show system default power',
			description: 'Get default power state (ON/OFF)',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-type': {
			base: 'show system type',
			description: 'Show system type',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-led': {
			base: 'show system led',
			description: 'Show system LED state',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		}
	},
	set: {
		'system-on': {
			base: 'set system on',
			description: 'Soft power server ON',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				blade: { flag: '-b', placeholder: '0', description: 'Device ID (0=Host OS, 1=SoC)' }
			}
		},
		'system-off': {
			base: 'set system off',
			description: 'Soft power server OFF',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				blade: { flag: '-b', placeholder: '0', description: 'Device ID (0=Host OS, 1=SoC)' }
			}
		},
		'system-reset': {
			base: 'set system reset',
			description: 'Power cycle or soft reset server',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				blade: { flag: '-b', placeholder: '0', description: 'Device ID (0=Host OS, 1=SoC)' }
			}
		},
		'system-led-on': {
			base: 'set system led on',
			description: 'Turn server UID LED ON',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-led-off': {
			base: 'set system led off',
			description: 'Turn server UID LED OFF',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-default-power-on': {
			base: 'set system default power on',
			description: 'Set default power state to ON',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-default-power-off': {
			base: 'set system default power off',
			description: 'Set default power state to OFF',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-vreset': {
			base: 'set system vreset',
			description: 'Virtual reset BMC (Gen 11+)',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		}
	}
};

// System Power Commands
const gen6SystemPowerCommands = {
	show: {
		'system-power-limit': {
			base: 'show system power limit',
			description: 'Show power limit for server',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-power-reading': {
			base: 'show system power reading',
			description: 'Get power reading for server',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-power-alert': {
			base: 'show system power alert',
			description: 'Get power alert policy',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-power-throttle': {
			base: 'show system power throttle',
			description: 'Get throttling statistics',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		}
	},
	set: {
		'system-power-alert-set': {
			base: 'set system power alert',
			description: 'Set power alert policy',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				powerlimit: { flag: '-p', required: true, placeholder: '500', description: 'Power limit in watts' },
				alertAction: { flag: '-e', required: true, placeholder: '0', description: 'Alert action (0=nothing, 1=limit only, 2=throttle+limit)' },
				throttleDuration: { flag: '-f', required: true, placeholder: '60', description: 'Fast throttle duration (milliseconds)' },
				removeDelay: { flag: '-d', required: true, placeholder: '30', description: 'Auto remove limit delay (seconds)' }
			},
			flags: {
				remediation: { flag: '-r', placeholder: '0', description: 'Remediation (0=nothing, 1=remove+rearm, 2=rearm)' }
			}
		},
		'system-power-limit-value': {
			base: 'set system power limit value',
			description: 'Set power limit',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				powerLimit: { flag: '-l', required: true, placeholder: '500', description: 'Power limit in watts' }
			},
			flags: {}
		},
		'system-power-limit-on': {
			base: 'set system power limit on',
			description: 'Activate power limit and enable throttling',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-power-limit-off': {
			base: 'set system power limit off',
			description: 'Deactivate power limit and disable throttling',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		}
	}
};

// System FPGA Commands
const gen6SystemFpgaCommands = {
	show: {
		'system-fpga-health': {
			base: 'show system fpga health',
			description: 'Get system FPGA health',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-fpga-temp': {
			base: 'show system fpga temp',
			description: 'Get system FPGA temperature in Celsius',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-fpga-i2cversion': {
			base: 'show system fpga i2cversion',
			description: 'Get system FPGA I2C version',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-fpga-assetinfo': {
			base: 'show system fpga assetinfo',
			description: 'Get system FPGA asset information',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		}
	},
	set: {}
};

// System Boot & BIOS Commands
const gen6SystemBootCommands = {
	show: {
		'system-boot': {
			base: 'show system boot',
			description: 'Get pending boot order',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				blade: { flag: '-b', placeholder: '0', description: 'Device ID (0=Host OS, 1=SoC)' }
			}
		},
		'system-log-read': {
			base: 'show system log read',
			description: 'Read server event log',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-bios-config': {
			base: 'show system bios config',
			description: 'Get server BIOS configuration',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-bios-code': {
			base: 'show system bios code',
			description: 'Get post code for server',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-bios-update': {
			base: 'show system bios update',
			description: 'Show BIOS firmware update status',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-bmc-update': {
			base: 'show system bmc update',
			description: 'Show BMC firmware update status',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				region: { flag: '-c', placeholder: 'region', description: 'Region' }
			}
		},
		'system-cpld-update': {
			base: 'show system cpld update',
			description: 'Show CPLD firmware update status',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				index: { flag: '-s', placeholder: '0', description: 'Index' }
			}
		},
		'system-cpld2-update': {
			base: 'show system cpld2 update',
			description: 'Show CPLD2 firmware update status',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				index: { flag: '-s', placeholder: '0', description: 'Index' }
			}
		},
		'system-scmcpld-update': {
			base: 'show system scmcpld update',
			description: 'Show SCM CPLD firmware update status',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				type: { flag: '-t', placeholder: '0', description: 'Type (0, 1, or 2)' },
				index: { flag: '-s', placeholder: '0', description: 'Index' }
			}
		},
		'system-globalcpld-update': {
			base: 'show system globalcpld update',
			description: 'Show Global CPLD firmware update status',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-pcieswitch-update': {
			base: 'show system pcieswitch update',
			description: 'Show PCIe switch firmware update status',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		}
	},
	set: {
		'system-boot-set': {
			base: 'set system boot',
			description: 'Set boot device type (requires soft power cycle to take effect)',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				bootType: { flag: '-t', required: true, placeholder: '2', description: 'Boot type (1=none, 2=pxe, 3=disk, 4=bios, 5=remotedrive, 6=emmc, 7=usb, 8=netunlock)' }
			},
			flags: {
				blade: { flag: '-b', placeholder: '0', description: 'Device ID (0=Host OS, 1=SoC; SoC only: emmc,usb,pxe,netunlock)' },
				bootMode: { flag: '-m', placeholder: '0', description: 'Boot mode (0=Legacy, 1=UEFI)' },
				persistent: { flag: '-p', placeholder: '0', description: 'Persistent (0=One-time, 1=Persistent)' }
			}
		},
		'system-log-clear': {
			base: 'set system log clear',
			description: 'Clear server logs',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-bios-config-set': {
			base: 'set system bios config',
			description: 'Set BIOS configuration',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				major: { flag: '-j', required: true, placeholder: '0', description: 'Major index' },
				minor: { flag: '-n', required: true, placeholder: '0', description: 'Minor index' }
			},
			flags: {}
		},
		'system-bios-update-set': {
			base: 'set system bios update',
			description: 'Update server BIOS firmware',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				file: { flag: '-f', required: true, placeholder: 'bios.bin', description: 'Filename' }
			},
			flags: {
				component: { flag: '-c', placeholder: '1', description: 'Component (1 or 2)' },
				activate: { flag: '-a', boolean: true, description: 'Activate after update' }
			}
		},
		'system-bmc-update-set': {
			base: 'set system bmc update',
			description: 'Update server BMC firmware',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				file: { flag: '-f', required: true, placeholder: 'bmc.bin', description: 'Filename' }
			},
			flags: {
				region: { flag: '-c', placeholder: 'region', description: 'Region' },
				activate: { flag: '-a', boolean: true, description: 'Activate after update' }
			}
		},
		'system-cpld-update-set': {
			base: 'set system cpld update',
			description: 'Update server CPLD firmware',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				file: { flag: '-f', required: true, placeholder: 'cpld.bin', description: 'Filename' }
			},
			flags: {
				index: { flag: '-s', placeholder: '0', description: 'Index' },
				activate: { flag: '-a', boolean: true, description: 'Activate after update' }
			}
		},
		'system-cpld2-update-set': {
			base: 'set system cpld2 update',
			description: 'Update server CPLD2 firmware',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				file: { flag: '-f', required: true, placeholder: 'cpld2.bin', description: 'Filename' }
			},
			flags: {
				index: { flag: '-s', placeholder: '0', description: 'Index' },
				activate: { flag: '-a', boolean: true, description: 'Activate after update' }
			}
		},
		'system-scmcpld-update-set': {
			base: 'set system scmcpld update',
			description: 'Update SCM CPLD firmware',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				file: { flag: '-f', required: true, placeholder: 'scmcpld.bin', description: 'Filename' }
			},
			flags: {
				type: { flag: '-t', placeholder: '0', description: 'Type (0, 1, or 2)' },
				index: { flag: '-s', placeholder: '0', description: 'Index' },
				activate: { flag: '-a', boolean: true, description: 'Activate after update' }
			}
		},
		'system-globalcpld-update-set': {
			base: 'set system globalcpld update',
			description: 'Update Global CPLD firmware',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				file: { flag: '-f', required: true, placeholder: 'globalcpld.bin', description: 'Filename' }
			},
			flags: {
				activate: { flag: '-a', boolean: true, description: 'Activate after update' }
			}
		},
		'system-pcieswitch-update-set': {
			base: 'set system pcieswitch update',
			description: 'Update PCIe switch firmware',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				file: { flag: '-f', required: true, placeholder: 'pcieswitch.bin', description: 'Filename' }
			},
			flags: {}
		}
	}
};

// System Storage & Devices Commands
const gen6SystemStorageCommands = {
	show: {
		'system-tpm-presence': {
			base: 'show system tpm presence',
			description: 'Check if TPM physical presence is set',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-nvme': {
			base: 'show system nvme',
			description: 'Show NVMe status',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-datasafe-policy': {
			base: 'show system datasafe policy',
			description: 'Show datasafe (NVDIMM, PCIe) policy settings',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-datasafe-trigger': {
			base: 'show system datasafe trigger',
			description: 'Show datasafe trigger status',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-file-list': {
			base: 'show system file list',
			description: 'List files available for transfer',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				directory: { flag: '-d', placeholder: '/path', description: 'Directory' }
			}
		}
	},
	set: {
		'system-tpm-presence-set': {
			base: 'set system tpm presence',
			description: 'Set TPM physical presence',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				presence: { flag: '-p', required: true, placeholder: '1', description: 'Presence (0 or 1)' }
			},
			flags: {}
		},
		'system-remotedrive-mount': {
			base: 'set system remotedrive mount',
			description: 'Mount ISO image as boot drive',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				imageName: { flag: '-n', required: true, placeholder: 'image.iso', description: 'Image name' }
			},
			flags: {
				blade: { flag: '-b', placeholder: '0', description: 'Device ID (0=Host OS, 1=SoC)' },
				mode: { flag: '-m', placeholder: '1', description: 'Mode (1 or 2)' }
			}
		},
		'system-remotedrive-unmount': {
			base: 'set system remotedrive unmount',
			description: 'Unmount ISO image',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				blade: { flag: '-b', placeholder: '0', description: 'Device ID (0=Host OS, 1=SoC)' },
				mode: { flag: '-m', placeholder: '1', description: 'Mode (1 or 2)' }
			}
		},
		'system-file-delete': {
			base: 'set system file delete',
			description: 'Delete file from server',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				filename: { flag: '-f', required: true, placeholder: 'file.txt', description: 'Filename' }
			},
			flags: {
				directory: { flag: '-d', placeholder: '/path', description: 'Directory' }
			}
		},
		'system-file-get': {
			base: 'set system file get',
			description: 'Get file from server to RM',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				filename: { flag: '-f', required: true, placeholder: 'file.txt', description: 'Filename' }
			},
			flags: {
				directory: { flag: '-d', placeholder: '/path', description: 'Directory' }
			}
		},
		'system-file-put': {
			base: 'set system file put',
			description: 'Put file to server from RM',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				filename: { flag: '-f', required: true, placeholder: 'file.txt', description: 'Filename' }
			},
			flags: {
				directory: { flag: '-d', placeholder: '/path', description: 'Directory' }
			}
		}
	}
};

// System Cerberus Commands
const gen6SystemCerberusCommands = {
	show: {
		'system-cerberus-version': {
			base: 'show system cerberus version',
			description: 'Read platform/SoC Cerberus version',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				type: { flag: '-t', placeholder: '0', description: 'Type (0=Cerberus, 1=RIOT)' },
				device: { flag: '-b', placeholder: '0', description: 'Device (0=Platform, 1=SoC)' },
				index: { flag: '-c', placeholder: '0', description: 'Cerberus component index' }
			}
		},
		'system-cerberus-pfm-version': {
			base: 'show system cerberus pfm version',
			description: 'Read PFM version',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				device: { flag: '-b', placeholder: '0', description: 'Device (0=Platform, 1=SoC)' },
				port: { flag: '-p', placeholder: '0', description: 'Port (Platform: 0=BMC,1=BIOS; SoC: 0=FIP,1=NITRO)' },
				region: { flag: '-r', placeholder: '0', description: 'Region (0 or 1)' },
				index: { flag: '-c', placeholder: '0', description: 'Cerberus component index' }
			}
		},
		'system-cerberus-pfm-id': {
			base: 'show system cerberus pfm id',
			description: 'Read PFM ID',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				device: { flag: '-b', placeholder: '0', description: 'Device (0=Platform, 1=SoC)' },
				port: { flag: '-p', placeholder: '0', description: 'Port (Platform: 0=BMC,1=BIOS; SoC: 0=FIP,1=NITRO)' },
				region: { flag: '-r', placeholder: '0', description: 'Region (0 or 1)' },
				index: { flag: '-c', placeholder: '0', description: 'Cerberus component index' }
			}
		},
		'system-cerberus-log': {
			base: 'show system cerberus log',
			description: 'Read Cerberus debug/TCG log',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				logType: { flag: '', required: true, placeholder: 'debug', description: 'Log type (debug or tcg)', noFlag: true, insertBefore: true }
			},
			flags: {
				device: { flag: '-b', placeholder: '0', description: 'Device (0=Platform, 1=SoC)' },
				index: { flag: '-c', placeholder: '0', description: 'Cerberus component index' }
			}
		},
		'system-cerberus-fpga-version': {
			base: 'show system cerberus fpga version',
			description: 'List Cyclone-V FPGA version',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {
				device: { flag: '-b', placeholder: '1', description: 'Device (1=SoC)' },
				type: { flag: '-t', placeholder: '1', description: 'Type (1=RIOT)' }
			}
		},
		'system-user-list': {
			base: 'show system user list',
			description: 'List all users in server BMC',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		}
	},
	set: {
		'system-cerberus-update': {
			base: 'set system cerberus update',
			description: 'Update Cerberus firmware',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				deviceId: { flag: '-b', required: true, placeholder: '0', description: 'Device (0=Platform, 1=SoC, 2=SoC OMC, 3x=MCTP)' },
				file: { flag: '-f', required: true, placeholder: 'cerberus.bin', description: 'Firmware file' }
			},
			flags: {
				index: { flag: '-c', placeholder: '0', description: 'Cerberus component index' },
				impactful: { flag: '-m', placeholder: '0', description: 'Impactful update (0 or 1)' },
				tokenfile: { flag: '-t', placeholder: 'token.bin', description: 'Token file for auth' }
			}
		},
		'system-cerberus-pfm-update': {
			base: 'set system cerberus pfm update',
			description: 'Update Cerberus PFM',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				deviceId: { flag: '-b', required: true, placeholder: '0', description: 'Device (0=Platform, 1=SoC)' },
				portId: { flag: '-p', required: true, placeholder: '0', description: 'Port (Platform: 0=BMC,1=BIOS; SoC: 0=FIP,1=NITRO)' },
				file: { flag: '-f', required: true, placeholder: 'pfm.bin', description: 'PFM file' }
			},
			flags: {
				activate: { flag: '-a', placeholder: '0', description: 'Activate (0 or 1)' },
				index: { flag: '-c', placeholder: '0', description: 'Cerberus component index' }
			}
		},
		'system-cerberus-clear-debug': {
			base: 'set system cerberus clear debug',
			description: 'Clear Cerberus debug/TCG log',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				deviceId: { flag: '-b', required: true, placeholder: '0', description: 'Device (0=Platform, 1=SoC)' }
			},
			flags: {
				index: { flag: '-c', placeholder: '0', description: 'Cerberus component index' }
			}
		},
		'system-user-password': {
			base: 'set system user password',
			description: 'Set BMC user password',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				username: { flag: '-u', required: true, placeholder: 'admin', description: 'Username' },
				password: { flag: '-p', required: true, placeholder: 'password', description: 'Password' }
			},
			flags: {}
		},
		'system-soc-update': {
			base: 'set system soc update',
			description: 'Update SoC FIP/Nitro firmware',
			params: {
				updateType: { flag: '', required: true, placeholder: 'fip', description: 'Update type (fip or nitro)', noFlag: true, insertBefore: true },
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				portId: { flag: '-p', required: true, placeholder: '0', description: 'Port (0=FIP, 1=NITRO)' },
				file: { flag: '-f', required: true, placeholder: 'soc.bin', description: 'Firmware file' }
			},
			flags: {}
		}
	}
};

// System GPU/MCU Commands (C44AD only)
const gen6SystemGpuCommands = {
	show: {
		'system-gpu-update': {
			base: 'show system gpu update',
			description: 'Show GPU firmware update status (C44AD only)',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				index: { flag: '-s', required: true, placeholder: '0', description: 'Index' }
			},
			flags: {}
		},
		'system-mcu-update': {
			base: 'show system mcu update',
			description: 'Show MCU firmware update status (C44AD only)',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				index: { flag: '-s', required: true, placeholder: '0', description: 'Index' }
			},
			flags: {}
		}
	},
	set: {
		'system-gpu-update-set': {
			base: 'set system gpu update',
			description: 'Update GPU firmware (C44AD only)',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				file: { flag: '-f', required: true, placeholder: 'gpu.bin', description: 'Firmware file' },
				index: { flag: '-s', required: true, placeholder: '0', description: 'Index' }
			},
			flags: {
				activate: { flag: '-a', boolean: true, description: 'Activate after update' }
			}
		},
		'system-mcu-update-set': {
			base: 'set system mcu update',
			description: 'Update MCU firmware (C44AD only)',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true },
				file: { flag: '-f', required: true, placeholder: 'mcu.bin', description: 'Firmware file' },
				index: { flag: '-s', required: true, placeholder: '0', description: 'Index' }
			},
			flags: {
				activate: { flag: '-a', boolean: true, description: 'Activate after update' }
			}
		}
	}
};

// System JTAG Commands
const gen6SystemJtagCommands = {
	show: {},
	set: {
		'system-jtag-start': {
			base: 'set system jtag start',
			description: 'Start JTAG/ITP server on BMC',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		},
		'system-jtag-stop': {
			base: 'set system jtag stop',
			description: 'Stop JTAG/ITP server on BMC',
			params: {
				serverId: { flag: '-i', required: true, placeholder: '1', description: 'Server ID', useGlobalIndex: true }
			},
			flags: {}
		}
	}
};

// Tree Navigation State
let currentAction = 'show';
let currentCommand = null;

// Initialize Network Commands
function initGen6NetworkCommands() {
	const actionButtons = document.querySelectorAll('.gen6-action-btn');
	const commandSelect = document.getElementById('gen6-network-command');

	// Action button click handlers
	actionButtons.forEach(btn => {
		btn.addEventListener('click', function() {
			actionButtons.forEach(b => b.classList.remove('active'));
			this.classList.add('active');
			currentAction = this.dataset.action;
			updateCommandDropdown();
		});
	});

	// Command selection handler
	commandSelect.addEventListener('change', function() {
		currentCommand = this.value;
		if (currentCommand) {
			buildNetworkCommandUI();
		} else {
			clearParametersSection();
		}
	});

	// Initialize with show commands
	updateCommandDropdown();
}

// Update command dropdown based on selected action
function updateCommandDropdown() {
	const commandSelect = document.getElementById('gen6-network-command');
	commandSelect.innerHTML = '<option value="">Select a command...</option>';

	const commands = gen6NetworkCommands[currentAction];
	for (const [key, cmd] of Object.entries(commands)) {
		const option = document.createElement('option');
		option.value = key;
		option.textContent = cmd.description;
		commandSelect.appendChild(option);
	}

	// Reset selection
	currentCommand = null;
	clearParametersSection();
}

// Build the parameter UI for selected command
function buildNetworkCommandUI() {
	const cmd = gen6NetworkCommands[currentAction][currentCommand];
	const paramsContainer = document.getElementById('gen6-params-container');

	paramsContainer.innerHTML = '';

	// Add required parameters
	if (Object.keys(cmd.params).length > 0) {
		const requiredSection = document.createElement('div');
		requiredSection.className = 'gen6-params-section';
		requiredSection.innerHTML = '<h4 style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">Required Parameters</h4>';

		for (const [key, param] of Object.entries(cmd.params)) {
			const paramGroup = createParameterInput(key, param, true);
			requiredSection.appendChild(paramGroup);
		}

		paramsContainer.appendChild(requiredSection);
	}

	// Add optional flags
	if (Object.keys(cmd.flags).length > 0) {
		const flagsSection = document.createElement('div');
		flagsSection.className = 'gen6-params-section';
		flagsSection.innerHTML = '<h4 style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; margin-top: 16px;">Optional Flags</h4>';

		for (const [key, flag] of Object.entries(cmd.flags)) {
			const flagGroup = createFlagInput(key, flag);
			flagsSection.appendChild(flagGroup);
		}

		paramsContainer.appendChild(flagsSection);
	}

	// Build and display command
	buildGen6NetworkCommand();
}

// Get global index value (same as in wcs.js)
function getGlobalIndex() {
	const indexInput = document.getElementById('globalIndex');
	return indexInput ? indexInput.value : '1';
}

// Create parameter input field
function createParameterInput(key, param, required) {
	const group = document.createElement('div');
	group.className = 'gen6-param-group';

	const label = document.createElement('label');
	label.textContent = param.description;
	label.style.fontSize = '13px';
	label.style.color = 'var(--text-primary)';
	label.style.marginBottom = '4px';
	label.style.display = 'block';

	const input = document.createElement('input');
	input.type = 'text';
	input.className = 'gen6-param-input';
	input.placeholder = param.placeholder;
	input.dataset.key = key;
	input.dataset.flag = param.flag;

	// If this parameter should use the global index, populate it automatically
	if (param.useGlobalIndex) {
		input.value = getGlobalIndex();
		input.dataset.useGlobalIndex = 'true';
		// Add a note to the label
		const note = document.createElement('span');
		note.textContent = ' (uses global index)';
		note.style.fontSize = '11px';
		note.style.color = 'var(--text-secondary)';
		note.style.fontStyle = 'italic';
		label.appendChild(note);
	}

	input.addEventListener('input', buildGen6NetworkCommand);

	group.appendChild(label);
	group.appendChild(input);

	return group;
}

// Create flag checkbox + input
function createFlagInput(key, flag) {
	const group = document.createElement('div');
	group.className = 'gen6-flag-group';

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.id = `gen6-flag-${key}`;
	checkbox.dataset.key = key;
	checkbox.dataset.flag = flag.flag;
	checkbox.dataset.boolean = flag.boolean || false;
	checkbox.dataset.value = flag.value || '';
	checkbox.addEventListener('change', function() {
		const input = group.querySelector('.gen6-flag-input');
		if (input) {
			input.disabled = !this.checked;
			input.style.opacity = this.checked ? '1' : '0.5';
		}
		buildGen6NetworkCommand();
	});

	const label = document.createElement('label');
	label.htmlFor = `gen6-flag-${key}`;
	label.textContent = flag.description;
	label.style.fontSize = '13px';
	label.style.color = 'var(--text-secondary)';
	label.style.marginLeft = '8px';
	label.style.cursor = 'pointer';

	const checkboxContainer = document.createElement('div');
	checkboxContainer.style.display = 'flex';
	checkboxContainer.style.alignItems = 'center';
	checkboxContainer.appendChild(checkbox);
	checkboxContainer.appendChild(label);

	group.appendChild(checkboxContainer);

	// Add input field for non-boolean flags
	if (!flag.boolean) {
		const input = document.createElement('input');
		input.type = 'text';
		input.className = 'gen6-flag-input';
		input.placeholder = flag.placeholder;
		input.dataset.key = key;
		input.dataset.flag = flag.flag;
		input.disabled = true;
		input.style.opacity = '0.5';
		input.style.marginTop = '4px';
		input.addEventListener('input', buildGen6NetworkCommand);
		group.appendChild(input);
	}

	return group;
}

// Build the final command string
function buildGen6NetworkCommand() {
	if (!currentCommand) return;

	const cmd = gen6NetworkCommands[currentAction][currentCommand];
	let command = cmd.base;

	// Add required parameters
	const paramInputs = document.querySelectorAll('.gen6-param-input');
	paramInputs.forEach(input => {
		if (input.value.trim()) {
			command += ` ${input.dataset.flag} ${input.value.trim()}`;
		}
	});

	// Add optional flags
	const flagCheckboxes = document.querySelectorAll('.gen6-flag-group input[type="checkbox"]:checked');
	flagCheckboxes.forEach(checkbox => {
		if (checkbox.dataset.boolean === 'true') {
			// Boolean flag - just add the flag and value
			const value = checkbox.dataset.value || '';
			command += ` ${checkbox.dataset.flag}${value ? ' ' + value : ''}`;
		} else {
			// Flag with input value
			const input = checkbox.closest('.gen6-flag-group').querySelector('.gen6-flag-input');
			if (input && input.value.trim()) {
				command += ` ${checkbox.dataset.flag} ${input.value.trim()}`;
			}
		}
	});

	// Update command display
	const commandDisplay = document.getElementById('gen6-network-command-display');
	if (commandDisplay) {
		commandDisplay.value = command;
	}
}

// Clear parameters section
function clearParametersSection() {
	const paramsContainer = document.getElementById('gen6-params-container');
	paramsContainer.innerHTML = '';

	const commandDisplay = document.getElementById('gen6-network-command-display');
	if (commandDisplay) {
		commandDisplay.value = '';
	}
}

// Copy command to clipboard (reuse existing function or create new)
function copyGen6Command(button) {
	const commandInput = button.previousElementSibling;
	commandInput.select();
	document.execCommand('copy');

	// Visual feedback
	const originalText = button.textContent;
	button.textContent = 'Copied!';
	button.style.background = 'var(--success)';

	setTimeout(() => {
		button.textContent = originalText;
		button.style.background = '';
	}, 2000);
}

// Initialize Manager Info & Health Commands
function initGen6ManagerInfoCommands() {
	const commandSelect = document.getElementById('gen6-manager-info-command');

	// Populate dropdown with commands
	for (const [key, cmd] of Object.entries(gen6ManagerInfoCommands)) {
		const option = document.createElement('option');
		option.value = key;
		option.textContent = cmd.description;
		commandSelect.appendChild(option);
	}

	// Command selection handler
	commandSelect.addEventListener('change', function() {
		if (this.value) {
			buildManagerCommandUI(this.value, gen6ManagerInfoCommands, 'gen6-manager-info');
		} else {
			clearManagerParametersSection('gen6-manager-info');
		}
	});
}

// Build Manager command UI (generic for all manager cards)
function buildManagerCommandUI(commandKey, commandsObj, cardPrefix) {
	const cmd = commandsObj[commandKey];
	const paramsContainer = document.getElementById(`${cardPrefix}-params-container`);

	paramsContainer.innerHTML = '';

	// Add required parameters (if any)
	if (Object.keys(cmd.params).length > 0) {
		const requiredSection = document.createElement('div');
		requiredSection.className = 'gen6-params-section';
		requiredSection.innerHTML = '<h4 style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">Required Parameters</h4>';

		for (const [key, param] of Object.entries(cmd.params)) {
			const paramGroup = createParameterInput(key, param, true);
			paramGroup.querySelector('input').addEventListener('input', () => buildManagerCommand(commandKey, commandsObj, cardPrefix));
			requiredSection.appendChild(paramGroup);
		}

		paramsContainer.appendChild(requiredSection);
	}

	// Add optional flags (if any)
	if (Object.keys(cmd.flags).length > 0) {
		const flagsSection = document.createElement('div');
		flagsSection.className = 'gen6-params-section';
		flagsSection.innerHTML = '<h4 style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; margin-top: 16px;">Optional Flags</h4>';

		for (const [key, flag] of Object.entries(cmd.flags)) {
			const flagGroup = createFlagInput(key, flag);
			const checkbox = flagGroup.querySelector('input[type="checkbox"]');
			checkbox.addEventListener('change', () => buildManagerCommand(commandKey, commandsObj, cardPrefix));
			const input = flagGroup.querySelector('.gen6-flag-input');
			if (input) {
				input.addEventListener('input', () => buildManagerCommand(commandKey, commandsObj, cardPrefix));
			}
			flagsSection.appendChild(flagGroup);
		}

		paramsContainer.appendChild(flagsSection);
	}

	// Add BIOS preset buttons for system-bios-config-set command
	if (commandKey === 'system-bios-config-set') {
		const presetsSection = document.createElement('div');
		presetsSection.className = 'gen6-params-section';
		presetsSection.style.marginTop = '16px';

		const label = document.createElement('label');
		label.className = 'preset-label';
		label.textContent = 'Default Configurations';
		label.style.fontSize = '13px';
		label.style.color = 'var(--text-secondary)';
		label.style.display = 'block';
		label.style.marginBottom = '8px';

		const buttonsContainer = document.createElement('div');
		buttonsContainer.className = 'preset-buttons';
		buttonsContainer.style.display = 'flex';
		buttonsContainer.style.flexWrap = 'wrap';
		buttonsContainer.style.gap = '8px';

		// Define BIOS presets
		const presets = [
			{ label: 'GN1 (WCS General)', j: 0, n: 0 },
			{ label: 'AZ1 (Azure Compute)', j: 1, n: 0 },
			{ label: 'AH1 (Azure Compute HT/Legacy)', j: 1, n: 1 },
			{ label: 'AS1 (Azure XStore Standard)', j: 1, n: 2 },
			{ label: 'AT1 (Azure XStore Utility)', j: 1, n: 3 },
			{ label: 'AX1 (Azure XIO Standard)', j: 1, n: 4 },
			{ label: 'AY1 (Azure XIO Utility)', j: 1, n: 5 },
			{ label: 'AA1 (Azure Compute HT/Legacy)', j: 1, n: 6 },
			{ label: 'AI1 (Azure Compute HT/UEFI)', j: 1, n: 7 },
			{ label: 'BA1 (Bing Online)', j: 2, n: 0 },
			{ label: 'BB1 (Bing Offline)', j: 2, n: 1 },
			{ label: 'BC1 (Bing Offline/HT)', j: 2, n: 2 },
			{ label: 'EA1 (Exchange)', j: 3, n: 0 },
			{ label: 'PA1 (CPS)', j: 4, n: 0 }
		];

		presets.forEach(preset => {
			const btn = document.createElement('button');
			btn.className = 'preset-btn';
			btn.textContent = preset.label;
			btn.style.padding = '6px 12px';
			btn.style.fontSize = '12px';
			btn.style.border = '1px solid var(--border)';
			btn.style.borderRadius = '4px';
			btn.style.backgroundColor = 'var(--bg-secondary)';
			btn.style.color = 'var(--text-primary)';
			btn.style.cursor = 'pointer';
			btn.style.transition = 'all 0.2s';
			btn.addEventListener('click', () => applyGen6BIOSPreset(preset.j, preset.n));
			btn.addEventListener('mouseenter', () => {
				btn.style.backgroundColor = 'var(--bg-tertiary)';
			});
			btn.addEventListener('mouseleave', () => {
				btn.style.backgroundColor = 'var(--bg-secondary)';
			});
			buttonsContainer.appendChild(btn);
		});

		presetsSection.appendChild(label);
		presetsSection.appendChild(buttonsContainer);
		paramsContainer.appendChild(presetsSection);
	}

	// Build and display command
	buildManagerCommand(commandKey, commandsObj, cardPrefix);
}

// Build Manager command string
function buildManagerCommand(commandKey, commandsObj, cardPrefix) {
	const cmd = commandsObj[commandKey];
	let command = cmd.base;

	// Add required parameters
	const paramInputs = document.querySelectorAll(`#${cardPrefix}-params-container .gen6-param-input`);
	paramInputs.forEach(input => {
		if (input.value.trim()) {
			command += ` ${input.dataset.flag} ${input.value.trim()}`;
		}
	});

	// Add optional flags
	const flagCheckboxes = document.querySelectorAll(`#${cardPrefix}-params-container .gen6-flag-group input[type="checkbox"]:checked`);
	flagCheckboxes.forEach(checkbox => {
		if (checkbox.dataset.boolean === 'true') {
			const value = checkbox.dataset.value || '';
			command += ` ${checkbox.dataset.flag}${value ? ' ' + value : ''}`;
		} else {
			const input = checkbox.closest('.gen6-flag-group').querySelector('.gen6-flag-input');
			if (input && input.value.trim()) {
				command += ` ${checkbox.dataset.flag} ${input.value.trim()}`;
			}
		}
	});

	// Update command display
	const commandDisplay = document.getElementById(`${cardPrefix}-command-display`);
	if (commandDisplay) {
		commandDisplay.value = command;
	}
}

// Apply BIOS preset configuration for Gen6
function applyGen6BIOSPreset(jValue, nValue) {
	const paramsContainer = document.getElementById('gen6-system-boot-params-container');
	if (!paramsContainer) return;

	const inputs = paramsContainer.querySelectorAll('.gen6-param-input');
	inputs.forEach(input => {
		if (input.dataset.flag === '-j') {
			input.value = jValue;
		} else if (input.dataset.flag === '-n') {
			input.value = nValue;
		}
	});

	// Rebuild the command
	buildManagerCommand('system-bios-config-set', gen6SystemBootCommands.set, 'gen6-system-boot');
}

// Clear Manager parameters section
function clearManagerParametersSection(cardPrefix) {
	const paramsContainer = document.getElementById(`${cardPrefix}-params-container`);
	paramsContainer.innerHTML = '';

	const commandDisplay = document.getElementById(`${cardPrefix}-command-display`);
	if (commandDisplay) {
		commandDisplay.value = '';
	}
}

// Generic Manager Card Initialization Function (with Show/Set support)
function initGen6ManagerCard(cardClass, commandsObj, cardPrefix) {
	const actionButtons = document.querySelectorAll(`#${cardPrefix}-card .gen6-action-btn`);
	const commandSelect = document.getElementById(`${cardPrefix}-command`);
	let currentAction = 'show';

	// Action button click handlers
	actionButtons.forEach(btn => {
		btn.addEventListener('click', function() {
			actionButtons.forEach(b => b.classList.remove('active'));
			this.classList.add('active');
			currentAction = this.dataset.action;
			updateManagerCommandDropdown(commandSelect, commandsObj, currentAction, cardPrefix);
		});
	});

	// Command selection handler
	commandSelect.addEventListener('change', function() {
		if (this.value) {
			buildManagerCommandUI(this.value, commandsObj[currentAction], cardPrefix);
		} else {
			clearManagerParametersSection(cardPrefix);
		}
	});

	// Initialize with show commands
	updateManagerCommandDropdown(commandSelect, commandsObj, currentAction, cardPrefix);
}

// Update Manager command dropdown based on selected action
function updateManagerCommandDropdown(commandSelect, commandsObj, action, cardPrefix) {
	commandSelect.innerHTML = '<option value="">Select a command...</option>';

	const commands = commandsObj[action];
	for (const [key, cmd] of Object.entries(commands)) {
		const option = document.createElement('option');
		option.value = key;
		option.textContent = cmd.description;
		commandSelect.appendChild(option);
	}

	// Reset selection
	clearManagerParametersSection(cardPrefix);
}

// Update all Gen 6 commands that use global index
function updateGen6GlobalIndex() {
	// Find all inputs that use global index
	const globalIndexInputs = document.querySelectorAll('.gen6-param-input[data-use-global-index="true"]');
	globalIndexInputs.forEach(input => {
		const newValue = getGlobalIndex();
		if (input.value !== newValue) {
			input.value = newValue;
			// Trigger input event to rebuild the command
			input.dispatchEvent(new Event('input'));
		}
	});
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
	// Check if gen6 network commands container exists
	if (document.querySelector('.gen6-network-card')) {
		initGen6NetworkCommands();
	}

	// Initialize all Manager cards
	if (document.querySelector('.gen6-manager-info-card')) {
		initGen6ManagerCard('.gen6-manager-info-card', gen6ManagerInfoCommands, 'gen6-manager-info');
	}
	if (document.querySelector('.gen6-manager-power-card')) {
		initGen6ManagerCard('.gen6-manager-power-card', gen6ManagerPowerCommands, 'gen6-manager-power');
	}
	if (document.querySelector('.gen6-manager-logging-card')) {
		initGen6ManagerCard('.gen6-manager-logging-card', gen6ManagerLoggingCommands, 'gen6-manager-logging');
	}
	if (document.querySelector('.gen6-manager-network-card')) {
		initGen6ManagerCard('.gen6-manager-network-card', gen6ManagerNetworkCommands, 'gen6-manager-network');
	}
	if (document.querySelector('.gen6-manager-config-card')) {
		initGen6ManagerCard('.gen6-manager-config-card', gen6ManagerConfigCommands, 'gen6-manager-config');
	}
	if (document.querySelector('.gen6-manager-cerberus-card')) {
		initGen6ManagerCard('.gen6-manager-cerberus-card', gen6ManagerCerberusCommands, 'gen6-manager-cerberus');
	}
	if (document.querySelector('.gen6-manager-system-card')) {
		initGen6ManagerCard('.gen6-manager-system-card', gen6ManagerSystemCommands, 'gen6-manager-system');
	}

	// Initialize all System cards
	if (document.querySelector('.gen6-system-info-card')) {
		initGen6ManagerCard('.gen6-system-info-card', gen6SystemInfoCommands, 'gen6-system-info');
	}
	if (document.querySelector('.gen6-system-power-card')) {
		initGen6ManagerCard('.gen6-system-power-card', gen6SystemPowerCommands, 'gen6-system-power');
	}
	if (document.querySelector('.gen6-system-fpga-card')) {
		initGen6ManagerCard('.gen6-system-fpga-card', gen6SystemFpgaCommands, 'gen6-system-fpga');
	}
	if (document.querySelector('.gen6-system-boot-card')) {
		initGen6ManagerCard('.gen6-system-boot-card', gen6SystemBootCommands, 'gen6-system-boot');
	}
	if (document.querySelector('.gen6-system-storage-card')) {
		initGen6ManagerCard('.gen6-system-storage-card', gen6SystemStorageCommands, 'gen6-system-storage');
	}
	if (document.querySelector('.gen6-system-cerberus-card')) {
		initGen6ManagerCard('.gen6-system-cerberus-card', gen6SystemCerberusCommands, 'gen6-system-cerberus');
	}
	if (document.querySelector('.gen6-system-gpu-card')) {
		initGen6ManagerCard('.gen6-system-gpu-card', gen6SystemGpuCommands, 'gen6-system-gpu');
	}
	if (document.querySelector('.gen6-system-jtag-card')) {
		initGen6ManagerCard('.gen6-system-jtag-card', gen6SystemJtagCommands, 'gen6-system-jtag');
	}

	// Listen to global index changes
	const globalIndexInput = document.getElementById('globalIndex');
	if (globalIndexInput) {
		globalIndexInput.addEventListener('input', updateGen6GlobalIndex);
		globalIndexInput.addEventListener('change', updateGen6GlobalIndex);
	}
});
