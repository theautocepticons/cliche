# RSCM CLI COMMANDS REFERENCE

This document provides a condensed reference of all RSCM CLI command syntax organized by category.

---

## 1. NETWORK COMMANDS

### Show Commands
- `show network` - Shows physical interfaces list
- `show network interface -i <interface>` - Shows specific interface details (eth0, eth1)
- `show network ping -a <address> [-c count] [-w timeout]` - Test network connectivity to host
- `show network traceroute [-u] -a <address>` - Discovers route to remote host
- `show network route` - Display current management network and gateway [Not Supported]

### Set Commands
- `set network static -i <interface> -a <address> -s <subnet> [-g gateway] [-b broadcast] [-v {6}]` - Set static IP configuration
- `set network dhcp -i <interface> [-v {6}] [-g gateway]` - Set DHCP configuration
- `set network enable -i <interface>` - Enable network interface
- `set network disable -i <interface>` - Disable network interface
- `set network route -g <gateway> -n <subnet> [-v {6}]` - Set static route [Not Supported]

---

## 2. MANAGER COMMANDS

### Show Commands - General
- `show manager info [-s] [-p] [-m]` - Shows manager components info (servers, PSUs, manager)
- `show manager health [-s] [-p] [-m]` - Shows health status for servers, PSUs, memory, temperature
- `show manager version` - Shows manager version information
- `show manager relay` - Gets power status of manager [Not Supported]
- `show manager led` - Gets manager LED status (ON/OFF)
- `show manager port state -i <port-id>` - Gets port state [Not Supported]
- `show manager port presence -i <port-id>` - Shows port presence [Not Supported]
- `show manager port pairing -i <port-id>` - Shows power control pairing [Not Supported]
- `show manager port inventory -i <port-id>` - Shows port inventory [Not Supported]
- `show manager log [-b starttime] [-e endtime] [-s startid] [-f endid] [-l loglevel] [-c component] [-i deviceid] [-p portid]` - Prints rack manager telemetry log
- `show manager logread -f <filename> [-g grepstr] [-l numlines]` - Prints system log contents
- `show manager inventory` - Shows manager inventory details
- `show manager scandevice` - Displays rack manager system information
- `show manager fru` - Gets FRU information of R-SCM board
- `show manager tftp status` - Gets TFTP server status [Not Supported]
- `show manager nfs status` - Gets NFS server status
- `show manager time` - Displays manager system time and date in UTC
- `show manager type` - Displays manager type
- `show manager menu` - Shows recovery menu status (enabled/disabled)
- `show manager portmap` - Shows port mapping details for RSCM connections

### Show Commands - Power
- `show manager powermeter alert` - Shows rack alert policy
- `show manager powermeter limit` - Shows rack power limit policy
- `show manager powermeter throttletype` - Shows powershelf throttle mode
- `show manager powermeter reading` - Shows rack power readings
- `show manager powermeter multipolicy active` - Shows active requestor multi-policy config
- `show manager powermeter multipolicy single -i <requestor-id>` - Shows single requestor multi-policy config
- `show manager powermeter multipolicy all` - Shows all requestors multi-policy config
- `show manager powermeter version` - Shows manager PRU version [Not Supported]
- `show manager powermeter calibration` - Shows calibration values [Not Supported]
- `show manager power reading` - Shows manager power reading
- `show manager power status` - Shows manager power status

### Show Commands - NTP & Network Services
- `show manager ntp status` - Shows NTP service status
- `show manager ntp server` - Shows time server used by NTP service
- `show manager ssh status` - Displays SSH cipher security configuration level

### Show Commands - Throttle & Sessions
- `show manager throttle local` - Shows rack manager throttle control status [Not Supported]
- `show manager throttle count [debug]` - Shows rack manager throttle count
- `show manager throttle row` - Shows row manager throttle control status [Not Supported]
- `show manager throttle force` - Indicates if throttle signal is active and enabled
- `show manager recovery -i <port-id>` - Shows row manager boot strap status [Not Supported]
- `show manager session list` - Shows active manager SSH sessions
- `show manager tftp list` - Lists files under TFTP location

