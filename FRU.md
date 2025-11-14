# FRU (Field Replaceable Unit) Reference

## Overview
FRU data contains hardware identification and asset information for servers and components in the WCS system.

## FRU IDs

- **FRU ID 0**: Product FRU (default)
  - Contains critical server identification fields
  - Includes Asset Tag, Serial Number, Model, Node MSF, etc.

- **FRU ID 1+**: Other FRUs
  - Additional hardware components
  - Specific mappings vary by system

## FRU Field Structure (Product FRU - ID 0)

### Field Mappings
| Field | Description | Example Value |
|-------|-------------|---------------|
| p 1   | Model (ProductName) | S213E |
| p 2   | Part number | M1184719-001 |
| p 3   | Product Version | 5.0 |
| p 4   | Serial Number | P47192354029500E |
| p 5   | Asset Tag | 14987424 |
| p 6   | Product Extra | E |
| p 8   | Node MSF | MSF-059051 |

**IMPORTANT**:
- Use lowercase 'p' when referencing fields (e.g., `p 8`, not `P 8`)
- Field `p 8` (Node MSF) is CRITICAL for XNodeService and automation to determine firmware updates

## Commands

### Show FRU Information

#### Basic FRU Read
```
show system fru -i <server-id>
```
Reads Product FRU (ID 0) for the specified server.

**Example:**
```
show system fru -i 37
```

#### Read Specific FRU ID
```
show system fru -i <server-id> -f <fru-id>
```

**Example:**
```
show system fru -i 37 -f 1
```

### Edit FRU Fields

#### Edit Single Field
```
set system cmd -c fru edit <fru-id> field <field-id> <value> -i <server-id>
```

**Examples:**
```
set system cmd -c fru edit 0 field p 1 S213E -i 37
set system cmd -c fru edit 0 field p 4 P47192354029500E -i 37
set system cmd -c fru edit 0 field p 5 14987424 -i 37
set system cmd -c fru edit 0 field p 8 MSF-059051 -i 37
```

### Using ipmitool (Alternative)

#### Read FRU with ipmitool
```
ipmitool fru print 0
```

#### Edit FRU with ipmitool
```
ipmitool fru edit 0 field p 1 S213E
ipmitool fru edit 0 field p 4 P47192354029500E
ipmitool fru edit 0 field p 5 14987424
ipmitool fru edit 0 field p 8 MSF-059051
```

## Example FRU Output

```
Product Name          : S213E
Product Part Number   : M1184719-001
Product Version       : 5.0
Product Serial        : P47192354029500E
Product Asset Tag     : 14987424
Product Extra         : E
Product Extra         : MSF-059051
```

## Field Mapping to Output

| Output Label | Field ID | Description |
|--------------|----------|-------------|
| Product Name | p 1 | Model identifier |
| Product Part Number | p 2 | Part number |
| Product Version | p 3 | Hardware version |
| Product Serial | p 4 | Unique serial number |
| Product Asset Tag | p 5 | Asset tracking number |
| Product Extra (1st) | p 6 | Additional info |
| Product Extra (2nd) | p 8 | Node MSF (critical) |

## Critical Fields for Automation

### Node MSF (p 8)
The Node MSF field is essential for:
- XNodeService automation
- Firmware update determination
- System identification and tracking
- Integration with management systems

**Format**: MSF-XXXXXX (e.g., MSF-059051)

### Serial Number (p 4)
Unique identifier for the physical server unit.

**Format**: Alphanumeric string (e.g., P47192354029500E)

### Asset Tag (p 5)
Tracking number for inventory and asset management.

**Format**: Numeric string (e.g., 14987424)

## Best Practices

1. **Always verify FRU data after editing**
   - Read back the FRU to confirm changes
   - Example: `show system fru -i <server-id>` after edit

2. **Use correct field IDs**
   - Lowercase 'p' followed by space and field number
   - Incorrect: `P8`, `p8`
   - Correct: `p 8`

3. **Backup FRU data before mass edits**
   - Document current values before making changes
   - Keep a record of original FRU data

4. **Node MSF format**
   - Must follow MSF-XXXXXX pattern
   - Required for proper system integration

5. **Asset Tag tracking**
   - Coordinate with asset management system
   - Ensure uniqueness across deployment

## Common Use Cases

### Setting up a new server
```
# 1. Read current FRU to get template
show system fru -i 37

# 2. Set Model
set system cmd -c fru edit 0 field p 1 S213E -i 37

# 3. Set Serial Number
set system cmd -c fru edit 0 field p 4 P47192354029500E -i 37

# 4. Set Asset Tag
set system cmd -c fru edit 0 field p 5 14987424 -i 37

# 5. Set Node MSF (CRITICAL)
set system cmd -c fru edit 0 field p 8 MSF-059051 -i 37

# 6. Verify all changes
show system fru -i 37
```

### Updating Node MSF for automation
```
# Update MSF field for XNodeService integration
set system cmd -c fru edit 0 field p 8 MSF-059051 -i 37

# Verify the update
show system fru -i 37
```

### Bulk server identification
```
# Read FRU for multiple servers
for i in {1..40}; do
  echo "Server $i:"
  show system fru -i $i
done
```

## Troubleshooting

### FRU read fails
- Verify server ID is valid and server is present
- Check server power state
- Ensure BMC is accessible

### FRU edit fails
- Confirm proper field syntax (lowercase 'p', space, number)
- Verify value format matches field requirements
- Check for write permissions

### Node MSF not recognized by automation
- Verify MSF-XXXXXX format
- Ensure field p 8 (not p 6 or other)
- Check XNodeService configuration

## Related Commands

### System Information
```
show system info -i <server-id>           # General system info
show system state -i <server-id>          # Power state and datasafe
show system presence -i <server-id>       # Physical presence check
```

### Hardware Identification
```
show system type -i <server-id>           # System type
show system health -i <server-id>         # Health status including PCIe
```
