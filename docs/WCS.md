# WCS CLI Command Reference

Windows Chassis Manager Service (WCS) CLI for managing chassis, blades, and power infrastructure.

**Launch CLI**: `wcscli.exe -u <username> -x <password> [-h <host>] [-p <port>] [-s <SSL>] [-b <batchfile>]`

**Version**: `wcscli -v`

---

## Table of Contents
1. [Chassis Manager Service](#1-chassis-manager-service)
2. [State and Information](#2-state-and-information)
3. [Blade Management](#3-blade-management)
4. [Chassis Manager Management](#4-chassis-manager-management)
5. [Serial Console Sessions](#5-serial-console-sessions)
6. [CLI Over Serial (WCSCLI+)](#6-cli-over-serial-wcscli)
7. [Auxiliary Devices](#7-auxiliary-devices)
8. [Power Alert & Capping](#8-power-alert--capping)

---

## 1. Chassis Manager Service

### wcscli.exe
Launch the WCS CLI interface.

| Flag | Description |
|------|-------------|
| `-u <username>` | Username (use domain\username for non-local) - REQUIRED |
| `-x <password>` | Password - REQUIRED |
| `-h <host>` | Host name (default: localhost) |
| `-p <port>` | Port (default: 8000) |
| `-s <0\|1>` | SSL mode (0=disabled, 1=enabled (default)) |
| `-b <file>` | Batch file (not supported in serial mode) |
| `-v` | Get CLI version |

---

## 2. State and Information

### -getchassisinfo
Get chassis component status (blades, PSUs, batteries, CM).

| Flag | Description |
|------|-------------|
| `-s` | Show blade information |
| `-p` | Show PSU information |
| `-c` | Show chassis manager information |
| `-t` | Show battery information |
| `-h` | Help |

### -getbladeinfo
Get blade information (serial, version).

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

### -getchassishealth
Get health status for chassis components.

| Flag | Description |
|------|-------------|
| `-b` | Show blade health |
| `-p` | Show PSU health |
| `-f` | Show fan health |
| `-t` | Show battery health |
| `-h` | Help |

### -getbladehealth
Get detailed blade health (CPU, memory, disk, PCIe, sensors, FRU).

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-q` | Show CPU information |
| `-m` | Show memory information |
| `-d` | Show JBOD disk information |
| `-p` | Show PCIe information |
| `-s` | Show sensor information |
| `-t` | Show temperature sensors |
| `-f` | Show FRU information |
| `-h` | Help |

### -getserviceversion
Get chassis manager service assembly version.

### -updatepsufw
Update PSU firmware (primary or secondary controller).

| Flag | Description |
|------|-------------|
| `-i <psuId>` | Target PSU number (typically 1-6) - REQUIRED |
| `-f <path>` | Firmware image file path - REQUIRED |
| `-p <0\|1>` | Controller (1=primary, 0=secondary) - REQUIRED |
| `-t` | Ignore PSU status faults |
| `-h` | Help |

### -getpsufwstatus
Get PSU firmware revision and update status.

| Flag | Description |
|------|-------------|
| `-i <psuId>` | Target PSU number |
| `-h` | Help |

### -runbatteryhealthtest
Run battery health test (~2 seconds).

| Flag | Description |
|------|-------------|
| `-i <psuId>` | Target PSU - REQUIRED |
| `-h` | Help |

### -setfirmwareupdate
Update chassis manager firmware (CM service, WCSCLI, BIOS) or execute custom script.

| Flag | Description |
|------|-------------|
| `-f <path>` | Firmware image file path (TFTP package) - REQUIRED |
| `-h` | Help |

### -getfirmwareupdatestatus
Get chassis manager firmware update status.

### -fandiagnostics
Run fan diagnostic to check for degradation.

### -fancontrollerdiagnostic
Run fan controller diagnostic.

### -getchassisconfig
Get chassis configuration.

| Flag | Description |
|------|-------------|
| `-n <name>` | Configuration name - REQUIRED |
| `-h` | Help |

### -updatechassisconfig
Update chassis configuration.

| Flag | Description |
|------|-------------|
| `-n <name>` | Configuration name - REQUIRED |
| `-v <value>` | Configuration value - REQUIRED |
| `-h` | Help |

### -getchassisuserconfig
Get chassis user configuration.

| Flag | Description |
|------|-------------|
| `-n <name>` | Configuration name - REQUIRED |
| `-h` | Help |

### -updatechassisuserconfig
Update chassis user configuration.

| Flag | Description |
|------|-------------|
| `-n <name>` | Configuration name - REQUIRED |
| `-v <value>` | Configuration value - REQUIRED |
| `-h` | Help |

### -getallpsusfirmwarestatus
Get firmware status for all PSUs.

### -resetpsu
Reset PSU.

| Flag | Description |
|------|-------------|
| `-i <psuid>` | PSU ID - REQUIRED |
| `-h` | Help |

### -resetfancontroller
Reset fan controller.

| Flag | Description |
|------|-------------|
| `-c <controller>` | Controller - REQUIRED |
| `-s <shutdown>` | Shutdown - REQUIRED |
| `-h` | Help |

### -getpsufaultlogs
Get PSU fault logs.

### -clearpufaultlogs
Clear PSU fault logs.

### -getsystemeventlogs
Get system event logs.

| Flag | Description |
|------|-------------|
| `-b <bladeId>` | Blade ID |
| `-h` | Help |

### -getmaxpwmrequirement
Get maximum PWM requirement.

---

## 3. Blade Management

### Power Control

#### -setpoweron
Turn AC outlet power ON for blade.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

#### -setpoweroff
Turn AC outlet power OFF for blade.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

#### -getpowerstate
Get AC outlet power state.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

#### -setbladeon
Soft power ON blade (initialize boot process).

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All connected blades |
| `-h` | Help |

#### -setbladeoff
Soft power OFF blade (remove chipset power).

| Flag | Description |
|------|-------------|
| `-i <1-48>` | Blade index |
| `-a` | All connected blades |
| `-h` | Help |

#### -getbladestate
Get blade ON/OFF state (chipset power).

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All connected blades |
| `-h` | Help |

#### -setbladedefaultpowerstate
Set default power state.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All connected blades |
| `-s <0\|1>` | State (0=stay OFF, 1=power ON) - REQUIRED |
| `-h` | Help |

#### -getbladedefaultpowerstate
Get default power state.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

#### -setbladeactivepowercycle
Power cycle or soft reset blade.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-t <seconds>` | Power off time (default: 0) |
| `-h` | Help |

### LED Control

#### -setbladeattentionledon
Turn blade attention LED ON.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

#### -setbladeattentionledoff
Turn blade attention LED OFF.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

### Logs

#### -readbladelog
Read blade system event log.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-n <count>` | Most recent entries (default: up to 300) |
| `-h` | Help |

#### -clearbladelog
Clear blade log.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-h` | Help |

### Power Limiting

#### -setbladepowerlimit
Set power limit for blade.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-l <watts>` | Power limit in Watts - REQUIRED |
| `-h` | Help |

#### -setbladepowerlimiton
Activate power limit (enable throttling).

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

#### -setbladepowerlimitoff
Deactivate power limit (disable throttling).

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

#### -getbladepowerlimit
Get power limit.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

#### -getbladepowerreading
Get power reading.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All blades |
| `-h` | Help |

### Boot Configuration

#### -getnextboot
Get pending boot order for next boot.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-h` | Help |

#### -setnextboot
Set boot device for next reboot.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-t <type>` | Boot type (1=NoOverride, 2=ForcePxe, 3=ForceDefaultHdd, 4=ForceBiosSetup, 5=ForceFloppyOrRemovable) - REQUIRED |
| `-m <0\|1>` | Mode (0=legacy, 1=UEFI) - REQUIRED |
| `-p <0\|1>` | Persistent (0=one-time, 1=persistent) - REQUIRED |
| `-n <instance>` | Boot device instance (default: 0) |
| `-h` | Help |

### Asset Information (FRU)

#### -getbladeassetinfo
Get blade FRU information.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-h` | Help |

#### -setbladeassetinfo
Edit blade FRU Multi Record Area.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-p <payload>` | Data to write (max 2 fields, 56 bytes each) - REQUIRED |
| `-h` | Help |

#### -getpdbassetinfo
Get PDB FRU information.

#### -setpdbassetinfo
Edit PDB FRU Multi Record Area.

| Flag | Description |
|------|-------------|
| `-p <payload>` | Data to write (max 2 fields, 56 bytes each) - REQUIRED |
| `-h` | Help |

### BIOS & Diagnostics

#### -getbladebiospostcode
Get BIOS POST code.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-h` | Help |

#### -getbladebiosconfig
Get blade BIOS configuration.

| Flag | Description |
|------|-------------|
| `-i <bladeId>` | Blade ID - REQUIRED |
| `-h` | Help |

#### -setbladebiosconfig
Set BIOS configuration for next reboot.

| Flag | Description |
|------|-------------|
| `-i <bladeId>` | Blade ID - REQUIRED |
| `-j <major>` | Major configuration number - REQUIRED |
| `-n <minor>` | Minor configuration number - REQUIRED |
| `-h` | Help |

### DataSafe Commands

#### -setbladedatasafeon
Enable datasafe for blade.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All connected blades |
| `-h` | Help |

#### -setbladedatasafeoff
Disable datasafe for blade.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All connected blades |
| `-h` | Help |

#### -setdatasafepoweron
Set datasafe power ON.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All connected blades |
| `-h` | Help |

#### -setdatasafepoweroff
Set datasafe power OFF.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All connected blades |
| `-h` | Help |

#### -setbladedatasafeactivepowercycle
Datasafe power cycle.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All connected blades |
| `-h` | Help |

#### -getbladedatasafepowerstate
Get blade datasafe power state.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index |
| `-a` | All connected blades |
| `-h` | Help |

### Mezzanine (FPGA)

#### -getblademezzpassthroughmode
Get pass-through mode of Blade FPGA Mezzanine.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-h` | Help |

#### -setblademezzpassthroughmode
Set pass-through mode of Blade FPGA Mezzanine.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-m <true\|false>` | Pass-through mode enabled - REQUIRED |
| `-h` | Help |

#### -getblademezzstatus
Get status of Blade FPGA Mezzanine.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-h` | Help |

#### -getblademezzassetinfo
Get FRU information of Blade FPGA Mezzanine.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-h` | Help |

### TPM

#### -setbladetpmphysicalpresence
Set TPM physical presence.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-p <true\|false\|1\|0>` | Presence - REQUIRED |
| `-h` | Help |

#### -getbladetpmphysicalpresence
Get TPM physical presence.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-h` | Help |

---

## 4. Chassis Manager Management

### LED Control

#### -setchassisattentionledon
Turn chassis attention LED ON.

#### -setchassisattentionledoff
Turn chassis attention LED OFF.

#### -getchassisattentionledstatus
Get chassis attention LED status.

### Logs

#### -readchassislog
Read chassis log.

| Flag | Description |
|------|-------------|
| `-s <YYYY:MM:DD>` | Start date (optional) |
| `-e <YYYY:MM:DD>` | End date (optional) |
| `-h` | Help |

#### -clearchassislog
Clear chassis log.

### AC Socket Control (TOR Switches)

#### -getacsocketpowerstate
Get chassis AC socket status.

| Flag | Description |
|------|-------------|
| `-p <port>` | Port number - REQUIRED |
| `-h` | Help |

#### -setacsocketpowerstateon
Turn chassis AC socket ON.

| Flag | Description |
|------|-------------|
| `-p <port>` | Port number - REQUIRED |
| `-h` | Help |

#### -setacsocketpowerstateoff
Turn chassis AC socket OFF.

| Flag | Description |
|------|-------------|
| `-p <port>` | Port number - REQUIRED |
| `-h` | Help |

### User Management

#### -adduser
Add new chassis controller user.

| Flag | Description |
|------|-------------|
| `-u <username>` | Username - REQUIRED |
| `-p <password>` | Password - REQUIRED |
| `-a` | Admin privilege |
| `-o` | Operator privilege |
| `-r` | User privilege |
| `-h` | Help |

#### -changeuserpwd
Change user password.

| Flag | Description |
|------|-------------|
| `-u <username>` | Username - REQUIRED |
| `-p <password>` | New password - REQUIRED |
| `-h` | Help |

#### -changeuserrole
Change user security role.

| Flag | Description |
|------|-------------|
| `-u <username>` | Username - REQUIRED |
| `-a` | Admin privilege |
| `-o` | Operator privilege |
| `-r` | User privilege |
| `-h` | Help |

#### -removeuser
Remove user from chassis controller.

| Flag | Description |
|------|-------------|
| `-u <username>` | Username - REQUIRED |
| `-h` | Help |

### Asset Information

#### -getchassismanagerassetinfo
Get chassis manager FRU information.

#### -setchassismanagerassetinfo
Edit chassis manager FRU Multi Record Area.

| Flag | Description |
|------|-------------|
| `-p <payload>` | Data to write (max 2 fields, 56 bytes each) - REQUIRED |
| `-h` | Help |

### System Control

#### -scandevice
Scan chassis manager device and display settings.

#### -chassismanagerrestart
Restart chassis manager.

#### -chassismanagersoftrestart
Soft restart chassis manager.

---

## 5. Serial Console Sessions

### -startbladeserialsession
Start serial session to blade (opens Serial-Client-terminal).

**Exit**: Press `Ctrl-X` to exit session

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-s <seconds>` | Session timeout (max: 3600) - REQUIRED |
| `-h` | Help |

### -stopbladeserialsession
Force terminate active blade serial session.

| Flag | Description |
|------|-------------|
| `-i <1-24>` | Blade index - REQUIRED |
| `-h` | Help |

### -startportserialsession
Open serial port console to serial devices.

**Exit**: Press `Ctrl-X` to exit session

| Flag | Description |
|------|-------------|
| `-i <port>` | Port number (1=COM1, 2=COM2, 5/6 if WCSCLI stopped on those) - REQUIRED |
| `-d <ms>` | Device timeout in milliseconds (default: 0) |
| `-r <baud>` | Baud rate (75,110,300,1200,2400,4800,9600,19200,38400,57600,115200) (default: 9600) |
| `-h` | Help |

### -stopportserialsession
Stop all sessions on given port.

| Flag | Description |
|------|-------------|
| `-i <port>` | Port number - REQUIRED |
| `-h` | Help |

### -establishcmconnection
Create connection to chassis manager service and login.

| Flag | Description |
|------|-------------|
| `-u <username>` | Username (use domain\username if not local) - REQUIRED |
| `-x <password>` | Password - REQUIRED |
| `-m <host>` | Host name (default: localhost) |
| `-p <port>` | Port (default: 8000) |
| `-s <0\|1>` | SSL mode (0=disabled, 1=enabled (default)) |
| `-b <file>` | Batch file (not supported in serial mode) |
| `-v` | Get CLI version |
| `-h` | Help |

### -terminatecmconnection
Terminate connection to chassis manager service.

---

## 6. CLI Over Serial (WCSCLI+)

### -startchassismanager
Start Windows chassis manager service.

### -stopchassismanager
Stop Windows chassis manager service.

### -getchassismanagerstatus
Get status of Windows chassis manager service.

### -enablechassismanagerssl
Enable SSL for chassis manager service.

### -disablechassismanagerssl
Disable SSL for chassis manager service.

### -getnic
Get chassis controller network properties.

### -setnic
Set chassis controller network properties.

| Flag | Description |
|------|-------------|
| `-a <DHCP\|STATIC>` | IP address source - REQUIRED |
| `-i <IP>` | IP address (required for Static) |
| `-m <mask>` | Subnet mask (required for Static) |
| `-g <gateway>` | Gateway (optional for Static) |
| `-p <DNS>` | Primary DNS server |
| `-d <DNS>` | Secondary DNS server (requires primary) |
| `-t <index>` | Network interface number (0-indexed, default: 0) |
| `-h` | Help |

### -clear
Clear command history and PuTTY client screen.

### -setlocalupdate
Update chassis manager firmware locally.

| Flag | Description |
|------|-------------|
| `-f <path>` | Firmware image file path (TFTP package) - REQUIRED |
| `-h` | Help |

### -getlocalupdatestatus
Get local chassis manager firmware update status.

---

## 7. Auxiliary Devices

### -getauxdevicetype
Get auxiliary device type information.

| Flag | Description |
|------|-------------|
| `-i <deviceId>` | Device ID - REQUIRED |
| `-h` | Help |

### -getauxdevicestatus
Get auxiliary device status.

| Flag | Description |
|------|-------------|
| `-i <deviceId>` | Device ID - REQUIRED |
| `-h` | Help |

### -setauxdeviceinfo
Set auxiliary device information.

| Flag | Description |
|------|-------------|
| `-i <deviceId>` | Device ID - REQUIRED |
| `-d <address>` | Address - REQUIRED |
| `-p <payload>` | Payload - REQUIRED |
| `-h` | Help |

---

## 8. Power Alert & Capping

### -setbladepoweralertpolicy
Configure blade behavior upon power alert signal.

| Flag | Description |
|------|-------------|
| `-i <bladeId>` | Blade ID - REQUIRED |
| `-e <action>` | Alert action (0=do nothing, 1=throttle, 2=fast throttle) - REQUIRED |
| `-p <watts>` | Power limit in watts - REQUIRED |
| `-r <action>` | Remediation action (0=do nothing, 1=remove limit & rearm, 2=rearm) |
| `-f <ms>` | Fast throttle duration in ms (default: 20ms) |
| `-d <seconds>` | Auto remove delay (1-250 seconds) |
| `-h` | Help |

### -getbladepoweralertpolicy
Display blade power alert driven capping parameters.

| Flag | Description |
|------|-------------|
| `-i <bladeId>` | Blade ID - REQUIRED |
| `-h` | Help |

### -setchassispoweralertpolicy
Set chassis power alert trigger policy.

| Flag | Description |
|------|-------------|
| `-e <policy>` | Alert policy (0=disable, 1=enable) - REQUIRED |
| `-p <watts>` | Power limit in watts - REQUIRED |
| `-h` | Help |

### -getchassispoweralertpolicy
Get chassis-level power alert settings (PSU power, alert events).

### -getbladethrottlingstatistics
Get percentage time spent in throttling and power capping entities.

| Flag | Description |
|------|-------------|
| `-i <bladeId>` | Blade ID - REQUIRED |
| `-h` | Help |

---

## Summary

- **Total Commands**: 103
- **Blade Commands**: 52 (24 support `-a` for all blades)
- **Command Categories**: 8
- **Serial-Only Commands**: 10

**Common Patterns**:
- `-i <1-24>`: Blade index for single blade operations
- `-a`: Apply to all blades
- `-h`: Display help for any command