### Show Commands - Firmware & Updates
- `show manager fwupdate status` - Shows most recent firmware update status
- `show manager fwupdate list` - Lists available Rack Manager firmware packages for recovery

### Show Commands - Configuration & Monitoring
- `show manager pubsub config` - Displays PubSub settings (Brokers, Topic, SSL)
- `show manager userconfigs [-k key] [-g grepstr]` - Displays user configuration parameter settings
- `show manager serialstats -i <interval>` - Runs serial terminal statistics
- `show manager serialcheck -l <loop>` - Runs serial terminal health check
- `show manager healthmonitor log` - Displays logs collected by RM health monitoring
- `show manager iptables profiles` - Displays list of configurable profiles
- `show manager iptables rules [-v {4,6}] [-a] [profile]` - Displays iptables rules
- `show manager rsyslog` - Displays current external server for rsyslog streaming
- `show manager loglevel` - Shows loglevel of ocsevent.log

### Set Commands - LED & Log
- `set manager led on` - Turns manager LED ON
- `set manager led off` - Turns manager LED OFF
- `set manager log export` - Exports system and Rack Manager logs [Future]
- `set manager log clear` - Clears all log entries
- `set manager fru -b <board> -f <filename> -s <size>` - Updates manager FRU information
- `set manager gca refresh` - Refreshes GCA cache
- `set manager power faults` - Clears manager power faults

### Set Commands - Power Management
- `set manager powermeter alert -e <policy> -d <dcthrottle> -p <powerlimit>` - Sets rack power alert policy
- `set manager powermeter limit -p <powerlimit>` - Sets rack power limit
- `set manager powermeter multipolicy -i <requestor-id> -a <rack-alert> -t <dc-throttle> -l <rack-limit> -p <blade-limit> -e <alert-action> -f <throttle-duration> -d <remove-delay> [-r remediation]` - Sets multi-policy power configuration
- `set manager powermeter max` - Clears rack max power
- `set manager powermeter faults` - Clears rack power faults
- `set manager powermeter calibration -f <filename>` - Sets calibration values [Not Supported]

### Set Commands - Network Services
- `set manager tftp start` - Starts TFTP server [Not Supported]
- `set manager tftp stop` - Stops TFTP server [Not Supported]
- `set manager tftp get -s <server> -f <filename>` - Gets file from TFTP server
- `set manager tftp put -s <server> -l <localfile> -f <remotefile> -t <type>` - Puts file to TFTP server
- `set manager tftp delete -f <filename>` - Deletes file from TFTP
- `set manager sftp get -s <server> -f <filename> -u <username>` - Gets file from SFTP server
- `set manager sftp put -s <server> -f <filename> -t <type> -u <username>` - Puts file to SFTP server
- `set manager nfs start` - Starts NFS server
- `set manager nfs stop` - Stops NFS server
- `set manager nfs enable` - Enables NFS server
- `set manager nfs disable` - Disables NFS server

### Set Commands - NTP & Time
- `set manager ntp start` - Starts NTP service
- `set manager ntp stop` - Stops NTP service
- `set manager ntp restart` - Restarts NTP service
- `set manager ntp enable` - Enables NTP service
- `set manager ntp disable` - Disables NTP service
- `set manager ntp server -s <server-ip>` - Sets NTP time server
- `set manager time -m <month> -d <day> -y <year> -H <hour> -M <minute> -S <second>` - Sets manager system time
- `set manager hostname -n <hostname>` - Sets manager hostname

### Set Commands - Throttle
- `set manager throttle local {bypass|enable} -e {0|1}` - Sets local throttle [Not Supported]
- `set manager throttle count clear` - Clears throttle count and reset time
- `set manager throttle row {bypass|enable} -e {0|1}` - Sets row throttle [Not Supported]
- `set manager throttle force enable {on|off}` - Enables/disables throttle signal

