# RSCM CLI Command Reference

**Rack-Secure Control Module (R-SCM) Command-Line Interface** for managing Microsoft Open Cloud Server (OCS) systems.

**Access Methods**: Serial (UART), SSH (Ethernet)
**Interface Types**: RESTful Web API (automated), CLI (manual management)

---

## Table of Contents
1. [Network Commands](#1-network-commands)
2. [Manager Commands](#2-manager-commands)
3. [System/Server Commands](#3-systemserver-commands)
4. [User Commands](#4-user-commands)
5. [Powershelf Commands](#5-powershelf-commands)
6. [CDU Commands](#6-cdu-commands)
7. [Cerberus Commands (Manager)](#7-cerberus-commands-manager)
8. [CPLD Commands (Manager)](#8-cpld-commands-manager)
9. [Inter-Rack Commands](#9-inter-rack-commands)
10. [Smart IT Rack Commands](#10-smart-it-rack-commands)
11. [PCU Commands](#11-pcu-commands)
12. [NVSwitch Commands](#12-nvswitch-commands)
13. [Help Commands](#13-help-commands)
14. [MTE Commands](#14-mte-commands)

---

## 1. Network Commands

### show network
Display all physical network interfaces.

| Flag | Description |
|------|-------------|
| `-h` | Help |

### show network interface
Display specific interface details (IPv4/IPv6, MAC address, status).

| Flag | Required | Description |
|------|----------|-------------|
| `-i <interface>` | Yes | Interface name (eth0, eth1) |
| `-h` | No | Help |

### show network ping
Test network connectivity to remote host.

| Flag | Required | Description |
|------|----------|-------------|
| `-a <address>` | Yes | Destination IP address or hostname |
| `-c <count>` | No | Number of ping packets to send |
| `-w <timeout>` | No | Timeout in seconds |
| `-h` | No | Help |

### show network traceroute
Discover route to remote host.

| Flag | Required | Description |
|------|----------|-------------|
| `-a <address>` | Yes | Destination IP address or hostname |
| `-u` | No | Use UDP instead of ICMP |
| `-h` | No | Help |

### show network route
Display current management network routing table. **[Not Supported]**

### set network static
Configure static IP address for network interface.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <interface>` | Yes | Interface name (eth0, eth1) |
| `-a <address>` | Yes | Static IP address |
| `-s <subnet>` | Yes | Subnet mask or prefix length |
| `-g <gateway>` | No | Default gateway IP address |
| `-b <broadcast>` | No | Broadcast address |
| `-v 6` | No | Use IPv6 instead of IPv4 |
| `-h` | No | Help |

### set network dhcp
Enable DHCP for network interface.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <interface>` | Yes | Interface name (eth0, eth1) |
| `-v 6` | No | Use DHCPv6 instead of DHCPv4 |
| `-g <gateway>` | No | Default gateway IP address |
| `-h` | No | Help |

### set network interface enable
Enable network interface.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <interface>` | Yes | Interface name to enable |
| `-h` | No | Help |

### set network interface disable
Disable network interface.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <interface>` | Yes | Interface name to disable |
| `-h` | No | Help |

### set network route
Set static route. **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-g <gateway>` | Yes | Gateway IP address |
| `-n <subnet>` | Yes | Network subnet |
| `-v 6` | No | Use IPv6 |
| `-h` | No | Help |

---

## 2. Manager Commands

### General Information

#### show manager info
Display manager component status (servers, PSUs, manager info).

| Flag | Description |
|------|-------------|
| `-s` | Show server information |
| `-p` | Show power supply information |
| `-m` | Show manager information |
| `-h` | Help |

#### show manager health
Display health status (servers, PSU, memory, temperature).

| Flag | Description |
|------|-------------|
| `-s` | Show server health |
| `-p` | Show PSU health |
| `-m` | Show memory health |
| `-h` | Help |

#### show manager version
Display manager version information (package, rootfs, U-Boot, kernel, devicetree).

#### show manager relay
Get power status of manager. **[Not Supported]**

#### show manager led
Get manager LED status (ON/OFF).

#### show manager port state
Get port state and datasafe status. **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <port-id>` | Yes | Port number (1-48) |

#### show manager port presence
Show port presence detection. **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <port-id>` | Yes | Port number |

#### show manager port pairing
Show power control pairing configuration. **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <port-id>` | Yes | Port number |

#### show manager port inventory
Show port inventory (chassis/expander). **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <port-id>` | Yes | Port number |

#### show manager inventory
Display manager inventory details.

#### show manager scandevice
Display rack manager system information and device scan.

#### show manager fru
Get FRU information of R-SCM board.

#### show manager portmap
Display port mapping details for RSCM connections.

#### show manager type
Display manager type.

#### show manager menu
Show recovery menu status (enabled/disabled).

#### show manager time
Display manager system time and date in UTC.

### Logging

#### show manager log
Print rack manager telemetry log with filtering options.

| Flag | Required | Description |
|------|----------|-------------|
| `-b <starttime>` | No | Start time filter (YYYY-MM-DD HH:MM:SS) |
| `-e <endtime>` | No | End time filter (YYYY-MM-DD HH:MM:SS) |
| `-s <startid>` | No | Start log entry ID |
| `-f <endid>` | No | End log entry ID |
| `-l <loglevel>` | No | Log level filter (0-3) |
| `-c <component>` | No | Component name filter |
| `-i <deviceid>` | No | Device ID filter |
| `-p <portid>` | No | Port ID filter |

#### show manager logread
Print system log file contents.

| Flag | Required | Description |
|------|----------|-------------|
| `-f <filename>` | Yes | Log filename to read |
| `-g <grepstr>` | No | Grep pattern to filter |
| `-l <numlines>` | No | Number of lines to display |

#### show manager loglevel
Show log level of ocsevent.log.

#### set manager log clear
Clear all log entries.

#### set manager loglevel
Change log level of ocsevent.log.

| Flag | Required | Description |
|------|----------|-------------|
| `-l <level>` | Yes | Log level (0=Error, 1=Warning, 2=Info, 3=Debug) |

### Power Management

#### show manager powermeter alert
Show rack alert policy configuration.

#### show manager powermeter limit
Show rack power limit policy.

#### show manager powermeter throttletype
Show powershelf throttle mode.

#### show manager powermeter reading
Show rack power readings (voltage, current, power).

#### show manager powermeter multipolicy active
Show active requestor multi-policy power configuration.

#### show manager powermeter multipolicy single
Show single requestor multi-policy configuration.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <requestor-id>` | Yes | Requestor ID |

#### show manager powermeter multipolicy all
Show all requestors multi-policy configuration.

#### show manager powermeter version
Show manager power meter version. **[Not Supported]**

#### show manager powermeter calibration
Show power meter calibration values. **[Not Supported]**

#### show manager power reading
Show manager power reading.

#### show manager power status
Show manager power status.

#### set manager powermeter alert
Set rack power alert policy.

| Flag | Required | Description |
|------|----------|-------------|
| `-e <policy>` | Yes | Alert policy (0=disable, 1=enable) |
| `-d <dcthrottle>` | Yes | DC throttle value |
| `-p <powerlimit>` | Yes | Power limit in watts |

#### set manager powermeter limit
Set rack power limit.

| Flag | Required | Description |
|------|----------|-------------|
| `-p <powerlimit>` | Yes | Power limit in watts |

#### set manager powermeter multipolicy
Configure multi-policy power management.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <requestor-id>` | Yes | Requestor ID |
| `-a <rack-alert>` | Yes | Rack alert enable (0/1) |
| `-t <dc-throttle>` | Yes | DC throttle value |
| `-l <rack-limit>` | Yes | Rack power limit in watts |
| `-p <blade-limit>` | Yes | Blade power limit in watts |
| `-e <alert-action>` | Yes | Alert action type |
| `-f <throttle-duration>` | Yes | Throttle duration in ms |
| `-d <remove-delay>` | Yes | Remove delay in seconds |
| `-r <remediation>` | No | Remediation action |

#### set manager powermeter clearmax
Clear rack maximum power reading.

#### set manager powermeter clearfaults
Clear rack power faults.

#### set manager powermeter calibration
Set power meter calibration values. **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-f <filename>` | Yes | Calibration file path |

#### set manager power faults
Clear manager power faults.

### Network Services

#### show manager tftp status
Get TFTP server status. **[Not Supported]**

#### show manager tftp list
List files available under TFTP location.

#### show manager nfs status
Get NFS server status.

#### show manager ssh status
Display SSH cipher security configuration level.

#### set manager tftp start
Start TFTP server. **[Not Supported]**

#### set manager tftp stop
Stop TFTP server. **[Not Supported]**

#### set manager tftp get
Get file from TFTP server.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <server>` | Yes | TFTP server IP address |
| `-f <filename>` | Yes | File name to retrieve |

#### set manager tftp put
Put file to TFTP server.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <server>` | Yes | TFTP server IP address |
| `-l <localfile>` | Yes | Local file path |
| `-f <remotefile>` | Yes | Remote file name |
| `-t <type>` | Yes | File type |

#### set manager tftp delete
Delete file from TFTP storage.

| Flag | Required | Description |
|------|----------|-------------|
| `-f <filename>` | Yes | File name to delete |

#### set manager sftp get
Get file from SFTP server.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <server>` | Yes | SFTP server IP address |
| `-f <filename>` | Yes | File name to retrieve |
| `-u <username>` | Yes | SFTP username |

#### set manager sftp put
Put file to SFTP server.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <server>` | Yes | SFTP server IP address |
| `-f <filename>` | Yes | File name to upload |
| `-t <type>` | Yes | File type |
| `-u <username>` | Yes | SFTP username |

#### set manager nfs start
Start NFS server.

#### set manager nfs stop
Stop NFS server.

#### set manager nfs enable
Enable NFS server auto-start.

#### set manager nfs disable
Disable NFS server auto-start.

### NTP & Time

#### show manager ntp status
Show NTP service status.

#### show manager ntp server
Show NTP time server configuration.

#### set manager ntp start
Start NTP service.

#### set manager ntp stop
Stop NTP service.

#### set manager ntp restart
Restart NTP service.

#### set manager ntp enable
Enable NTP service auto-start.

#### set manager ntp disable
Disable NTP service auto-start.

#### set manager ntp server
Configure NTP time server.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <server-ip>` | Yes | NTP server IP address |

#### set manager time
Set manager system time and date.

| Flag | Required | Description |
|------|----------|-------------|
| `-m <month>` | Yes | Month (1-12) |
| `-d <day>` | Yes | Day (1-31) |
| `-y <year>` | Yes | Year (YYYY) |
| `-H <hour>` | Yes | Hour (0-23) |
| `-M <minute>` | Yes | Minute (0-59) |
| `-S <second>` | Yes | Second (0-59) |

#### set manager hostname
Set manager hostname.

| Flag | Required | Description |
|------|----------|-------------|
| `-n <hostname>` | Yes | Hostname string |

### Throttle Control

#### show manager throttle local
Show rack manager throttle control status. **[Not Supported]**

#### show manager throttle count
Show rack manager throttle count.

#### show manager throttle count debug
Show rack manager throttle count with debug information.

#### show manager throttle row
Show row manager throttle control status. **[Not Supported]**

#### show manager throttle force
Indicate if throttle signal is active and enabled.

#### set manager throttle local
Set local throttle mode. **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-e <0\|1>` | Yes | Enable (1) or disable (0) |

#### set manager throttle count
Set throttle count configuration.

#### set manager throttle count clear
Clear throttle count and reset time.

#### set manager throttle row
Set row throttle mode. **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-e <0\|1>` | Yes | Enable (1) or disable (0) |

#### set manager throttle force enable
Enable or disable forced throttle signal.

| Flag | Required | Description |
|------|----------|-------------|
| (on\|off) | Yes | Turn throttle on or off |

### Sessions & Recovery

#### show manager recovery
Show row manager bootstrap status. **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <port-id>` | Yes | Port ID |

#### show manager session list
Show active manager SSH sessions.

#### set manager recovery on
Enable recovery mode. **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <port-id>` | No | Port ID |

#### set manager recovery off
Disable recovery mode. **[Not Supported]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <port-id>` | No | Port ID |

#### set manager session kill
Kill active SSH session.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <session-id>` | Yes | Session ID to terminate |

### Firmware & Updates

#### show manager fwupdate status
Show most recent firmware update status.

#### show manager fwupdate list
List available rack manager firmware packages for recovery.

#### set manager fwupdate
Update manager firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-f <filename>` | Yes | Firmware package file path |

### LED & FRU

#### show manager led
Get manager LED status (ON/OFF).

#### set manager led on
Turn manager LED ON.

#### set manager led off
Turn manager LED OFF.

#### show manager fru
Get FRU information of R-SCM board.

#### set manager fru
Update manager FRU information.

| Flag | Required | Description |
|------|----------|-------------|
| `-b <board>` | Yes | Board identifier |
| `-f <filename>` | Yes | FRU data file |
| `-s <size>` | Yes | Data size in bytes |

### Configuration & Monitoring

#### show manager pubsub config
Display PubSub settings (brokers, topic, SSL).

#### show manager userconfigs
Display user configuration parameter settings.

| Flag | Required | Description |
|------|----------|-------------|
| `-k <key>` | No | Specific configuration key |
| `-g <grepstr>` | No | Grep pattern to filter |

#### show manager serialstats
Run serial terminal statistics.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <interval>` | Yes | Sampling interval in seconds |

#### show manager serialcheck
Run serial terminal health check.

| Flag | Required | Description |
|------|----------|-------------|
| `-l <loop>` | Yes | Number of check loops |

#### show manager healthmonitor log
Display logs collected by RM health monitoring.

#### show manager iptables profiles
Display list of configurable firewall profiles.

#### show manager iptables rules
Display iptables firewall rules.

| Flag | Required | Description |
|------|----------|-------------|
| `-v <4\|6>` | No | IP version (4=IPv4, 6=IPv6) |
| `-a` | No | Show all rules |
| `<profile>` | No | Specific profile name |

#### show manager rsyslog
Display current external server for rsyslog streaming.

#### set manager pubsub config
Configure PubSub settings.

| Flag | Required | Description |
|------|----------|-------------|
| `-l <brokers>` | Yes | Broker list (comma-separated) |
| `-t <topic>` | Yes | Topic name |
| `-s <ssl>` | Yes | SSL enable (0/1) |

#### set manager userconfigs
Set user configuration parameter.

| Flag | Required | Description |
|------|----------|-------------|
| `-k <keyname>` | Yes | Configuration key name |
| `-v <value>` | Yes | Configuration value |

#### set manager iptables add
Add iptables firewall rule.

| Flag | Required | Description |
|------|----------|-------------|
| `<profile>` | Yes | Profile name |
| `-s <source>` | Yes | Source IP address/range |
| `-v <4\|6>` | No | IP version (default: 4) |

#### set manager iptables bulkadd
Bulk add iptables rules from file.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <filepath>` | Yes | File path containing rules |

#### set manager iptables delete
Delete iptables firewall rule.

| Flag | Required | Description |
|------|----------|-------------|
| `<profile>` | Yes | Profile name |
| `-s <source>` | Yes | Source IP address/range |
| `-v <4\|6>` | No | IP version (default: 4) |

#### set manager iptables enable
Enable iptables firewall profile.

| Flag | Required | Description |
|------|----------|-------------|
| `<profile>` | Yes | Profile name to enable |

#### set manager iptables disable
Disable iptables firewall profile.

| Flag | Required | Description |
|------|----------|-------------|
| `<profile>` | Yes | Profile name to disable |

#### set manager iptables restore
Restore iptables to default configuration.

#### set manager rsyslog
Configure external server for rsyslog streaming.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <server>` | Yes | Rsyslog server IP address |

### System Control

#### set manager gca refresh
Refresh GCA (Global Chassis Arbiter) cache.

#### set manager menu on
Enable recovery menu.

#### set manager menu off
Disable recovery menu.

#### set manager defaults
Reset manager to default settings.

#### set manager powercycle
AC power cycle the RSCM.

---

## 3. System/Server Commands

### General Information

#### show system info
Display server information (serial number, version).

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system health
Get server health information including PCIe.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-p` | No | Include PCIe information |

#### show system fru
Get FRU information for server.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <fru-id>` | No | Specific FRU ID |

#### show system state
Get server ON/OFF state and datasafe status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system presence
Show server physical presence detection.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system default power
Get default power state (ON/OFF) for server.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system type
Show server type/platform.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system led
Show server LED state.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

### Power Management

#### show system power limit
Show power limit configuration for server.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system power reading
Get current power consumption for server.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system power alert
Get power alert policy configuration.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system power throttle
Get power throttling statistics.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system power alert
Configure power alert policy for server.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-p <powerlimit>` | Yes | Power limit in watts |
| `-e <alert-action>` | Yes | Alert action (0=none, 1=throttle, 2=fast throttle) |
| `-f <throttle-duration>` | Yes | Fast throttle duration in ms |
| `-d <remove-delay>` | Yes | Auto remove delay in seconds |
| `-r <remediation>` | No | Remediation action |

#### set system power limit value
Set power limit for server.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-l <power-limit>` | Yes | Power limit in watts |

#### set system power limit on
Activate power limit and enable throttling.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system power limit off
Deactivate power limit and disable throttling.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

### Power Control

#### set system on
Soft power server ON (supply power to chipset).

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <0\|1>` | No | Device ID (0=Host, 1=SoC) |

#### set system off
Soft power server OFF (remove power from chipset).

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <0\|1>` | No | Device ID (0=Host, 1=SoC) |

#### set system reset
Power cycle or soft reset server.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <0\|1>` | No | Device ID (0=Host, 1=SoC) |

#### set system vreset
Virtual reset BMC (Gen 11+).

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system led on
Turn server UID LED ON.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system led off
Turn server UID LED OFF.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system default power on
Set default power state to ON.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system default power off
Set default power state to OFF.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

### FPGA

#### show system fpga health
Get system FPGA health status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system fpga temp
Get system FPGA temperature in Celsius.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system fpga i2cversion
Get system FPGA I2C version.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system fpga assetinfo
Get system FPGA asset information.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

### Boot & BIOS

#### show system boot
Get pending boot order for next boot.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <0\|1>` | No | Device ID (0=Host, 1=SoC) |

#### show system bios config
Get server BIOS configuration.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system bios code
Get BIOS POST code for server.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system boot
Set boot device type for next boot.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-t <boot-type>` | Yes | Boot type (none, pxe, disk, bios, remotedrive, emmc, usb, netunlock) |
| `-b <0\|1>` | No | Device ID (0=Host, 1=SoC) |
| `-m <boot-mode>` | No | Boot mode (0=Legacy, 1=UEFI) |
| `-p <persistent>` | No | Persistent boot (0=one-time, 1=persistent) |

#### set system bios config
Set BIOS configuration for next reboot.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-j <major>` | Yes | Major configuration number |
| `-n <minor>` | Yes | Minor configuration number |

### Logs

#### show system log read
Read server event log (SEL).

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system log clear
Clear server logs.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

### Firmware Updates

#### show system bios update
Show BIOS firmware update status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system bmc update
Show BMC firmware update status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-c <region>` | No | Flash region |

#### show system cpld update
Show CPLD firmware update status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-s <index>` | No | CPLD index |

#### show system cpld2 update
Show CPLD2 firmware update status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-s <index>` | No | CPLD2 index |

#### show system scmcpld update
Show SCM CPLD firmware update status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-t <0\|1\|2>` | No | Type (0=bootloader, 1=Image_A, 2=Image_B) |
| `-s <index>` | No | CPLD index |

#### show system globalcpld update
Show Global CPLD firmware update status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system pcieswitch update
Show PCIe switch firmware update status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system bios update
Update server BIOS firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <file>` | Yes | Firmware file path |
| `-c <1\|2>` | No | Flash region (1=Primary, 2=Secondary) |
| `-a` | No | Async mode (don't wait for completion) |

#### set system bmc update
Update server BMC firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <file>` | Yes | Firmware file path |
| `-c <region>` | No | Flash region |
| `-a` | No | Async mode |

#### set system cpld update
Update server CPLD firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <file>` | Yes | Firmware file path |
| `-s <index>` | No | CPLD index |
| `-a` | No | Async mode |

#### set system cpld2 update
Update server CPLD2 firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <file>` | Yes | Firmware file path |
| `-s <index>` | No | CPLD2 index |
| `-a` | No | Async mode |

#### set system scmcpld update
Update SCM CPLD firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <file>` | Yes | Firmware file path |
| `-a` | No | Async mode |
| `-t <0\|1\|2>` | No | Type (0=bootloader, 1=Image_A, 2=Image_B) |
| `-s <index>` | No | CPLD index |

#### set system globalcpld update
Update Global CPLD firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <file>` | Yes | Firmware file path |
| `-a` | No | Async mode |

#### set system pcieswitch update
Update PCIe switch firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <file>` | Yes | Firmware file path |

#### show system gpu update
Show GPU firmware update status. **[C44AD only]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-s <index>` | Yes | GPU index |

#### show system mcu update
Show MCU firmware update status. **[C44AD only]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-s <index>` | Yes | MCU index |

#### set system gpu update
Update GPU firmware. **[C44AD only]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <file>` | Yes | Firmware file path |
| `-s <index>` | Yes | GPU index |
| `-a` | No | Async mode |

#### set system mcu update
Update MCU firmware. **[C44AD only]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <file>` | Yes | Firmware file path |
| `-s <index>` | Yes | MCU index |
| `-a` | No | Async mode |

### Storage & Devices

#### show system tpm presence
Check if TPM physical presence is set.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system nvme
Show NVMe device status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system datasafe policy
Show datasafe (NVDIMM, PCIe) policy settings.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### show system datasafe trigger
Show datasafe trigger status.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system tpm presence
Set TPM physical presence.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-p <presence>` | Yes | Presence flag (0/1 or true/false) |

### Remote Drive

#### set system remotedrive mount
Mount ISO image as boot drive.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-n <image-name>` | Yes | ISO image file name |
| `-b <0\|1>` | No | Device ID (0=Host, 1=SoC) |
| `-m <1\|2>` | No | Mount type (1=HD, 2=CD) |

#### set system remotedrive unmount
Unmount remote ISO image.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <0\|1>` | No | Device ID (0=Host, 1=SoC) |
| `-m <1\|2>` | No | Mount type (1=HD, 2=CD) |

### File Management

#### show system file list
List files available for transfer.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-d <directory>` | No | Directory path |

#### set system file delete
Delete file from server.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <filename>` | Yes | File name to delete |
| `-d <directory>` | No | Directory path |

#### set system file get
Get file from server to RM.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <filename>` | Yes | File name to retrieve |
| `-d <directory>` | No | Directory path |

#### set system file put
Put file to server from RM.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-f <filename>` | Yes | File name to upload |
| `-d <directory>` | No | Directory path |

### Cerberus (System)

#### show system cerberus version
Read platform/SoC Cerberus version.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-t <0\|1>` | No | Type (0=Platform, 1=SoC) |
| `-b <0\|1>` | No | Device ID |
| `-c <index>` | No | Component index |

#### show system cerberus pfm version
Read Cerberus PFM version.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <0\|1>` | No | Device ID |
| `-p <0\|1>` | No | Port ID |
| `-r <0\|1>` | No | Region |
| `-c <index>` | No | Component index |

#### show system cerberus pfm id
Read Cerberus PFM ID.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <0\|1>` | No | Device ID |
| `-p <0\|1>` | No | Port ID |
| `-r <0\|1>` | No | Region |
| `-c <index>` | No | Component index |

#### show system cerberus log
Read Cerberus debug or TCG log.

| Flag | Required | Description |
|------|----------|-------------|
| `debug\|tcg` | Yes | Log type |
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <0\|1>` | No | Device ID |
| `-c <index>` | No | Component index |

#### show system cerberus fpga version
List Cyclone-V FPGA version.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b 1` | Yes | Must be 1 for FPGA |
| `-t 1` | Yes | Must be 1 for FPGA |

#### set system cerberus update
Update Cerberus firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <device-id>` | Yes | Device ID (0=Platform, 1=SoC-CMC, 2=SoC-OMC, 3x=MCTP) |
| `-f <file>` | Yes | Firmware file path |
| `-c <index>` | No | Component index |
| `-m <impactful>` | No | Impactful update flag |
| `-t <tokenfile>` | No | Token file path |

#### set system cerberus pfm update
Update Cerberus PFM.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <device-id>` | Yes | Device ID |
| `-p <port-id>` | Yes | Port ID |
| `-f <file>` | Yes | PFM file path |
| `-a <0\|1>` | No | Activation flag |
| `-c <index>` | No | Component index |

#### set system soc update
Update SoC FIP/Nitro firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `fip\|nitro` | Yes | Update type |
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-p <port-id>` | Yes | Port ID |
| `-f <file>` | Yes | Firmware file path |

#### set system cerberus clear
Clear Cerberus debug or TCG log.

| Flag | Required | Description |
|------|----------|-------------|
| `debug` | Yes | Log type to clear |
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <device-id>` | Yes | Device ID |
| `-c <index>` | No | Component index |

### User Management (BMC)

#### show system user list
List all users in server BMC.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system user password
Set BMC user password.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-u <username>` | Yes | Username |
| `-p <password>` | Yes | New password |

### Serial Console

#### start serial session
Start serial console session to server.

**Exit**: Press `Ctrl-X` to exit session

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <0\|1>` | No | Device ID (0=Host, 1=SoC) |
| `-f` | No | Force session start |
| `-p <portid>` | No | Port ID |

#### stop serial session
Stop serial console session to server.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |
| `-b <0\|1>` | No | Device ID (0=Host, 1=SoC) |
| `-p <portid>` | No | Port ID |

### JTAG

#### set system jtag start
Start JTAG/ITP server on BMC.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

#### set system jtag stop
Stop JTAG/ITP server on BMC.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <server-id>` | Yes | Server ID (1-48) |

---

## 4. User Commands

### show user info
Display user information and roles.

| Flag | Required | Description |
|------|----------|-------------|
| `-t <users\|roles>` | No | Type to display (users or roles) |
| `-u <username>` | No | Specific username |

### set user add
Add new user to RSCM.

| Flag | Required | Description |
|------|----------|-------------|
| `-u <username>` | Yes | Username |
| `-p <password>` | Yes | Password |
| `-r <role>` | Yes | Role (admin, operator, user) |

### set user update
Update user password or role.

| Flag | Required | Description |
|------|----------|-------------|
| `-t <password\|role>` | Yes | Update type |
| `-u <username>` | Yes | Username |
| `-p <password>` | No | New password (if updating password) |
| `-r <role>` | No | New role (if updating role) |

### set user delete
Remove existing user.

| Flag | Required | Description |
|------|----------|-------------|
| `-u <username>` | Yes | Username to delete |

---

## 5. Powershelf Commands

### PSU Information

#### show powershelf psu info
Show PSU information (manufacturer, model, version, readings).

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | No | Specific PSU ID (1-18) |
| `-f <forceread>` | No | Force read from hardware |
| `-p <0\|1\|2>` | No | Display mode |

#### show powershelf psu battery
Show PSU battery presence. **[RESERVED]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <psu-id>` | Yes | PSU ID (1-18) |

#### show powershelf psu update
Show PSU firmware update status.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | No | Specific PSU ID |
| `-f <forceread>` | No | Force read from hardware |

#### show powershelf psu version
Show PSU firmware version.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | No | Specific PSU ID |
| `-f <forceread>` | No | Force read from hardware |

#### show powershelf psu limits
Show PSU alert limits.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | No | Specific PSU ID |
| `-f <forceread>` | No | Force read from hardware |

#### show powershelf psu reading
Show PSU parameters (voltage, current, temperature, fan speed, power).

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | No | Specific PSU ID |
| `-f <forceread>` | No | Force read from hardware |

#### show powershelf psu faulthistory
Show recent PSU failure history log.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | No | Specific PSU ID |
| `-f <forceread>` | No | Force read from hardware |

#### show powershelf psu eventlog
Show recent 5 PSU event logs.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | No | Specific PSU ID |
| `-f <forceread>` | No | Force read from hardware |

#### show powershelf psu state
Show PSU state (presence, AC status, alert).

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | No | Specific PSU ID |
| `-f <forceread>` | No | Force read from hardware |

#### show powershelf psu report
Show PSU table with all PSU information.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | No | Specific PSU ID |

#### show powershelf psu slot config
Show Powershelf PSU slot configuration.

#### show powershelf fru
Get FRU information of powershelf.

### PSU Control

#### set powershelf psu alertmask
Set PSU alert masks. **[Not Used]**

| Flag | Required | Description |
|------|----------|-------------|
| `enable\|disable` | Yes | Enable or disable mask |
| `-s <psu-id>` | No | Specific PSU ID |
| `-d <direction>` | Yes | Direction |
| `-t <parameter>` | Yes | Parameter type |

#### set powershelf psu limit
Set PSU alert limits.

#### set powershelf psu clear
Clear PSU faults.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | No | Specific PSU ID |
| `-p <0\|1\|2>` | No | Clear type |

#### set powershelf psu battery
Run battery health test. **[Not Used]**

| Flag | Required | Description |
|------|----------|-------------|
| `-i <psu-id>` | Yes | PSU ID |

#### set powershelf psu update
Update PSU firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | Yes | PSU ID to update |
| `-f <file>` | No | Firmware file path |
| `-r <force>` | No | Force update |

#### set powershelf psu raw
Send raw PMBUS commands to PSU.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | Yes | PSU ID |
| `-c <raw-command>` | Yes | Raw PMBUS command (hex) |
| `-r <rx-length>` | No | Expected response length |
| `-p <pec-enable>` | No | PEC enable flag |

#### set powershelf psu recovery
Recover PSU firmware.

| Flag | Required | Description |
|------|----------|-------------|
| `-s <psu-id>` | Yes | PSU ID |
| `-f <file>` | No | Recovery firmware file |

#### set powershelf psu slot config
Set Powershelf PSU slot configuration.

### C13 Outlets

#### show powershelf c13 reading
Show C13 power reading.

| Flag | Required | Description |
|------|----------|-------------|
| `-c <c13-id>` | No | C13 outlet ID |

#### show powershelf c13 status
Show C13 status (on/off).

| Flag | Required | Description |
|------|----------|-------------|
| `-c <c13-id>` | No | C13 outlet ID |

#### show powershelf c13 mux address
Show I2C address of C13 MUX.

| Flag | Required | Description |
|------|----------|-------------|
| `-c <c13-id>` | No | C13 outlet ID |

#### show powershelf c13 fru
Get FRU information of C13 modules.

| Flag | Required | Description |
|------|----------|-------------|
| `-i <c13-id>` | No | C13 outlet ID |

#### set powershelf c13 on
Switch C13 outlet ON.

| Flag | Required | Description |
|------|----------|-------------|
| `-c <c13-id>` | Yes | C13 outlet ID |

#### set powershelf c13 off
Switch C13 outlet OFF.

| Flag | Required | Description |
|------|----------|-------------|
| `-c <c13-id>` | Yes | C13 outlet ID |

#### set powershelf c13 mux address
Set I2C address of C13 MUX.

| Flag | Required | Description |
|------|----------|-------------|
| `-a <mux-addr>` | Yes | MUX I2C address |

---

## 6. CDU Commands

### Fan Controllers

#### show cdu fan alarm
Show fan controller alarm status.

| Flag | Required | Description |
|------|----------|-------------|
| `-f <fan-id>` | No | Specific fan ID |

#### show cdu fan info
Show fan controller device information.

| Flag | Required | Description |
|------|----------|-------------|
| `-f <fan-id>` | No | Specific fan ID |

#### show cdu fan fru
Show fan controller FRU information.

| Flag | Required | Description |
|------|----------|-------------|
| `-f <fan-id>` | No | Specific fan ID |

#### show cdu fan health
Show fan controller health status.

### Pump Controllers

#### show cdu pump alarm
Show pump controller alarm status.

| Flag | Required | Description |
|------|----------|-------------|
| `-p <pump-id>` | No | Specific pump ID |

#### show cdu pump info
Show pump controller device information.

| Flag | Required | Description |
|------|----------|-------------|
| `-p <pump-id>` | No | Specific pump ID |

#### show cdu pump fru
Show pump controller FRU information.

| Flag | Required | Description |
|------|----------|-------------|
| `-p <pump-id>` | No | Specific pump ID |

#### show cdu pump health
Show pump controller health status.

### Leak Detection

#### show cdu leak alarm
Show leak detection alarm status.

#### show cdu leak info
Show leak detection device information.

#### show cdu leak fru
Show leak detection FRU information.

#### show cdu leak health
Show leak detection health status.

### Sensors

#### show cdu sensor health
Show CDU sensor health status.

#### show cdu sensor info
Show CDU sensor information.

### Control

#### show cdu control sensor
Show CDU control sensor information.

#### set cdu control sensor
Set CDU control sensor configuration.

#### show cdu control param
Show CDU control parameters.

#### set cdu control param
Set CDU control parameters.

#### show cdu control limits
Show CDU control limits.

#### set cdu control limits
Set CDU control limits.

#### show cdu control metrics
Show CDU control metrics.

#### set cdu control metrics
Set CDU control metrics.

#### show cdu control setpoints
Get CDU control setpoints.

#### set cdu control setpoints
Set CDU control setpoints.

### CDU Controller

#### show cdu status
Show CDU controller status.

#### show cdu info
Show CDU controller information.

#### show cdu health
Show CDU controller health.

#### show cdu fru
Show CDU FRU information.

#### show cdu erroralert
Show CDU error alerts.

#### show cdu rackinfo
Show CDU rack information.

#### show cdu rpuinfo
Show CDU RPU (Remote Processing Unit) information.

#### show cdu sensorgatewayinfo
Show CDU sensor gateway information.

#### show cdu valvegatewayinfo
Show CDU valve gateway information.

#### show cdu log
Show CDU logs.

#### show cdu keys
Show CDU cryptographic keys.

#### show cdu blstatus
Show CDU bootloader status.

#### show cdu attest
Show CDU attestation information.

#### set cdu fwupdate
Update CDU firmware.

#### set cdu fwrecover
Recover CDU firmware.

#### set cdu sftp
Configure CDU SFTP settings.

#### set cdu ntp
Configure CDU NTP settings.

#### set cdu modbus
Configure CDU Modbus settings.

#### set cdu recovery
Set CDU recovery mode.

#### set cdu revokekey
Revoke CDU cryptographic key.

#### set cdu boot
Set CDU boot configuration.

#### set cdu verify
Verify CDU firmware.

### Secure Bootloader

#### set sblcmd enter
Enter secure bootloader command mode.

#### set sblcmd exit
Exit secure bootloader command mode.

#### set sblcmd send
Send command to secure bootloader.

### Serial

#### start cdu serial session
Start CDU serial console session.

---

## 7. Cerberus Commands (Manager)

### show manager cerberus
Show manager Cerberus status.

### show manager cerberus version
Show manager Cerberus firmware version.

### show manager cerberus log
Show manager Cerberus logs.

### show manager cerberus pfm id
Show manager Cerberus PFM ID.

### show manager cerberus pfm version
Show manager Cerberus PFM version.

### show manager cerberus deviceinfo
Show manager Cerberus device information.

### show manager cerberus certstate
Show manager Cerberus certificate state.

### show manager cerberus pcd
Show manager Cerberus PCD (Platform Configuration Data).

### show manager cerberus pcd platformid
Show manager Cerberus PCD platform ID.

### show manager cerberus pcd versionid
Show manager Cerberus PCD version ID.

### show manager cerberus utility
Show manager Cerberus utility information.

### set manager cerberus
Configure manager Cerberus settings.

### set manager cerberus clear
Clear manager Cerberus data.

### set manager cerberus update
Update manager Cerberus firmware.

### set manager cerberus pfm update
Update manager Cerberus PFM.

### set manager cerberus cmd
Send command to manager Cerberus.

### set manager cerberus pcd update
Update manager Cerberus PCD.

---

## 8. CPLD Commands (Manager)

### show manager cpld
Show manager CPLD status.

### show manager cpld version
Show manager CPLD firmware version.

### show manager cpld usercode
Show manager CPLD usercode.

### show manager cpld readauth
Show manager CPLD read authorization.

### set manager cpld
Configure manager CPLD settings.

### set manager cpld update
Update manager CPLD firmware.

---

## 9. Inter-Rack Commands

### show interrack wirecheck
Show inter-rack wire check status.

### show interrack zoneshutdown
Show inter-rack zone shutdown status.

### show interrack zoneready
Show inter-rack zone ready status.

### set interrack wirecheck
Perform inter-rack wire check.

### set interrack zoneshutdown
Set inter-rack zone shutdown.

### set interrack zoneready
Set inter-rack zone ready.

### set interrack zoneloopreset
Reset inter-rack zone loop.

---

## 10. Smart IT Rack Commands

### show smrack health
Show Smart IT Rack health status.

### show smrack status
Show Smart IT Rack status.

### show smrack config flowrate
Show Smart IT Rack flow rate configuration.

### show smrack config pressure
Show Smart IT Rack pressure configuration.

### show valve fwversion
Show valve firmware version.

### show valve info
Show valve information.

### set smrack open
Open Smart IT Rack valve.

### set smrack close
Close Smart IT Rack valve.

### set smrack config flowrate
Configure Smart IT Rack flow rate.

### set smrack config pressure
Configure Smart IT Rack pressure.

### set smrack config reset
Reset Smart IT Rack configuration.

### set smrack config custom
Set Smart IT Rack custom configuration.

### set smrack config addrange
Add range to Smart IT Rack configuration.

### set smrack config removerange
Remove range from Smart IT Rack configuration.

### set smrack fwupdate
Update Smart IT Rack firmware.

### set valve modbus
Configure valve Modbus settings.

---

## 11. PCU Commands

### show pcu info
Show PCU (Power Cooling Unit) information.

### show pcu reading
Show PCU power and cooling readings.

### show pcu status
Show PCU status.

### show pcu limits
Show PCU limits.

### show pcu eventlog
Show PCU event log.

### show pcu update
Show PCU firmware update status.

### show pcu state
Show PCU state.

### show pcu chargelog
Show PCU battery charge log.

### set pcu raw read
Read raw data from PCU.

### set pcu raw write
Write raw data to PCU.

### set pcu limits
Set PCU limits.

### set pcu update
Update PCU firmware.

### set pcu fanspeed
Set PCU fan speed.

### set pcu clear
Clear PCU faults.

---

## 12. NVSwitch Commands

### show nvswitch status
Show NVSwitch status.

### set nvswitch on
Turn NVSwitch ON.

### set nvswitch off
Turn NVSwitch OFF.

---

## 13. Help Commands

### help
Show list of command categories.

### help show
Show help for all 'show' commands.

### help set
Show help for all 'set' commands.

### help start
Show help for all 'start' commands.

### help stop
Show help for all 'stop' commands.

### help user
Show help for user management commands.

---

## 14. MTE Commands

Manufacturing Test Environment utilities for hardware testing and diagnostics.

### start mte
Execute MTE utility.

| Flag | Required | Description |
|------|----------|-------------|
| `-u <utility>` | Yes | Utility name (see list below) |
| `-p <params>` | No | Utility parameters |
| `-t <times>` | No | Number of times to execute |
| `-d <duration>` | No | Duration to run |

### show mte
Show all executing MTE utilities.

### stop mte
Stop all executing MTE utilities.

### Available MTE Utilities

| Utility | Description |
|---------|-------------|
| `ocs-gpio` | GPIO operations (setup, read, write, cleanup) |
| `ocs-fru` | FRU read/write operations |
| `ocs-mac` | MAC address read/write operations |
| `ocs-hsc` | Hot Swap Controller operations |
| `ocs-pmic` | PMIC operations |
| `stream` | Memory streaming test |
| `sysbench` | System benchmark |
| `memtester` | Memory tester |
| `ttyS1` | Serial port 1 test |
| `ttyS2` | Serial port 2 test |
| `iperf` | Network performance test |
| `minicom` | Serial communication |
| `reboot` | System reboot |
| `date` | Date/time operations |
| `i2cdetect` | I2C bus detection |
| `i2cdump` | I2C device dump |
| `i2cset` | I2C write operation |
| `i2cget` | I2C read operation |
| `cpuinfo` | CPU information |
| `meminfo` | Memory information |
| `qspiinfo` | QSPI information |
| `mmcinfo` | MMC information |
| `ping` | Network ping test |
| `firewall` | Firewall control (on/off) |
| `lock` | Lock read/write operations |
| `cpld-key-update` | CPLD key update |
| `cpld-lock-public-key` | CPLD lock public key |
| `cpld-program-cfg1` | CPLD program configuration 1 |
| `cpld-feature-row-program` | CPLD feature row program |
| `cpld-program-authdone` | CPLD program auth done |
| `turn-on-isolation-valve` | Turn on isolation valve |
| `turn-off-isolation-valve` | Turn off isolation valve |
| `read-isolation-valve-status` | Read isolation valve status |

---

## Notes

1. **[Not Supported]** - Documented but not currently available
2. **[Not Used]** / **[RESERVED]** - Placeholders for future functionality
3. **[Future]** - Planned for future releases
4. **[C44AD only]** - Specific to C44AD platform
5. **Required vs Optional**:
   - Required flags must be provided
   - Optional flags have defaults or are context-dependent
6. **ID Ranges**:
   - Server IDs: 1-48 (platform dependent)
   - PSU IDs: 1-18 (platform dependent)
   - Fan/Pump IDs: Vary by CDU platform (14 fans/2 pumps for H7010, 32-34 fans/5 pumps for H7021/H7022)
7. **Serial Session Exit**: Press `Ctrl-X` to exit serial sessions
8. **Async Mode**: `-a` flag allows firmware updates to run asynchronously

---

**Document Version**: Based on RSCM CLI Specification V.0.1.28 (October 29, 2025)
