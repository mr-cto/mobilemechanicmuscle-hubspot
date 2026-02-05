# HubSpot Form Updates Required

## License Plate & VIN Collection Update

**Issue**: When users enter license plate numbers, they always include "TN" even when vehicle is registered in other states.

**Solution**: Add a new field to the quote/contact form:

### New Form Field Specification

**Field Name**: Vehicle Registered State  
**Field Type**: Dropdown (State selector) or Text (2-character state code)  
**Position**: Immediately after "License Plate Number" field  
**Required**: Optional (but recommended for accurate VIN lookup)  
**Helper Text**: "What state is the vehicle registered in? (e.g., TN, AL, GA)"

### Implementation Steps

1. Go to **Marketing → Lead Capture → Forms**
2. Select the quote/service request form
3. Add new field after "License Plate Number":
   - Label: "Vehicle Registered State"
   - Internal name: `vehicle_registered_state`
   - Type: Dropdown with state codes or Single-line text
4. Consider making it a **dependent field** that appears when license plate is filled
5. Update form submission workflow to use this data for VIN lookup

### Benefits

- Accurate VIN lookup for out-of-state vehicles
- Better service preparation with correct vehicle information
- Reduces back-and-forth communication to clarify registration state

### Notes

Most customers will be TN-registered, but this covers the edge cases where vehicles are registered in neighboring states (AL, GA, KY, MS, etc.) but serviced in Nashville area.

---

**Date**: February 4, 2026  
**Source**: Client feedback - Alex