### Set Commands - System & Configuration
- `set manager recovery on [-i port-id]` - Enables recovery [Not Supported]
- `set manager recovery off [-i port-id]` - Disables recovery [Not Supported]
- `set manager session kill -s <session-id>` - Kills active SSH session
- `set manager menu on` - Enables recovery menu
- `set manager menu off` - Disables recovery menu
- `set manager fwupdate -f <filename>` - Updates manager firmware
- `set manager defaults` - Resets manager to defaults
- `set manager pubsub -l <brokers> -t <topic> -s <ssl>` - Adds/updates PubSub configs
- `set manager userconfigs -k <keyname> -v <value>` - Sets userconfig key to value
- `set manager powercycle` - AC power cycles the RSCM
- `set manager loglevel -l {0|1|2|3}` - Changes loglevel of ocsevent.log
- `set manager rsyslog -s <server>` - Sets external server for rsyslog streaming

### Set Commands - Firewall
- `set manager iptables add <profile> -s <source> [-v {4|6}]` - Adds iptables rule
- `set manager iptables bulkadd -s <filepath>` - Bulk adds iptables rules
- `set manager iptables delete <profile> -s <source> [-v {4|6}]` - Deletes iptables rule
- `set manager iptables enable <profile>` - Enables iptables profile
- `set manager iptables disable <profile>` - Disables iptables profile
- `set manager iptables restore` - Restores iptables to default

---

## 3. SYSTEM/SERVER COMMANDS

### Show Commands - General
- `show system info -i <server-id>` - Shows system information (serial number, version)
- `show system health -i <server-id> [-p]` - Gets health information including PCIe
- `show system fru -i <server-id> [-f fru-id]` - Gets FRU information
- `show system state -i <server-id>` - Gets ON/OFF state and datasave status
- `show system presence -i <server-id>` - Shows system physical presence
- `show system default power -i <server-id>` - Gets default power state (ON/OFF)
- `show system type -i <server-id>` - Shows system type
- `show system led -i <server-id>` - Shows system LED state

### Show Commands - Power
- `show system power limit -i <server-id>` - Shows power limit for server
- `show system power reading -i <server-id>` - Gets power reading for server
- `show system power alert -i <server-id>` - Gets power alert policy
- `show system power throttle -i <server-id>` - Gets throttling statistics

### Show Commands - FPGA
- `show system fpga health -i <server-id>` - Gets system FPGA health
- `show system fpga temp -i <server-id>` - Gets system FPGA temperature in Celsius
- `show system fpga i2cversion -i <server-id>` - Gets system FPGA I2C version
- `show system fpga assetinfo -i <server-id>` - Gets system FPGA asset information

### Show Commands - Boot & BIOS
- `show system boot -i <server-id> [-b {0|1}]` - Gets pending boot order
- `show system log read -i <server-id>` - Reads server event log
- `show system bios config -i <server-id>` - Gets server BIOS configuration
- `show system bios code -i <server-id>` - Gets post code for server
- `show system bios update -i <server-id>` - Shows BIOS firmware update status
- `show system bmc update -i <server-id> [-c region]` - Shows BMC firmware update status
- `show system cpld update -i <server-id> [-s index]` - Shows CPLD firmware update status
- `show system cpld2 update -i <server-id> [-s index]` - Shows CPLD2 firmware update status
- `show system scmcpld update -i <server-id> [-t {0|1|2}] [-s index]` - Shows SCM CPLD firmware update status
- `show system globalcpld update -i <server-id>` - Shows Global CPLD firmware update status
- `show system pcieswitch update -i <server-id>` - Shows PCIe switch firmware update status

