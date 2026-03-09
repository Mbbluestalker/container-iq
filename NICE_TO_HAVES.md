# ContainerIQ - Nice-to-Have Features

This document tracks features mentioned in the PRD that are not critical for MVP but would enhance the user experience.

---

## Fleet Operator

### 1. Operational Analytics Dashboard
**PRD Reference:** Line 980-982

**Description:**
A dedicated analytics page where fleet operators can view:
- Trip duration metrics
- Delay analysis and patterns
- Terminal wait times
- Performance trends over time

**Business Value:**
- Better fleet planning
- Identify bottlenecks in operations
- Data-driven decision making

**Status:** Not implemented

---

### 2. Container Compliance View (Law Enforcement)
**PRD Reference:** Line 975

**Description:**
A simplified view or printable certificate that fleet operators can show to law enforcement when stopped during transit. This should display:
- Container number and seal status
- Digital insurance certificate
- Route authorization
- Shipment validity
- QR code for verification

**Business Value:**
- Proof of lawful movement
- Reduced liability during transit
- Quick verification for law enforcement

**Status:** Not implemented

---

### 3. Custom Fleet Operator Dashboard
**PRD Reference:** Line 994 - "What Fleet Operators See (Fleet Dashboard)"

**Description:**
A dedicated dashboard view specifically for fleet operators showing:
- Summary of incoming shipment requests
- Active trips overview
- Fleet availability status
- Recent alerts and incidents
- Key performance metrics
- Quick actions for common tasks

**Current Implementation:**
We have a generic DashboardPage that all user types see. A custom dashboard would provide fleet-specific insights.

**Business Value:**
- At-a-glance operational overview
- Faster decision making
- Better situational awareness

**Status:** Partially implemented (generic dashboard exists)

---

## Insurance Companies

*To be added as we review insurance company requirements*

---

## Shippers

*To be added as we review shipper requirements*

---

## Terminal Operators

*To be added as we review terminal operator requirements*

---

## Shipping Companies

*To be added as we review shipping company requirements*

---

## Notes

- All features in this document are mentioned in the PRD but are not blocking for MVP launch
- Priority should be given to API integration for existing features before implementing nice-to-haves
- This document should be reviewed periodically to assess which features provide the most value