### Show Commands - Storage & Devices
- `show system tpm presence -i <server-id>` - Checks if TPM physical presence is set
- `show system nvme -i <server-id>` - Shows NVMe status
- `show system datasafe policy -i <server-id>` - Shows datasafe (NVDIMM, PCIe) policy settings
- `show system datasafe trigger -i <server-id>` - Shows datasafe trigger status
- `show system file list -i <server-id> [-d directory]` - Lists files available for transfer

### Show Commands - Cerberus
- `show system cerberus version -i <server-id> [-t {0|1}] [-b {0|1}] [-c index]` - Reads platform/SoC Cerberus version
- `show system cerberus pfm version -i <server-id> [-b {0|1}] [-p {0|1}] [-r {0|1}] [-c index]` - Reads PFM version
- `show system cerberus pfm id -i <server-id> [-b {0|1}] [-p {0|1}] [-r {0|1}] [-c index]` - Reads PFM ID
- `show system cerberus log {debug|tcg} -i <server-id> [-b {0|1}] [-c index]` - Reads Cerberus debug/TCG log
- `show system cerberus fpga version -i <server-id> -b {1} -t {1}` - Lists Cyclone-V FPGA version
- `show system user list -i <server-id>` - Lists all users in server BMC

### Show Commands - GPU/MCU (C44AD only)
- `show system gpu update -i <server-id> -s <index>` - Shows GPU firmware update status [C44AD only]
- `show system mcu update -i <server-id> -s <index>` - Shows MCU firmware update status [C44AD only]

### Set Commands - Power Control
- `set system on -i <server-id> [-b {0|1}]` - Soft powers server ON
- `set system off -i <server-id> [-b {0|1}]` - Soft powers server OFF
- `set system reset -i <server-id> [-b {0|1}]` - Power cycles or soft resets server
- `set system led on -i <server-id>` - Turns server UID LED ON
- `set system led off -i <server-id>` - Turns server UID LED OFF
- `set system default power on -i <server-id>` - Sets default power state to ON
- `set system default power off -i <server-id>` - Sets default power state to OFF
- `set system vreset -i <server-id>` - Virtual resets BMC (Gen 11+)

### Set Commands - Power Management
- `set system power alert -i <server-id> -p <powerlimit> -e <alert-action> -f <throttle-duration> -d <remove-delay> [-r remediation]` - Sets power alert policy
- `set system power limit value -i <server-id> -l <power-limit>` - Sets power limit
- `set system power limit on -i <server-id>` - Activates power limit and enables throttling
- `set system power limit off -i <server-id>` - Deactivates power limit and disables throttling

### Set Commands - Boot Configuration
- `set system boot -i <server-id> -t <boot-type> [-b {0|1}] [-m boot-mode] [-p persistent]` - Sets boot device type

### Set Commands - BIOS & Firmware
- `set system log clear -i <server-id>` - Clears server logs
- `set system bios config -i <server-id> -j <major> -n <minor>` - Sets BIOS configuration
- `set system bios update -i <server-id> -f <file> [-c {1|2}] [-a]` - Updates server BIOS firmware
- `set system bmc update -i <server-id> -f <file> [-c region] [-a]` - Updates server BMC firmware
- `set system cpld update -i <server-id> -f <file> [-s index] [-a]` - Updates server CPLD firmware
- `set system cpld2 update -i <server-id> -f <file> [-s index] [-a]` - Updates server CPLD2 firmware
- `set system scmcpld update -i <server-id> -f <file> [-a] [-t {0|1|2}] [-s index]` - Updates SCM CPLD firmware
- `set system globalcpld update -i <server-id> -f <file> [-a]` - Updates Global CPLD firmware
- `set system pcieswitch update -i <server-id> -f <file>` - Updates PCIe switch firmware
- `set system gpu update -i <server-id> -f <file> -s <index> [-a]` - Updates GPU firmware [C44AD only]
- `set system mcu update -i <server-id> -f <file> -s <index> [-a]` - Updates MCU firmware [C44AD only]

### Set Commands - Storage & Files
- `set system tpm presence -i <server-id> -p <presence>` - Sets TPM physical presence
- `set system remotedrive mount -i <server-id> -n <image-name> [-b {0|1}] [-m {1|2}]` - Mounts ISO image as boot drive
- `set system remotedrive unmount -i <server-id> [-b {0|1}] [-m {1|2}]` - Unmounts ISO image
- `set system file delete -i <server-id> -f <filename> [-d directory]` - Deletes file from server
- `set system file get -i <server-id> -f <filename> [-d directory]` - Gets file from server to RM
- `set system file put -i <server-id> -f <filename> [-d directory]` - Puts file to server from RM

### Set Commands - Cerberus
- `set system cerberus update -i <server-id> -b <device-id> -f <file> [-c index] [-m impactful] [-t tokenfile]` - Updates Cerberus firmware
- `set system cerberus pfm update -i <server-id> -b <device-id> -p <port-id> -f <file> [-a {0|1}] [-c index]` - Updates Cerberus PFM
- `set system soc update {fip|nitro} -i <server-id> -p <port-id> -f <file>` - Updates SoC FIP/Nitro firmware
- `set system cerberus clear debug -i <server-id> -b <device-id> [-c index]` - Clears Cerberus debug/TCG log
- `set system user password -i <server-id> -u <username> -p <password>` - Sets BMC user password

### Serial Commands
- `start serial session -i <server-id> [-b {0|1}] [-f] [-p portid]` - Starts serial session to server
- `stop serial session -i <server-id> [-b {0|1}] [-p portid]` - Stops serial session to server

### JTAG Commands
- `set system jtag start -i <server-id>` - Starts JTAG/ITP server on BMC
- `set system jtag stop -i <server-id>` - Stops JTAG/ITP server on BMC

---

## 4. USER COMMANDS

### Show Commands
- `show user info [-t {users|roles}] [-u username]` - Shows user information and roles

### Set Commands
- `set user add -u <username> -p <password> -r {admin|operator|user}` - Adds new user
- `set user update -t {password|role} -u <username> [-p password] [-r role]` - Updates user password or role
- `set user delete -u <username>` - Removes existing user

---

## 5. POWERSHELF COMMANDS

### PSU Commands - Show
- `show powershelf psu info [-s psu-id] [-f forceread] [-p {0|1|2}]` - Shows PSU info (manufacturer, model, version, readings)
- `show powershelf psu battery -i <psu-id>` - Shows PSU battery presence [RESERVED]
- `show powershelf psu update [-s psu-id] [-f forceread]` - Shows PSU firmware update status
- `show powershelf psu version [-s psu-id] [-f forceread]` - Shows PSU firmware version
- `show powershelf psu limits [-s psu-id] [-f forceread]` - Shows PSU alert limits
- `show powershelf psu reading [-s psu-id] [-f forceread]` - Shows PSU parameters (voltage, current, temp, fan, power)
- `show powershelf psu faulthistory [-s psu-id] [-f forceread]` - Shows recent failure history log
- `show powershelf psu eventlog [-s psu-id] [-f forceread]` - Shows recent 5 event logs
- `show powershelf psu state [-s psu-id] [-f forceread]` - Shows PSU state (presence, AC status, alert)
- `show powershelf psu report [-s psu-id]` - Shows PSU table with all PSU information
- `show powershelf psu slot config` - Shows Powershelf PSU slot configuration
- `show powershelf fru` - Gets FRU information of powershelf

### PSU Commands - Set
- `set powershelf psu alertmask {enable|disable} [-s psu-id] -d <direction> -t <parameter>` - Sets PSU alert masks [Not Used]
- `set powershelf psu limit` - Sets PSU alert limits
- `set powershelf psu clear [-s psu-id] [-p {0|1|2}]` - Clears PSU faults
- `set powershelf psu battery -i <psu-id>` - Runs battery health test [Not Used]
- `set powershelf psu update -s <psu-id> [-f file] [-r force]` - Updates PSU firmware
- `set powershelf psu raw -s <psu-id> -c <raw-command> [-r rx-length] [-p pec-enable]` - Sends raw PMBUS commands
- `set powershelf psu recovery -s <psu-id> [-f file]` - Recovers PSU firmware
- `set powershelf psu slot config` - Sets Powershelf PSU slot configuration

### C13 Commands
- `show powershelf c13 reading [-c c13-id]` - Shows C13 power reading
- `show powershelf c13 status [-c c13-id]` - Shows C13 status (on/off)
- `show powershelf c13 muxaddr [-c c13-id]` - Shows I2C address of C13 MUX
- `show powershelf c13 fru [-i c13-id]` - Gets FRU information of C13 modules
- `set powershelf c13 on -c <c13-id>` - Switches on C13
- `set powershelf c13 off -c <c13-id>` - Switches off C13
- `set powershelf c13 muxaddr -a <mux-addr>` - Sets I2C address of C13 MUX

---

## 6. CDU (COOLING DISTRIBUTION UNIT) COMMANDS

### Fan Commands
- `show cdu fan alarm [-f fan-id]` - Shows fan controller alarm status
- `show cdu fan info [-f fan-id]` - Shows fan controller device information
- `show cdu fan fru [-f fan-id]` - Shows fan controller FRU information
- `show cdu fan health` - Shows fan controller health status

### Pump Commands
- `show cdu pump alarm [-p pump-id]` - Shows pump controller alarm status
- `show cdu pump info [-p pump-id]` - Shows pump controller device information
- `show cdu pump fru [-p pump-id]` - Shows pump controller FRU information
- `show cdu pump health` - Shows pump controller health status

### Leak Detection Commands
- `show cdu leak alarm` - Shows leak detection alarm status
- `show cdu leak info` - Shows leak detection device information
- `show cdu leak fru` - Shows leak detection FRU information
- `show cdu leak health` - Shows leak detection health status

### Sensor Commands
- `show cdu sensor health` - Shows CDU sensor health status
- `show cdu sensor info` - Shows CDU sensor information

### Control Commands
- `show cdu control sensor` - Shows CDU control sensor information
- `set cdu control sensor` - Sets CDU control sensor configuration
- `show cdu control param` - Shows CDU control parameters
- `set cdu control param` - Sets CDU control parameters
- `show cdu control limits` - Shows CDU control limits
- `set cdu control limits` - Sets CDU control limits
- `show cdu control metrics` - Shows CDU control metrics
- `set cdu control metrics` - Sets CDU control metrics
- `show cdu control setpoints` - Gets CDU control setpoints
- `set cdu control setpoints` - Sets CDU control setpoints

### CDU Controller Commands
- `show cdu status` - Shows CDU status
- `show cdu info` - Shows CDU information
- `show cdu health` - Shows CDU health
- `show cdu fru` - Shows CDU FRU information
- `show cdu erroralert` - Shows CDU error alerts
- `set cdu fwupdate` - Updates CDU firmware
- `set cdu fwrecover` - Recovers CDU firmware
- `set cdu sftp` - Configures CDU SFTP
- `set cdu ntp` - Configures CDU NTP
- `set cdu modbus` - Configures CDU Modbus

### RPU Info Commands
- `show cdu rackinfo` - Shows CDU rack information
- `show cdu rpuinfo` - Shows CDU RPU information
- `show cdu sensorgatewayinfo` - Shows CDU sensor gateway information
- `show cdu valvegatewayinfo` - Shows CDU valve gateway information

### Bootloader Commands
- `set cdu recovery` - Sets CDU recovery mode
- `set cdu revokekey` - Revokes CDU key
- `set cdu boot` - Sets CDU boot configuration
- `set cdu verify` - Verifies CDU firmware
- `show cdu log` - Shows CDU log
- `show cdu keys` - Shows CDU keys
- `show cdu blstatus` - Shows CDU bootloader status
- `show cdu attest` - Shows CDU attestation
- `set sblcmd enter` - Enters secure bootloader command mode
- `set sblcmd exit` - Exits secure bootloader command mode
- `set sblcmd send` - Sends secure bootloader command

### Serial Commands
- `start cdu serial session` - Starts CDU serial session

---

## 7. CERBERUS COMMANDS (Manager)

### Show Commands
- `show manager cerberus` - Shows manager Cerberus information
- `show manager cerberus version` - Shows manager Cerberus version
- `show manager cerberus log` - Shows manager Cerberus log
- `show manager cerberus pfm id` - Shows manager Cerberus PFM ID
- `show manager cerberus pfm version` - Shows manager Cerberus PFM version
- `show manager cerberus deviceinfo` - Shows manager Cerberus device information
- `show manager cerberus certstate` - Shows manager Cerberus certificate state
- `show manager cerberus pcd` - Shows manager Cerberus PCD
- `show manager cerberus pcd platformid` - Shows manager Cerberus PCD platform ID
- `show manager cerberus pcd versionid` - Shows manager Cerberus PCD version ID
- `show manager cerberus utility` - Shows manager Cerberus utility

### Set Commands
- `set manager cerberus` - Sets manager Cerberus configuration
- `set manager cerberus clear` - Clears manager Cerberus data
- `set manager cerberus update` - Updates manager Cerberus firmware
- `set manager cerberus pfm update` - Updates manager Cerberus PFM
- `set manager cerberus cmd` - Sends manager Cerberus command
- `set manager cerberus pcd update` - Updates manager Cerberus PCD

---

## 8. CPLD COMMANDS (Manager)

### Show Commands
- `show manager cpld` - Shows manager CPLD information
- `show manager cpld version` - Shows manager CPLD version
- `show manager cpld usercode` - Shows manager CPLD user code
- `show manager cpld readauth` - Shows manager CPLD read authentication

### Set Commands
- `set manager cpld` - Sets manager CPLD configuration
- `set manager cpld update` - Updates manager CPLD firmware

---

## 9. INTER-RACK COMMANDS

### Show Commands
- `show interrack wirecheck` - Shows inter-rack wire check status
- `show interrack zoneshutdown` - Shows inter-rack zone shutdown status
- `show interrack zoneready` - Shows inter-rack zone ready status

### Set Commands
- `set interrack wirecheck` - Sets inter-rack wire check
- `set interrack zoneshutdown` - Sets inter-rack zone shutdown
- `set interrack zoneready` - Sets inter-rack zone ready
- `set interrack zoneloopreset` - Resets inter-rack zone loop

---

## 10. SMART IT RACK COMMANDS

### Show Commands
- `show smrack health` - Shows Smart IT Rack health
- `show smrack status` - Shows Smart IT Rack status
- `show smrack config flowrate` - Shows Smart IT Rack flow rate configuration
- `show smrack config pressure` - Shows Smart IT Rack pressure configuration
- `show valve fwversion` - Shows valve firmware version
- `show valve info` - Shows valve information

### Set Commands
- `set smrack open` - Opens Smart IT Rack valve
- `set smrack close` - Closes Smart IT Rack valve
- `set smrack config flowrate` - Sets Smart IT Rack flow rate configuration
- `set smrack config pressure` - Sets Smart IT Rack pressure configuration
- `set smrack config reset` - Resets Smart IT Rack configuration
- `set smrack config custom` - Sets Smart IT Rack custom configuration
- `set smrack config addrange` - Adds range to Smart IT Rack configuration
- `set smrack config removerange` - Removes range from Smart IT Rack configuration
- `set smrack fwupdate` - Updates Smart IT Rack firmware
- `set valve modbus` - Configures valve Modbus

---

## 11. PCU COMMANDS

### Show Commands
- `show pcu info` - Shows PCU information
- `show pcu reading` - Shows PCU reading
- `show pcu status` - Shows PCU status
- `show pcu limits` - Shows PCU limits
- `show pcu eventlog` - Shows PCU event log
- `show pcu update` - Shows PCU update status
- `show pcu state` - Shows PCU state
- `show pcu chargelog` - Shows PCU charge log

### Set Commands
- `set pcu raw read` - Reads raw PCU data
- `set pcu raw write` - Writes raw PCU data
- `set pcu limits` - Sets PCU limits
- `set pcu update` - Updates PCU firmware
- `set pcu fanspeed` - Sets PCU fan speed
- `set pcu clear` - Clears PCU faults

---

## 12. NVSWITCH COMMANDS

### Show Commands
- `show nvswitch status` - Shows NVSwitch status

### Set Commands
- `set nvswitch on` - Turns NVSwitch on
- `set nvswitch off` - Turns NVSwitch off

---

## 13. HELP COMMANDS

### General Help
- `help` - Shows list of command categories
- `help show` - Shows help for show commands
- `help set` - Shows help for set commands
- `help start` - Shows help for start commands
- `help stop` - Shows help for stop commands
- `help user` - Shows help for user commands

---

## 14. MTE (MANUFACTURING TEST ENVIRONMENT) COMMANDS

### MTE Utilities
- `start mte -u <utility> [-p params] [-t times] [-d duration]` - Executes MTE utility
- `show mte` - Shows all executing MTE utilities
- `stop mte` - Stops all executing MTE utilities

### Available MTE Utilities:
- `ocs-gpio` - GPIO operations (setup, read, write, cleanup)
- `ocs-fru` - FRU read/write operations
- `ocs-mac` - MAC address read/write operations
- `ocs-hsc` - HSC (Hot Swap Controller) operations
- `ocs-pmic` - PMIC operations
- `stream` - Memory streaming test
- `sysbench` - System benchmark
- `memtester` - Memory tester
- `ttyS1` - Serial port 1 test
- `ttyS2` - Serial port 2 test
- `iperf` - Network performance test
- `minicom` - Serial communication
- `reboot` - System reboot
- `date` - Date/time operations
- `i2cdetect` - I2C bus detection
- `i2cdump` - I2C device dump
- `i2cset` - I2C write operation
- `i2cget` - I2C read operation
- `cpuinfo` - CPU information
- `meminfo` - Memory information
- `qspiinfo` - QSPI information
- `mmcinfo` - MMC information
- `ping` - Network ping test
- `firewall` - Firewall control (on/off)
- `lock` - Lock read/write operations
- `cpld-key-update` - CPLD key update
- `cpld-lock-public-key` - CPLD lock public key
- `cpld-program-cfg1` - CPLD program configuration 1
- `cpld-feature-row-program` - CPLD feature row program
- `cpld-program-authdone` - CPLD program auth done
- `turn-on-isolation-valve` - Turn on isolation valve
- `turn-off-isolation-valve` - Turn off isolation valve
- `read-isolation-valve-status` - Read isolation valve status

---

## NOTES

1. Commands marked with **[Not Supported]** are documented but not currently available in the CLI
2. Commands marked with **[Not Used]** or **[RESERVED]** are placeholders for future functionality
3. Commands marked with **[Future]** are planned for future releases
4. Optional parameters are shown in square brackets: `[-option]`
5. Required parameters are shown in angle brackets: `<parameter>`
6. Multiple choice options are shown in curly braces: `{option1|option2}`
7. Server IDs typically range from 1-48
8. PSU IDs typically range from 1-18 (platform dependent)
9. Fan/Pump IDs vary by CDU platform (14 fans/2 pumps for H7010, 32-34 fans/5 pumps for H7021/H7022)

---

Document Version: Based on RSCM CLI Specification V.0.1.28 (October 29, 2025)
