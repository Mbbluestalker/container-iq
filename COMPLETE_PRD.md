# ContainerIQ - Complete Product Requirements Document

**Version**: 2.0
**Last Updated**: 2026-03-09
**Project**: Container Telematics & Insurance Platform for Nigerian Logistics

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Platform Vision & Strategic Goals](#platform-vision--strategic-goals)
3. [Universal Base Sign-Up (All User Types)](#universal-base-sign-up-all-user-types)
4. [User Personas & Journey Maps](#user-personas--journey-maps)
   - [Insurance Companies](#1-insurance-companies-container-insurance-providers)
   - [Shippers](#2-shippers-insurance-buyers--cargo-owners)
   - [Fleet Operators](#3-fleet-operators-road-transporters)
   - [Shipping Companies](#4-shipping-companies-vessel-operators)
   - [Terminal Operators](#5-terminal-operators)
5. [GPS e-Lock Device Lifecycle Management](#gps-e-lock-device-lifecycle-management)
6. [3-Pillar Scorecard System](#3-pillar-scorecard-system)
7. [Distributed Custodian Inventory Control](#distributed-custodian-inventory-control)
8. [Technical Architecture](#technical-architecture)
9. [Compliance & Regulatory Framework](#compliance--regulatory-framework)

---

## Executive Summary

**ContainerIQ** is Nigeria's first integrated container telematics, insurance, and compliance platform. It creates a digital ecosystem where:

- **Insurance companies** price risk accurately using real-time container data
- **Shippers** purchase insurance seamlessly and track cargo with confidence
- **Fleet operators** prove lawful movement and reduce liability
- **Shipping companies & terminals** maintain transparent custody chains
- **GPS e-Lock devices** are managed as regulated financial instruments across custodians

### Core Innovation

ContainerIQ combines:
1. **Telematics-driven insurance** - Premiums based on actual container security
2. **Digital evidence vault** - Immutable logs for claims & compliance
3. **GPS e-Lock lifecycle governance** - Custody chain, battery discipline, scorecard impact
4. **Behavior-shaping scorecard** - 3-pillar performance framework (On-Time, Compliance, Safety)

### Strategic Outcome

ContainerIQ becomes **the governance layer over Nigerian container logistics** by:
- Protecting insurer confidence through verifiable data
- Preventing device wastage via accountability systems
- Creating behavioral discipline across ecosystem players
- Introducing measurable accountability with scorecard ratings

---

## Platform Vision & Strategic Goals

### Vision Statement
*To transform Nigerian container logistics into a transparent, insured, and digitally governed ecosystem where every stakeholder operates within measurable accountability frameworks.*

### Strategic Goals

1. **Reduce Insurance Fraud** - Immutable telematics data eliminates "he said, she said" disputes
2. **Enable Data-Driven Pricing** - Insurers price based on actual risk, not assumptions
3. **Protect Device Assets** - GPS e-Locks managed through strict custody & battery governance
4. **Create Ecosystem Discipline** - Scorecard system shapes behavior across all players
5. **Regulatory Alignment** - NIIRA 2025, NAICOM, NPA, NIMASA, FRSC compliance built-in

---

## Universal Base Sign-Up (All User Types)

### Step 1: Universal Base Sign-Up (All Roles: Superadmin)

Every user (Insurance, Shipper, Fleet, Shipping Company, Terminal Operator) completes this foundational registration before role-specific onboarding.

#### A. Organization Identity

| Field | Description | Validation |
|-------|-------------|------------|
| **Legal Entity Name** | Registered legal name | Required |
| **Registered Business Name** | Trading name (if different) | Optional |
| **CAC Registration Number** | Corporate Affairs Commission ID | Required, unique |
| **Year of Incorporation** | YYYY format | Required |
| **Business Address (HQ)** | Headquarters location | Required |
| **Operational Address(es)** | Additional locations | Optional, multiple |
| **Country of Operation** | Default: Nigeria | Required |
| **Tax Identification Number (TIN)** | Federal tax ID | Required, unique |

#### B. Primary Contact Person

| Field | Description | Validation |
|-------|-------------|------------|
| **Full Name** | Legal name of superadmin | Required |
| **Job Title** | Role in organization | Required |
| **Official Email Address** | Becomes login ID | Required, unique, verified |
| **Phone Number** | WhatsApp enabled | Required, E.164 format |
| **Government ID Type** | NIN / Passport | Required |
| **ID Number** | Masked after verification | Required, verified |

#### C. System Credentials

| Field | Description | Validation |
|-------|-------------|------------|
| **Email (Login ID)** | Same as official email | Auto-filled |
| **Password** | Min 12 chars, uppercase, lowercase, number, special | Required |
| **2FA Preference** | Email / SMS / Authenticator App | Required |
| **Role Confirmation Checkbox** | "I confirm my role as [user_type]" | Required |

#### D. Legal & Compliance Consents

All three consents are **mandatory** and digitally signed with name + timestamp:

**1. Accept ContainerIQ Terms of Service***

> By accepting, you agree to use ContainerIQ in line with its terms, including data use, telematics consent, role-based access, and compliance with applicable insurance and transport regulations.

**2. Accept Data Sharing & Telematics Consent***

> This allows ContainerIQ to collect and share tracking and operational data strictly for risk assessment, claims processing, compliance, and platform services, in line with role-based access controls.

**3. Accept NIIRA / Insurance & Transport Compliance Framework***

> By accepting, you confirm that your operations will follow the NIIRA Act 2025 and all applicable insurance and transport compliance rules, including proper documentation, reporting, and risk management, while using ContainerIQ.

**Digital Signature**
- Name (auto-filled from contact person)
- Timestamp (system-generated)

---

## User Personas & Journey Maps

### 1. Insurance Companies (Container Insurance Providers)

#### Persona

| Attribute | Description |
|-----------|-------------|
| **Role** | Marine & inland cargo insurer/underwriter |
| **Goal** | Price risk accurately, reduce fraud, automate underwriting, manage claims with verifiable data |
| **Pain Points** | Fraudulent claims, lack of real-time data, manual underwriting, disputed assessments |
| **Success Metrics** | Reduced loss ratio, faster claim settlement, premium accuracy |

#### User Journey (End-to-End)

##### 1. Onboarding & Setup
- Complete universal sign-up + insurance-specific onboarding
- Connect underwriting system via API (Read-Only or Read & Write)
- Define insurance products:
  - Container-only insurance
  - Cargo + container insurance
  - Inland leg add-on coverage

##### 2. Risk Visibility & Underwriting
From the **Insurance Dashboard**, insurers see:
- Live containers seeking insurance
- Containers already insured by them
- Risk indicators per container

**Container Detail Screen** shows:
- ✅ Container ID, seal status, trip route, battery level
- ✅ Tamper events, door-open history
- ✅ Dwell time at terminals and highways
- ✅ **Risk Score panel** (device data + route risk) for dynamic premium pricing

##### 3. Policy Issuance
- Approve or auto-approve coverage based on risk score
- Digital policy certificate attached to container record
- Visible to shippers, fleet operators, and regulators

##### 4. Claims & Post-Loss
- Real-time incident alerts
- Review **immutable event logs** (timestamps, GPS, seal breaches)
- *"Claims assessment is faster and dispute-free"*

#### Value Outcomes
- ✅ Reduced fraud
- ✅ Faster underwriting
- ✅ Data-driven pricing

---

#### Insurance Company Sign-Up Fields

##### Organization Profile

| Field | Options/Description | Type |
|-------|---------------------|------|
| **Insurance License Number** | NAICOM license ID | Text, required |
| **Class of Insurance** | Marine Cargo, Inland Transit, Fleet (multi-select) | Checkbox |
| **Reinsurance Partner(s)** | African Re, Continental Re, FBS Re, Nigeria Re, WAICA Re (multi-select) | Checkbox |
| **NAICOM Reporting Code** | Regulatory reporting ID | Text, required |

##### Operational Scope

**Coverage Geography** (Select applicable):

- ☐ **Ports only**
  - Lagos Port Complex (Apapa Port)
  - Tin Can Island Port Complex
  - Lekki Deep Seaport
  - Onne Port (Rivers State)
  - Port of Port Harcourt
  - Delta Port Complex (Warri)
  - Calabar Port Complex
- ☐ **Corridors / Trade Routes** - Specific lanes (e.g., Apapa → Ikeja → Ota → Onne)
- ☐ **Nationwide** - Entire Nigeria
- ☐ **State / Regional** - Specific states/regions
- ☐ **City / Local** - Specific cities
- ☐ **International / Cross-Border** - ECOWAS zone
- ☐ **Other** (specify)

##### Policy Types Issued

**Marine / Cargo Insurance**:
- All-Risk Cargo Insurance
- Named-Perils Cargo Insurance
- Import / Export Open Cover
- Single-Shipment Cover
- Container Insurance
- Breakbulk Insurance

**Fleet Motor Insurance**:
- Comprehensive Motor Fleet Insurance
- Third-Party Liability (TPL)
- Goods-in-Transit Insurance
- Specialized Fleet Policies

**Liability & Third-Party Coverage**:
- Third-Party Cargo Liability
- Public / Third-Party Liability
- Environmental / Pollution Liability

**Reinsurance Policies**:
- Proportional / Facultative Reinsurance
- Excess-of-Loss Reinsurance

**Specialized Insurance (ContainerIQ-Enabled)**:
- Telematics-Based Risk Premium Insurance
- Short-Term / Spot Insurance
- High-Value / Sensitive Cargo Insurance
- Loss Prevention / Security-Linked Policies

**Regulatory / Compliance Insurance**:
- Motor Third-Party Insurance (FRSC required)
- Cargo Insurance for Customs Clearance
- Port Operator / Terminal Liability Insurance

##### Claims Processing Model
- ☐ In-house
- ☐ TPA (Third-Party Administrator)

##### Telematics & Risk Integration

**Consent Checkboxes** (All required):

- ☑ **Accept Telematics-Driven Risk Scoring**
  > Allows ContainerIQ to use tracking and sensor data to assess risk and generate safety and insurance risk scores.

- ☑ **Accept Automated Claims Evidence**
  > Allows ContainerIQ to automatically capture tracking data, alerts, and incident logs as digital evidence to support claims and reduce disputes.

**Preferred API Integration Mode**:

- ☐ **Read Only** - View tracking data, risk scores, and evidence only
- ☐ **Read & Write** - Full automation: view data + send policy/claims updates

##### Read & Write Integration Taxonomy

If **Read & Write** is selected, insurers can send the following updates to ContainerIQ:

###### 1. Policy-Level Updates

**Policy Status**:
- Active
- Suspended
- Expired
- Cancelled
- Lapsed
- Pending Activation
- Under Review

**Policy Metadata**:
- Policy Number
- Policy Version / Endorsement Number
- Effective Date
- Expiry Date
- Renewal Status (Pending / Renewed / Not Renewed)

###### 2. Coverage & Limit Updates

**Coverage Limits**:
- Sum Insured (Total)
- Per-Shipment Limit
- Per-Container Limit
- Per-Vehicle Limit
- Per-Incident Limit
- Aggregate Annual Limit

**Coverage Scope Updates**:
- Covered Cargo Types (checklist)
- Covered Routes / Corridors
- Covered Geographies
- Covered Vehicle Types (manual entry, CSV, or Excel upload)

**Deductibles & Excess**:
- Deductible Amount
- Deductible Type (Flat / Percentage)
- Excess Conditions

###### 3. Risk & Compliance Updates

- Risk Category Change (Low / Medium / High)
- Security Requirement Update (GPS / E-lock mandatory)
- Compliance Status (Compliant / Non-compliant / Conditional)
- Sanction / Restriction Flags

###### 4. Claims Lifecycle Updates

**Claim Status**:
- Reported
- Acknowledged
- Under Investigation
- Surveyor Appointed
- Additional Information Required
- Decision Issued (triggers Claim Decision field below)
- Closed
- Reopened

**Claim Decision** (when Decision Issued is selected):
- Approved
- Rejected
- Partially Approved
- Pending

###### 5. Settlement & Financial Updates

**Settlement Details**:
- Approved Settlement Amount (text box, each time)
- Currency (default: Naira ₦)
- Settlement Type (Full / Partial)
- Salvage Recovery Amount (if any)

**Claim Payment Status**:
- Not Payable
- Payment Pending
- Payment Authorised
- Payment In Progress
- Partially Paid
- Fully Paid
- Payment Failed
- Payment Reversed

###### 6. Evidence & Investigation Updates

- Evidence Submitted
- Evidence Accepted
- Evidence Disputed
- Fraud Investigation Opened
- Fraud Investigation Closed
- Law Enforcement Notified

###### 7. Reinsurance & Escalation Updates (Optional)

- Reinsurance Triggered
- Facultative Placement Confirmed
- Excess-of-Loss Triggered
- Large Loss Escalation

##### Documents Upload

- Insurance License
- NAICOM Approval Letter
- **Claims Contact Protocol** (Example below)

**Example: Claims Contact Protocol (ContainerIQ-Ready)**

```
Incident Type: Cargo Theft
ContainerIQ auto-alert triggered → Alert routing
Notification sent to → API notifications:
  - Claims Email: claims@insurerxyz.com
  - WhatsApp Hotline: +234 800 123 4567
Acknowledgement required within: 30 minutes (SLA timers)
Surveyor appointed within: 4 hours (SLA timers)
Regulator notified within: 24 hours (Regulator dashboards + SLA timers)
Evidence frozen in: Evidence Vault (Evidence visibility)
```

**How ContainerIQ Uses This Field**:
- Alert routing
- SLA timers
- Evidence visibility
- API notifications
- Regulator dashboards

---

### 2. Shippers (Insurance Buyers / Cargo Owners)

#### Persona

| Attribute | Description |
|-----------|-------------|
| **Role** | Importer, exporter, or logistics manager |
| **Goal** | Insure cargo easily, reduce loss, prove compliance, track containers end-to-end |
| **Pain Points** | Expensive premiums, lack of visibility, slow claims, untrusted fleet operators |
| **Success Metrics** | Lower insurance costs, zero cargo loss, faster claims settlement |

#### User Journey (End-to-End)

##### 1. Onboarding & Shipment Creation
- Complete universal sign-up + shipper-specific onboarding
- Create a **New Shipment**:
  - Indicate: **Import** or **Export**
  - Single or multiple containers
  - System generates **Shipment ID**
  - Fill out **Consignment Creation Form** (see below)

##### 2. Route Selection
- Select approved transport route from ContainerIQ's route library
- Routes affect:
  - Insurance eligibility
  - Risk scoring
  - Excess conditions
  - Regulator visibility
- **Optional**: Request custom route (subject to insurer/regulator approval)

##### 3. Container Selection
- Select container type from dropdown (with real/2D image)
- Choose size: 20ft / 40ft / Other
- Each container thumbnail shows:
  - Owner (shipping company + terminal operator)
  - Container ID
  - Detention period

##### 4. Fleet / Truck Selection

**Option A: Choice by Fleet** (3 options):

**1. Next fleet on the queue**
- Shows next available truck with thumbnail:
  - Fleet operator
  - Truck manufacturer, brand, plate number, year, color
  - Click to view scorecard performance
  - Link to selected container(s)

**2. Do you have a preferred fleet?**
- Search bar with auto-suggest/auto-complete
- Filter by manufacturer/brand
- View all available trucks from that fleet
- Link to selected container(s)

**3. Choose based on fleet scorecard**
- Leaderboard of top 20 performing available trucks
- Thumbnail info + scorecard
- Link to selected container(s)

**Option B: Choice by Truck Type**

Select truck type checkboxes:
- ☐ Skeletal
- ☐ Flatbed
- ☐ Tanker
- ☐ Lowbed
- ☐ Box / Dry Van
- ☐ Refrigerated (Reefer)
- ☐ Curtainsider
- ☐ Tipper / Dump
- ☐ Car Carrier
- ☐ Other (specify)

Selecting a checkbox populates available trucks of that type with:
- Fleet operator profile card
- Snapshot of fleet operator's scorecard position
- Link truck to selected container(s)

##### 5. Insurance Purchase

**Current Implementation (Uniform Pricing Model)**:

**3 Options**:
1. **Next insurer on the queue**
2. **Do you have a preferred insurer?**
3. **Complete drop-down list** of all marine/cargo/container insurance policies (with auto-suggest)

**After selecting insurer + policy**:

Payment page with options:
- Bank transfer
- Pay with debit card
- Pay from wallet
- USSD

**Payment Success Page**:
- Receipt to print/save
- Digital insurance certificate issued (after insurer's approval timeline)
- Certificate auto-attached to shipment
- Shipment + ID displayed to selected fleet operator

**Future Implementation (Insurance Marketplace)**:
- Compare insurance offers
- See premiums adjusted based on real-time container security + shipper profile + freight forwarder handling
- Purchase instantly

##### 6. Live Tracking & Assurance

From **Dashboard**, shippers monitor:
- Truck location
- Container location
- Seal status
- Estimated arrival times
- Alerts for route deviation or tampering

##### 7. Incident Handling

- File claim directly from container page
- No paperwork needed—ContainerIQ has evidence

#### Value Outcomes
- ✅ Lower premiums
- ✅ Peace of mind
- ✅ Faster claims

---

#### Shipper Sign-Up Fields

##### Business Classification

| Field | Options | Type |
|-------|---------|------|
| **Importer / Exporter / Both** | Radio buttons | Required |
| **Product Categories** | HS Code (optional) | Text, optional |
| **Average Monthly Containers** | Number | Required |
| **Primary Ports Used** | Multi-select from port list | Checkbox |

##### Cargo & Insurance Profile

| Field | Description | Type |
|-------|-------------|------|
| **Cargo Insurance Provider (if any)** | Current provider name | Text, optional |
| **Preferred Insurance Mode** | Annual Open Cover / Per-Shipment | Radio |
| **Willingness to use ContainerIQ-approved insurers** | Indicates openness to platform insurers | Checkbox |

##### Telematics Consent (All Required)

- ☑ **Consent to Container Tracking**
  > Allows ContainerIQ to track movement and status of containers during transit using GPS to improve security, visibility, and incident response.

- ☑ **Consent to Cargo Risk Scoring**
  > Allows ContainerIQ to assess risk levels based on route behavior, security events, and movement patterns to support safer operations and insurance decisions.

- ☑ **Consent to Share Data with Insurer & Regulator**
  > Allows relevant shipment and incident data to be securely shared with insurer and authorized regulators for compliance, claims processing, and safety oversight.

##### Documents Upload

- CAC Certificate
- Import / Export License
- Customs Registration (PAAR / NCS ID)
- **NXP Form** (Nigeria Export Proceeds Form) - for exports
- Export declaration documents - for exports
- Shipping Bill / Export Clearance - for exports
- Relevant regulatory permits (NAFDAC, SON, Quarantine)

**Technical Notes**:

**PAAR (Pre-Arrival Assessment Report)**:
- Issued by Nigeria Customs Service (NCS) before cargo arrives
- Assesses value, classification, and duty payable
- Helps Customs plan inspection and clearance
- Reduces delays and disputes at port

**NCS ID (Nigeria Customs Service ID)**:
- Unique ID for importers, exporters, clearing agents
- Required for all Customs transactions

**For Import Shipments, ContainerIQ requests**:
- PAAR number
- NCS ID
- Container number
- Bill of Lading reference

**For Export Shipments, ContainerIQ requests**:
- NXP Form number
- Exporter NCS ID
- Shipping reference
- Port of exit

---

#### Consignment Creation Form

**Purpose**: Used by shippers to create a new consignment within ContainerIQ. A consignment represents a single insured cargo movement involving one or more containers, assigned routes, fleet operators, and insurance coverage.

##### Section A: Shipper & Consignment Identification

| Field | Description | Type |
|-------|-------------|------|
| 1. **Shipper Name** | Registered legal name | Auto-filled |
| 2. **Shipper ID** | Unique shipper identifier | System-generated |
| 3. **Consignment Reference Number** | Unique ContainerIQ consignment ID | System-generated |
| 4. **Shipper Internal Reference** | PO number, invoice, internal logistics ref | Optional |
| 5. **Consignment Creation Date** | Date created | Auto-filled |

##### Section B: Cargo Details

| Field | Options/Description | Type |
|-------|---------------------|------|
| 6. **Cargo Description** | Plain-language description | Text, required |
| 7. **HS Code** | Harmonized System code | Text, optional |
| 8. **Cargo Category** | General cargo, FMCG, Industrial goods, Agricultural produce, Chemicals (non-hazardous), Hazardous cargo (approval required), High-value cargo | Dropdown |
| 9. **Packaging Type** | Containerised, Palletised, Bulk | Dropdown |
| 10. **Cargo Weight** | Gross weight (metric tonnes) | Number |
| 11. **Cargo Value Declaration** | Declared value for insurance (₦ / $) | Number |
| 12. **Currency** | NGN / USD / Other | Dropdown |

##### Section C: Container Information

| Field | Options/Description | Type |
|-------|---------------------|------|
| 13. **Container Assignment Mode** | Containers assigned now / Containers to be assigned later | Radio |
| 14. **Container Details** (repeatable) | - Container number<br>- Container size (20ft / 40ft / 40HC / Other)<br>- Container type (Dry / Reefer / Tank / Open-top / Flat-rack)<br>- Seal number (if available) | Repeatable group |

##### Section D: Origin, Destination & Route

| Field | Options/Description | Type |
|-------|---------------------|------|
| 15. **Origin Type** | Seaport, Inland container depot (ICD), Warehouse / Factory | Dropdown |
| 16. **Origin Location** | Port / ICD / Address | Text/Dropdown |
| 17. **Destination Type** | Seaport, ICD, Warehouse / Factory, Border post | Dropdown |
| 18. **Destination Location** | Port / ICD / Address | Text/Dropdown |
| 19. **Route Selection Method** | System-recommended insured route, Shipper-selected approved route, Fleet-selected approved route | Radio |
| 20. **Assigned Route ID** | Approved corridor under ContainerIQ | Auto-linked |

##### Section E: Transport & Fleet Assignment

| Field | Options/Description | Type |
|-------|---------------------|------|
| 21. **Truck Assignment Preference** | Assign truck now / Assign later | Radio |
| 22. **Fleet Operator Selection** | Preferred fleet operator(s), From the queue, From the leaderboard, Open request to verified fleet operators | Dropdown/Radio |
| 23. **Truck Type Required** | Flatbed, Skeletal, Tanker, Box / Curtain-side, Lowbed | Dropdown |
| 24. **Truck & Driver Linking** | Selected truck ID, Selected driver ID | Dropdown (if available) |

##### Section F: Insurance & Risk Parameters

| Field | Options/Description | Type |
|-------|---------------------|------|
| 25. **Insurance Policy Type** | Marine cargo (inland transit), All-risk cargo insurance, Theft-only / Limited perils | Auto or selectable |
| 26. **Coverage Scope** | Port-to-port, Warehouse-to-warehouse, Port-to-warehouse | Radio |
| 27. **Coverage Limits** | Maximum sum insured | Number |
| 28. **Deductible / Excess** | Applicable deductible amount | Number |
| 29. **Special Conditions / Exclusions** | - Required route compliance<br>- Mandatory telematics activation<br>- Maximum parking time allowed<br>- Daytime-only movement<br>- Escort requirement for high-value cargo<br><br>**Exclusions**:<br>- Loss due to war/civil unrest<br>- Damage from improper packing<br>- Movement outside approved routes<br>- Use of unverified drivers/trucks<br>- Overloading beyond declared weight | Read-only, scrollable text box |

**Why Section F.29 is Read-Only**:

Set by:
- The insurer
- Reinsurer
- Regulator
- ContainerIQ risk rules

Allowing edits would:
- Break insurance validity
- Create claims disputes
- Violate regulatory approvals

Shipper can:
- ✔ Review and acknowledge
- ❌ Cannot change them

**Auto-populated after**:
- Route selection
- Cargo value declaration
- Cargo category selection

##### Section G: Compliance & Regulatory Data

| Field | Options/Description | Type |
|-------|---------------------|------|
| 30. **PAAR / NCS ID** | Customs reference | Text (if applicable) |
| 31. **Customs Status** | Import, Export, Domestic transit | Radio |
| 32. **Hazard Declaration** | Yes / No | Radio |

##### Section H: Telematics & Data Consents (All Required)

- ☑ **33. Consent to Container Tracking**
  > Allows ContainerIQ to track movement and status of assigned containers using telematics throughout the journey for cargo visibility, risk monitoring, insurance validity, and faster claims resolution.

- ☑ **34. Consent to Cargo Risk Scoring**
  > Allows ContainerIQ to assess risk level using approved data such as route conditions, movement patterns, container status, and handling events for appropriate insurance coverage, pricing, and faster claims processing.

- ☑ **35. Consent to Share Data with Insurers & Regulators**
  > Allows ContainerIQ to securely share relevant shipment, tracking, and compliance data with participating insurers and authorized regulators for insurance coverage, claims handling, compliance monitoring, and audit purposes.

##### Section I: Commercial & Operational Notes

| Field | Description | Type |
|-------|-------------|------|
| 36. **Delivery Time Window** | Earliest pickup date/time, Latest delivery date/time | Date-time |
| 37. **Special Handling Instructions** | Free text | Textarea, optional |
| 38. **Supporting Documents Upload** | Commercial invoice, Packing list, Bill of lading, Other | File upload, optional |

##### Section J: Declaration & Submission

| Field | Description | Type |
|-------|-------------|------|
| 39. **Declaration** | *"I confirm that the information provided is accurate and complete, and I agree to the ContainerIQ Terms of Service and applicable insurance conditions."* | Checkbox, required |
| 40. **Digital Signature** | Name (auto-filled), Timestamp (system-generated) | Auto-generated |
| 41. **Submit Consignment** | Creates shipment requests for selected fleet operators and activates insurance workflow | Button |

##### System Outcomes After Submission

1. Insurance cover is provisionally bound
2. Fleet operators receive shipment requests
3. Containers, trucks, drivers, and routes are digitally linked
4. Telematics and compliance monitoring are activated

**📌 This creates a Shipment Request, not yet an active movement.**

**🧠 Transition to Active Movement**: Requires back-office GPS e-lock device management system (see Device Lifecycle section below).

---

### 3. Fleet Operators (Road Transporters)

#### Persona

| Attribute | Description |
|-----------|-------------|
| **Role** | Trucking company / fleet manager |
| **Goal** | Prove lawful movement, reduce theft accusations, improve fleet efficiency |
| **Pain Points** | False theft accusations, detention by law enforcement, poor fleet visibility, manual operations |
| **Success Metrics** | Higher scorecard rating, more shipment requests, reduced insurance costs, zero liability incidents |

#### User Journey (End-to-End)

##### 1. Onboarding & Vehicle Linking
- Complete universal sign-up + fleet-specific onboarding
- Register fleet and drivers
- Link trucks and/or drivers to specific containers for each trip

##### 2. Shipment Request Management

From **Fleet Dashboard**, fleet operators see:

**Incoming Shipment Requests** with:
- Container number(s)
- Assigned truck(s) (if pre-selected by shipper)
- Route and destination
- **Detention period**
- Risk profile
- Insurance coverage summary
- Expected pickup time

**Fleet Operator Fulfillment Process**:

**Step 1: Review & Validate**

Fleet operator checks:
- Truck availability and fitness
- Driver assignment and verification
- Route feasibility (if not feasible, propose alternatives)

**Step 2: Accept / Modify / Decline**

Fleet operator can:
- ✅ **Accept as-is**
- 🔁 **Propose changes** (e.g., alternate truck or driver) → triggers shipper notification
- ❌ **Decline** (with reason)

**Step 3: Assign Driver & Confirm Readiness**

Once accepted:
- Driver is assigned
- Compliance checks run:
  - Driver verification
  - FRSC compliance
  - Vehicle readiness
- Shipment status becomes: **Ready for Dispatch**

##### 3. Dispatch & Execution

Upon dispatch:

**ContainerIQ**:
- Activates telematics (GPS e-lock hardware + software activation)
- Starts route monitoring
- Locks insurance validity to:
  - Container
  - Truck
  - Route
  - **Detention Period**

**Status updates**:
- In Transit
- Incident (if any)
- Delivered

##### 4. Trip Execution

From **Active Trips** screen, fleet operators:
- See assigned containers and routes
- Monitor drivers' movement
- ContainerIQ tracks seal integrity and GPS

##### 5. Incident Protection

**If stopped by law enforcement**:
- Show **Container Compliance View**
- **OR** law enforcement scans QR code on digital certificate to validate

**Any seal breach**:
- Timestamped and attributed to responsible party

##### 6. Operational Analytics

View:
- Trip duration
- Delays
- Terminal wait times
- Scorecard performance trends

#### Value Outcomes
- ✅ Reduced liability
- ✅ Better fleet planning
- ✅ Proof of innocence
- ✅ Higher scorecard ranking = more jobs

---

#### Fleet Operator Sign-Up Fields

##### Fleet Profile

| Field | Options/Description | Type |
|-------|---------------------|------|
| **Number of Trucks** | Total fleet size | Number |
| **Truck Types** | Skeletal, Flatbed, Tanker, Lowbed, Box / Dry Van, Refrigerated, Curtainsider, Tipper, Car Carrier, Other | Multi-select |
| **Ownership Model** | Owned / Leased | Radio |
| **Operational Corridors** | Use same corridor list as insurance companies | Multi-select |

##### Driver & Asset Compliance

| Field | Options/Description | Type |
|-------|---------------------|------|
| **Driver Verification Process** | Y/N | Radio |
| **FRSC Compliance Status** | Compliant / Partially Compliant / Non-Compliant | Dropdown |
| **Vehicle Insurance Provider(s)** | Insurance company name(s) | Text |

##### Telematics Capability

| Field | Options/Description | Type |
|-------|---------------------|------|
| **GPS Installed** | Yes / No | Radio |
| **E-Lock Installed** | Yes / No | Radio |
| **Willing to install ContainerIQ-approved devices** | Yes / No | Radio |

##### Documents Upload

- Fleet Insurance Certificate
- Vehicle Licenses
- Driver Accreditation Proof

---

#### A. Driver Creation Form (Fleet Operator)

**Purpose**: To establish identity, legality, competence, and insurability of drivers.

##### 1. Basic Identity Information

| Field | Description | Type |
|-------|-------------|------|
| **Full Name** | Legal name | Text, required |
| **Date of Birth** | YYYY-MM-DD | Date, required |
| **Phone Number** | E.164 format | Text, required |
| **Email** | Contact email | Text, optional |
| **Residential Address** | Full address | Text, required |
| **Nationality** | Default: Nigerian | Dropdown |

##### 2. Government Identification

| Field | Description | Type |
|-------|-------------|------|
| **NIN (or Passport Number)** | Government ID | Text, required |
| **Driver's Licence Number** | FRSC license | Text, required |
| **Issuing Authority** | FRSC | Auto-filled |
| **Licence Class** | A, B, C, D, E, F, G, H, I, J, K | Dropdown |
| **Licence Issue Date** | YYYY-MM-DD | Date |
| **Licence Expiry Date** | YYYY-MM-DD | Date, required |

📌 **Mandatory for FRSC and insurer validation**

##### 3. Employment Information

| Field | Description | Type |
|-------|-------------|------|
| **Employment Type** | Full-time / Contract / Third-party | Dropdown |
| **Driver ID (internal)** | Fleet operator's internal ID | Text, optional |
| **Date Engaged** | YYYY-MM-DD | Date |
| **Assigned Depot / Location** | Base location | Text |

##### 4. Driver Competency & Training

| Field | Description | Type |
|-------|-------------|------|
| **Years of Driving Experience** | Number of years | Number |
| **Heavy Vehicle Experience** | Y/N | Radio |
| **Safety / Defensive Driving Training** | Y/N | Radio |
| **Last Training Date** | YYYY-MM-DD | Date, optional |
| **Certification Upload** | Training certificates | File, optional |

##### 5. Compliance & Health (Declaration-Based)

| Field | Description | Type |
|-------|-------------|------|
| **Medical Fitness Declared** | Y/N | Radio |
| **No Active Licence Suspension** | Y/N | Radio |
| **No Serious Traffic Convictions** | Y/N | Radio |

📌 **ContainerIQ records declarations; does not certify**

##### 6. Verification Status (System-Controlled)

| Field | Options | Type |
|-------|---------|------|
| **Verification Status** | Pending, Verified, Rejected | Dropdown, system-controlled |
| **Verification Date** | YYYY-MM-DD | Date, system-generated |
| **Verified By** | Fleet / System / Third-party | Text, system-generated |

##### 7. Driver–Telematics Linkage

| Field | Description | Type |
|-------|-------------|------|
| **Assigned Telematics Device** | Device ID | Text, optional |
| **Driver App Installed** | Y/N | Radio |
| ☑ **Driver Behaviour Monitoring Consent** | *Allows ContainerIQ to use driving behaviour data (such as speed patterns, braking, and route compliance) collected via telematics to improve safety, risk assessment, and insurance outcomes, with due consideration given to road conditions, infrastructure limitations, and other environmental factors beyond the driver's or fleet operator's control.* | Checkbox, required |

##### 8. Supporting Documents Upload

- Driver's Licence
- ID Document (NIN/Passport)
- Training Certificates (optional)

##### Driver Status Fields (System)

| Status | Description |
|--------|-------------|
| **Active** | Eligible for assignment |
| **Suspended** | Temporarily ineligible |
| **Inactive** | Not currently in use |

##### Insert-Ready Principle

> **Only verified drivers can be assigned to insured shipments.**

---

#### B. Truck / Vehicle Creation Form (Fleet Operator)

**Purpose**: To ensure roadworthiness, compliance, and risk eligibility.

##### 1. Vehicle Identification

| Field | Description | Type |
|-------|-------------|------|
| **Vehicle Registration Number** | License plate | Text, required, unique |
| **VIN / Chassis Number** | Vehicle ID | Text, required |
| **Engine Number** | Engine serial | Text, required |
| **Make** | Manufacturer | Text, required |
| **Model** | Vehicle model | Text, required |
| **Year of Manufacture** | YYYY | Number, required |
| **Colour** | Vehicle color | Text |

##### 2. Truck Type & Configuration

| Field | Options | Type |
|-------|---------|------|
| **Truck Type** | Flatbed, Skeletal, Tanker, Box / Dry Van, Lowbed, Tipper | Dropdown, required |
| **Axle Configuration** | 2-axle, 3-axle, 4-axle, 6-axle, Other | Dropdown |
| **Load Capacity (Tonnes)** | Maximum tonnage | Number, required |
| **Container Compatibility** | 20ft, 40ft, Both | Radio |

##### 3. Ownership & Control

| Field | Description | Type |
|-------|-------------|------|
| **Ownership Type** | Owned / Leased / Managed | Dropdown |
| **Owner Name** | If not fleet operator | Text, optional |
| **Lease Expiry Date** | If leased | Date, optional |

##### 4. Regulatory Compliance

| Field | Description | Type |
|-------|-------------|------|
| **Vehicle Licence Expiry Date** | YYYY-MM-DD | Date, required |
| **Roadworthiness Certificate Expiry** | YYYY-MM-DD | Date, required |
| **Insurance Status** | 3rd Party / Comprehensive | Dropdown |
| **FRSC Compliance Status** | Compliant / Partially Compliant / Non-Compliant | Dropdown, required |

##### 5. Safety Equipment Declaration (All checkboxes required)

- ☑ Functional Brakes
- ☑ Functional Lights
- ☑ Reflective Markings
- ☑ Fire Extinguisher
- ☑ Speed Limiter

##### 6. Telematics & Tracking

| Field | Description | Type |
|-------|-------------|------|
| **GPS Device Installed** | Y/N | Radio |
| **Device ID** | Unique device identifier | Text, optional |
| **E-lock Installed** | Y/N | Radio |
| **Panic Button Installed** | Y/N | Radio |
| **Geofencing Enabled** | Y/N | Radio |

##### 7. Operational Availability

| Field | Options | Type |
|-------|---------|------|
| **Base Location** | Depot/yard location | Text |
| **Operating Regions** | States/corridors | Multi-select |
| **Availability Status** | Available, Assigned, Under Maintenance, Out of Service | Dropdown, system-controlled |

##### 8. Supporting Documents Upload

- Vehicle Registration
- Roadworthiness Certificate
- Insurance Certificate
- Telematics Installation Proof (optional)

##### Truck Status Fields (System)

| Status | Description |
|--------|-------------|
| **Active** | Eligible for assignment |
| **Restricted** | Limited use |
| **Suspended** | Not eligible |

##### Insert-Ready Principle

> **Only compliant and tracked vehicles can execute insured container movements.**

---

#### C. Driver–Truck–Shipment Relationship (Critical Rule)

**ContainerIQ enforces**:

✅ A driver must be **verified**
✅ A truck must be **compliant**
✅ Both must be:
- Assigned
- Active
- Tracked

**Before a shipment can move.**

##### Why This Serves the Entire Ecosystem

| Stakeholder | Value |
|-------------|-------|
| **Shippers** | Trust & predictability |
| **Insurers** | Reduced fraud & faster claims |
| **Regulators** | Visibility without interference |
| **Fleet Operators** | Credibility & access to insured jobs |
| **ContainerIQ** | Enforceable risk governance |

---

### 4. Shipping Companies (Vessel Operators)

#### Persona

| Attribute | Description |
|-----------|-------------|
| **Role** | Ocean carrier |
| **Goal** | Reduce container loss, improve inland handover visibility, comply with Nigerian regulations |
| **Pain Points** | Container loss post-discharge, unclear custody chain, regulatory reporting burden |
| **Success Metrics** | Lower container loss rate, clear liability transfers, regulatory compliance |

#### User Journey (End-to-End)

##### 1. Manifest & Container Upload
- Upload vessel manifests into ContainerIQ or sync via API
- Containers automatically tracked once offloaded

##### 2. Handover Transparency
- See when containers leave the terminal
- See who takes custody
- Liability transfer is timestamped

##### 3. Regulatory Reporting
- Generate compliance reports for NPA and NIMASA

#### Value Outcomes
- ✅ Clear custody chain
- ✅ Lower disputes
- ✅ Better regulator trust

---

### 5. Terminal Operators

#### Persona

| Attribute | Description |
|-----------|-------------|
| **Role** | Port & inland terminal manager |
| **Goal** | Improve container flow, reduce congestion, provide audit-ready records |
| **Pain Points** | Container dwell time, congestion, unclear accountability, manual gate operations |
| **Success Metrics** | Faster throughput, reduced dwell time, digital audit trail |

#### User Journey (End-to-End)

##### 1. Gate-In / Gate-Out Operations
- Scan containers on entry and exit
- ContainerIQ records seal state and timestamps

##### 2. Yard Management
- Monitor dwell time per container
- Alerts show overstayed or high-risk containers

##### 3. Reporting
- Generate reports for shipping companies and NPA

#### Value Outcomes
- ✅ Faster throughput
- ✅ Reduced congestion
- ✅ Digital audit trail

---

## GPS e-Lock Device Lifecycle Management

### Overview

This back-office device management system is the **operational backbone of ContainerIQ**. GPS e-Lock devices are managed as **regulated financial instruments** across the ecosystem.

### 🎯 Epic: Secure, Accountable, and Scored GPS e-Lock Management

**As Tsaron Tech**,
We want to control the full lifecycle of every GPS e-Lock device
**So that** containers are securely tracked, devices are protected, batteries are responsibly managed, and ecosystem players are scored fairly.

---

### 🧩 Primary Actors

1. **Tsaron Tech Back-Office Admin** (Super custodian)
2. **Tsaron Tech Field Operator**
3. **Approved Third-Party Field Partner**
4. **Shipping Company**
5. **Terminal Operator**
6. **Fleet Operator**
7. **Shipper**
8. **Insurer** (read-only visibility)

---

### Device Lifecycle Stages

#### 🟢 USER STORY 1: Device Assignment Before Container Trip

**Title**: Assign GPS e-Lock to Container

**As a Tsaron Tech Field Operator**,
I want to assign a specific GPS e-Lock device to a specific container and consignment
**So that** tracking, insurance validation, and chain-of-custody begin before the container leaves the controlled location.

##### Acceptance Criteria

**Device must be**:
- Marked "Available"
- Battery ≥ 40%
- Not flagged for maintenance

**System records**:
- Device ID
- Container number
- Consignment ID
- Location of assignment (Port / Terminal / ICD / Airport / Loading Bay)
- Assigning personnel
- Timestamp
- Battery level at assignment

**Device status changes to**: `Assigned – In Transit`

**Chain-of-custody log begins**

**Shipping company & fleet operator dashboards update automatically**

---

#### 🟡 USER STORY 2: Battery Governance & Charging Discipline

**Title**: Battery Monitoring & Score Impact

**As the ContainerIQ System**,
I want to continuously monitor device battery levels
**So that** devices remain operational and ecosystem players are scored based on responsible handling.

##### Battery Rules

| Battery Level | System Action | Score Impact |
|---------------|---------------|--------------|
| ≥ 40% | Normal | Positive |
| 21%–39% | Warning issued | Neutral |
| ≤ 20% | Critical alert<br>Incident logged | **Negative score** |
| 0% (dead) | Major penalty | **Major penalty** |

##### Behaviour Scoring Logic

**Shipping Companies & Terminal Operators**:

Responsible for:
- Charging device if container dwell time > threshold
- Ensuring no device is allowed to fall below 20%

**Fleet Operators**:

Responsible during transit:
- Avoid tampering
- Report low battery alert immediately
- Present container at destination without damage

**Shippers**:

Responsible at:
- Loading bay
- Final warehouse offloading

---

#### 🔵 USER STORY 3: Mid-Journey Reassignment (Exceptional Case)

**Title**: Device Reassignment

**As Tsaron Tech Back-Office**,
I want to reassign a device mid-journey if required
**So that** tracking continuity is maintained without disrupting insurance validity.

##### Triggers for Reassignment

- Battery failure
- Hardware malfunction
- Tamper detection
- Emergency swap at terminal

##### Process

1. Replacement device validated (≥ 40% battery)
2. Old device status changed to: `Removed – Pending Inspection`
3. New device assigned
4. Full audit log maintained
5. Insurer notified automatically
6. Score impact determined based on reason

---

#### 🔴 USER STORY 4: Device Decommissioning After Trip Completion

**Title**: Secure Device Removal & Return

**As a Tsaron Tech Field Operator**,
I want to remove and decommission the GPS e-Lock after trip completion
**So that** the device is returned safely into inventory for reuse.

##### Acceptance Criteria

- Container trip marked **Completed**
- Device physically removed
- Battery level recorded
- Device inspected for:
  - Damage
  - Tamper marks
  - Seal integrity

**Status changed to**:
- "Available" (if healthy)
- "Maintenance Required"
- "Damaged – Liability Review"
- "Lost"

**Custody transfer logged**

---

#### ⚖ USER STORY 5: Lost or Destroyed Device Handling

**Title**: Liability & Financial Accountability

**As Tsaron Tech**,
I want to automatically assign responsibility for lost or destroyed devices
**So that** ecosystem discipline is maintained.

##### If Device is Lost

- Last custody holder identified
- Incident report generated
- Financial liability assigned
- Score penalty applied

##### If Device is Destroyed

- Inspection report logged
- Damage classification:
  - Accidental
  - Negligent
  - Intentional
- Escalation to insurer if needed

---

### 🔁 Full Lifecycle Flow (End-to-End: Tsaron Tech)

1. Consignment created
2. Device reserved in back office
3. **Device assigned at origin**
   - Battery ≥ 40% confirmed
4. **Transit tracking begins**
   - Continuous battery monitoring
   - Alerts issued if ≤ 20%
5. **Arrival at destination**
6. **Device removed & inspected**
7. Device:
   - Returned to inventory
   - Sent to maintenance
   - Flagged as damaged/lost
8. **Score updated automatically**
9. **Billing & liability** (if applicable) generated

---

### 🧠 Strategic Importance

This system:
- ✅ Protects insurer confidence
- ✅ Prevents device wastage
- ✅ Creates behavioural discipline
- ✅ Introduces measurable accountability
- ✅ Strengthens ContainerIQ's defensibility

**Most importantly**:

> **The GPS e-Lock becomes not just a tracking device — but a behaviour-shaping instrument across the logistics ecosystem.**

---

## 3-Pillar Scorecard System

### Overview

ContainerIQ evaluates ecosystem participants using a **three-pillar performance framework**:

1. **On-Time Performance**
2. **Compliance**
3. **Safety**

Operational incidents automatically deduct points within the relevant pillar, and the weighted composite score determines ecosystem standing and assignment privileges.

---

### 1️⃣ Mathematical Scoring Formula

#### Step 1: Pillar Scores (Per Month)

Each custodian starts each month with:
- **On-Time = 100**
- **Compliance = 100**
- **Safety = 100**

Event deductions reduce the relevant pillar only.

**Pillar Score Formula**:

```
Pillar Score = 100 – Σ(Event Deductions in that Pillar)

Minimum = 0
Maximum = 100
```

#### Step 2: Weighted Composite Score

Each custodian has different pillar weights.

**General Formula**:

```
Final Score =
  (On-Time × OT Weight) +
  (Compliance × C Weight) +
  (Safety × S Weight)

Where: OT Weight + C Weight + S Weight = 1
```

---

### 2️⃣ Event Deduction Matrix

#### 🔋 Battery Discipline (Compliance)

| Event | Deduction |
|-------|-----------|
| Released below 40% | −3 |
| Dropped below 20% | −5 |
| Battery died (0%) | −8 |
| Failed to charge after alert | −6 |

#### ⏱ On-Time Discipline

| Event | Deduction |
|-------|-----------|
| Late device release | −4 |
| Late device check-in | −4 |
| Late custody confirmation | −3 |

#### 🛡 Safety Discipline

| Event | Deduction |
|-------|-----------|
| Minor physical damage | −5 |
| Major damage | −10 |
| Device lost | −15 |
| Tamper detection | −8 |
| Failed inspection logging | −5 |

---

### 3️⃣ Custodian Weighting Structure

#### Shipping Company

| Pillar | Weight |
|--------|--------|
| On-Time | 30% |
| Compliance | 40% |
| Safety | 30% |

#### Terminal Operator

| Pillar | Weight |
|--------|--------|
| On-Time | 40% |
| Compliance | 35% |
| Safety | 25% |

#### Third-Party Partner

| Pillar | Weight |
|--------|--------|
| On-Time | 25% |
| Compliance | 45% |
| Safety | 30% |

#### Fleet Operator (Marginal)

| Pillar | Weight |
|--------|--------|
| On-Time | 20% |
| Compliance | 40% |
| Safety | 40% |

**Note**: Only events during transit apply.

---

### 4️⃣ Rating Bands (Visible on Dashboard)

| Score Range | Rating | Status |
|-------------|--------|--------|
| 90–100 | 🟢 Gold | Preferred Partner |
| 80–89 | 🟢 Silver | Good Standing |
| 70–79 | 🟡 Watchlist | Improvement Required |
| 60–69 | 🟠 Probation | Limited Assignment |
| <60 | 🔴 Restricted | Assignment Suspension Risk |

---

### 5️⃣ Consequences Matrix

#### 🟢 Gold

- Priority container assignment
- Lower insurance loading
- Public "Trusted Operator" badge

#### 🟡 Watchlist

- Automated advisory notice
- Operational review call

#### 🟠 Probation

- Reduced device allocation
- Insurance loading increase
- Mandatory retraining

#### 🔴 Restricted

- Suspension from new assignments
- Mandatory audit
- Financial penalties for losses

---

### 6️⃣ Monthly Performance Report Template

```
📊 ContainerIQ Performance Report

Organisation: Terminal Operator XYZ
Month: March 2026

Summary Score

┌─────────────┬───────┬────────┬────────────────────────┐
│ Pillar      │ Score │ Weight │ Weighted Contribution  │
├─────────────┼───────┼────────┼────────────────────────┤
│ On-Time     │ 92    │ 40%    │ 36.8                   │
│ Compliance  │ 88    │ 35%    │ 30.8                   │
│ Safety      │ 95    │ 25%    │ 23.75                  │
└─────────────┴───────┴────────┴────────────────────────┘

Final Score: 91.35 (Gold)

Event Breakdown

Battery Incidents:
  • 1 device released at 35% (−3)

On-Time Incidents:
  • 2 late check-ins (−8 total)

Safety Incidents:
  • None

Trend vs Previous Month
  • +3.2 improvement
  • Battery compliance improved 12%

Recommendations
  • Improve check-in timing within 2-hour SLA
```

---

### 7️⃣ Realistic Simulation — Apapa Port Scenario

#### Shipping Company A

**Incidents**:
- 3 releases at 35% battery (−9 Compliance)
- 1 battery drop below 20% (−5 Compliance)
- 1 late dispatch (−4 On-Time)

**Pillar Scores**:

| Pillar | Score |
|--------|-------|
| On-Time | 96 |
| Compliance | 86 |
| Safety | 100 |

**Final Score**:
```
(96×0.30) + (86×0.40) + (100×0.30)
= 28.8 + 34.4 + 30
= 93.2 → Gold
```

#### Terminal Operator B

**Incidents**:
- 3 late check-ins (−12 On-Time)
- 1 minor device damage (−5 Safety)
- 1 failed inspection log (−5 Safety)

**Pillar Scores**:

| Pillar | Score |
|--------|-------|
| On-Time | 88 |
| Compliance | 100 |
| Safety | 90 |

**Final Score**:
```
(88×0.40) + (100×0.35) + (90×0.25)
= 35.2 + 35 + 22.5
= 92.7 → Gold
```

#### Third-Party Partner C

**Incidents**:
- 2 unlogged custody transfers (−12 Compliance)
- 1 late deployment (−4 On-Time)
- 1 device damaged (−10 Safety)

**Pillar Scores**:

| Pillar | Score |
|--------|-------|
| On-Time | 96 |
| Compliance | 88 |
| Safety | 90 |

**Final Score**:
```
(96×0.25) + (88×0.45) + (90×0.30)
= 24 + 39.6 + 27
= 90.6 → Gold
```

#### Fleet Operator D

**Incidents**:
- 1 tamper detection (−8 Safety)
- 1 battery alert ignored (−6 Compliance)

**Pillar Scores**:

| Pillar | Score |
|--------|-------|
| On-Time | 100 |
| Compliance | 94 |
| Safety | 92 |

**Final Score**:
```
(100×0.20) + (94×0.40) + (92×0.40)
= 20 + 37.6 + 36.8
= 94.4 → Gold
```

---

### 8️⃣ Strategic Result

This unified model now:

- ✅ Aligns discipline with measurable math
- ✅ Allows insurers to trust ratings
- ✅ Allows shippers to choose better operators
- ✅ Protects device assets
- ✅ Encourages battery responsibility
- ✅ Reduces device loss rate
- ✅ Prevents scoring confusion

**Most importantly**:

> **Every deduction now logically fits into one of the three pillars.**

---

### 9️⃣ Governance Policy Statement (Final Form)

> ContainerIQ evaluates ecosystem participants using a three-pillar performance framework (On-Time, Compliance, Safety). Operational incidents automatically deduct points within the relevant pillar, and the weighted composite score determines ecosystem standing and assignment privileges.

**We now have a mathematically sound, regulator-defensible, insurer-aligned scoring engine.**

---

## Distributed Custodian Inventory Control

### 📦 EPIC: Distributed GPS e-Lock Inventory Management

**Epic Goal**: Ensure every ultimate custodian maintains accountable, real-time inventory control of GPS e-Lock devices before and after container trips.

---

### 👥 Ultimate Custodians (Inventory-Holding Accounts)

1. **Tsaron Tech** (Super Admin Custodian)
2. **Approved Third-Party Partner** (now treated as Organisation User)
3. **Shipping Company**
4. **Terminal Operator**

All four now have:
- Inventory dashboard
- Custody logs
- Transfer controls
- Battery monitoring visibility
- Condition reporting capability
- Score impact visibility

---

### 🟢 USER STORY 1: Custodian Device Inventory Dashboard

**Title**: View & Manage Assigned Device Inventory

**As an Ultimate Custodian Organisation User**
(Tsaron Tech, Third-Party Partner, Shipping Company, Terminal Operator),

I want to see and manage all GPS e-Lock devices currently under my custody
**So that** I can maintain accountability, readiness, and compliance before and after container trips.

#### Acceptance Criteria

##### A. Inventory Overview

Each custodian account must display:
- Total devices under custody
- Available devices
- Assigned devices
- Charging devices
- Low-battery devices (<40%)
- Critical battery devices (≤20%)
- Devices pending inspection
- Damaged devices

##### B. Device-Level Details

For each device:
- Device ID
- Current battery level
- Last trip ID
- Current status
- Last custody transfer
- Condition report
- Maintenance history

##### C. Permitted Actions

Depending on role:

| Action | Tsaron | 3rd Party | Shipping Co | Terminal |
|--------|--------|-----------|-------------|----------|
| Assign to container | ✔ | ✔ | ✔ | ✔ |
| Receive from prior custodian | ✔ | ✔ | ✔ | ✔ |
| Mark as charging | ✔ | ✔ | ✔ | ✔ |
| Mark damaged | ✔ | ✔ | ✔ | ✔ |
| Transfer custody | ✔ | ✔ | ✔ | ✔ |
| Decommission | ✔ | ✔ | ✖ | ✖ |

**Note**: Only **Tsaron** can permanently decommission.

---

### 🟡 USER STORY 2: Custody Transfer Before Trip Begins

**Title**: Device Check-Out for Trip Start

**As a Custodian User**,
I want to formally assign and release a device into a container trip
**So that** chain-of-custody and battery readiness are validated before dispatch.

#### Preconditions

- Device battery ≥ 40%
- No damage flags
- Device not under maintenance

#### System Records

- Custodian releasing device
- Receiving custodian (if applicable)
- Container ID
- Consignment ID
- Battery level
- Timestamp
- Condition confirmation

#### Scorecard Impact (Trip Start)

| Parameter | Scoring Logic |
|-----------|---------------|
| **On-Time** | Was device ready before dispatch window? |
| **Compliance** | Was battery ≥ 40% at release? |
| **Safety** | Was device physically inspected before release? |

---

### 🔵 USER STORY 3: Device Check-In After Trip Ends

**Title**: Device Check-In & Post-Trip Inspection

**As a Custodian User**,
I want to formally receive and inspect the device at trip end
**So that** its condition and battery level are validated and logged.

#### Process

1. Receive device
2. Record battery %
3. Inspect for:
   - Tamper evidence
   - Seal integrity
   - Physical damage
4. Mark status:
   - Available
   - Charging Required
   - Damaged
   - Maintenance Required
5. Confirm custody

#### Scorecard Impact (Trip End)

| Parameter | Scoring Logic |
|-----------|---------------|
| **On-Time** | Was device checked-in within defined time window? |
| **Compliance** | Was inspection completed properly? |
| **Safety** | Was damage correctly reported? |

**Failure to check in within SLA = On-Time penalty.**

---

### 🔴 USER STORY 4: Battery Charging Discipline

**Title**: Responsible Battery Management

**As a Custodian Organisation**,
I want to manage charging discipline properly
**So that** devices remain operational and my compliance score remains strong.

#### Battery Governance Rule

- Charge at 40%
- Must NOT drop below 20%
- Dead battery triggers incident

#### Scorecard Weighting per Custodian

##### 1️⃣ Shipping Companies

| Pillar | Weight | Focus |
|--------|--------|-------|
| **On-Time** | 30% | Device ready before vessel discharge or dispatch |
| **Compliance** | 40% | Charged before release, No unrecorded transfers |
| **Safety** | 30% | No avoidable damage, Proper seal handling |

##### 2️⃣ Terminal Operators

| Pillar | Weight | Focus |
|--------|--------|-------|
| **On-Time** | 40% | Device processed within SLA after container arrival |
| **Compliance** | 35% | Accurate logging, Battery rule adherence |
| **Safety** | 25% | Secure storage, Zero mishandling incidents |

##### 3️⃣ Approved Third-Party Partners

| Pillar | Weight | Focus |
|--------|--------|-------|
| **On-Time** | 25% | Rapid deployment & collection |
| **Compliance** | 45% | Accurate custody transfer, Correct reporting |
| **Safety** | 30% | Device protection in transit |

##### 4️⃣ Tsaron Tech (Internal Governance)

Internal KPI only (not public scorecard):
- Inventory accuracy
- Device turnaround time
- Damage rate
- Asset recovery rate

---

### ⚖ Fleet Operator Impact (Marginal)

Fleet operators:
- Do NOT own inventory
- But drivers handle devices during transit

#### Score Impact (Minor)

| Pillar | Focus |
|--------|-------|
| **Compliance** | Reporting law enforcement inspections properly |
| **Safety** | No tampering, No device damage during transit |

**Battery drop below 20% while in transit**:

**Shared penalty between**:
- Origin custodian
- Fleet operator (if ignored alert)

---

### 🔁 Full Distributed Inventory Flow

1. Device in custodian inventory
2. Battery verified
3. Assigned to container
4. Transit begins
5. Battery monitored
6. Arrival
7. Receiving custodian checks in device
8. Inspection logged
9. Charging if needed
10. Score updated automatically

---

### 🧠 Architectural Strength This Adds

We now have:

- ✔ Multi-node asset custody control
- ✔ Accountability at each port/terminal
- ✔ Behaviour-shaping through scorecard
- ✔ Battery discipline enforcement
- ✔ Digital chain-of-custody
- ✔ Reduced device losses
- ✔ Reduced insurance disputes

**Most importantly**:

> **Every device now behaves like a regulated financial instrument — not just hardware.**

---

### 🎯 Strategic Outcome

The ecosystem becomes:
- **Performance ranked**
- **Insurance-aligned**
- **Operationally disciplined**
- **Transparent**

**And ContainerIQ becomes**:

> **The governance layer over Nigerian container logistics.**

---

## Technical Architecture

### System Components

1. **Frontend (React SPA)**
   - React 19 + Vite
   - Redux Toolkit + RTK Query
   - Tailwind CSS v4
   - React Router v7
   - Leaflet for maps

2. **Backend API**
   - Base URL: `https://api-containeriq.onrender.com/api`
   - RESTful architecture
   - JWT authentication
   - Role-based access control

3. **Telematics Integration**
   - GPS e-Lock hardware
   - Real-time tracking
   - Battery monitoring
   - Seal status
   - Tamper detection

4. **File Storage**
   - Cloudinary integration
   - Document management
   - Photo/evidence vault

5. **Notification System**
   - Email alerts
   - SMS notifications
   - WhatsApp integration (planned)
   - In-app notifications

---

## Compliance & Regulatory Framework

### Regulatory Bodies

1. **NIIRA** - Nigerian Insurance Industry Regulation Act 2025
2. **NAICOM** - National Insurance Commission
3. **NPA** - Nigerian Ports Authority
4. **NIMASA** - Nigerian Maritime Administration and Safety Agency
5. **FRSC** - Federal Road Safety Corps
6. **NCS** - Nigeria Customs Service

### Compliance Features

- Digital audit trails
- Immutable evidence vault
- Regulatory reporting dashboards
- SLA tracking
- Regulator visibility controls
- PAAR/NCS integration
- Export/import documentation

---

## Appendices

### A. Acronyms & Definitions

| Acronym | Full Form |
|---------|-----------|
| **CAC** | Corporate Affairs Commission |
| **ECOWAS** | Economic Community of West African States |
| **FMCG** | Fast-Moving Consumer Goods |
| **FRSC** | Federal Road Safety Corps |
| **HS Code** | Harmonized System Code |
| **ICD** | Inland Container Depot |
| **NAICOM** | National Insurance Commission |
| **NCS** | Nigeria Customs Service |
| **NIIRA** | Nigerian Insurance Industry Regulation Act |
| **NIMASA** | Nigerian Maritime Administration and Safety Agency |
| **NIN** | National Identification Number |
| **NPA** | Nigerian Ports Authority |
| **NXP** | Nigeria Export Proceeds |
| **PAAR** | Pre-Arrival Assessment Report |
| **SLA** | Service Level Agreement |
| **TIN** | Tax Identification Number |
| **TPA** | Third-Party Administrator |
| **TPL** | Third-Party Liability |
| **VIN** | Vehicle Identification Number |

### B. Container Types

- **20ft Standard** - 20-foot standard dry container
- **40ft Standard** - 40-foot standard dry container
- **40HC** - 40-foot high cube container
- **Reefer** - Refrigerated container
- **Tank** - Liquid cargo container
- **Open-top** - Open-top container
- **Flat-rack** - Flat-rack container for oversized cargo

### C. Truck Types

- **Skeletal** - Container chassis (skeleton)
- **Flatbed** - Flat platform truck
- **Tanker** - Liquid cargo truck
- **Lowbed** - Low-profile trailer for heavy equipment
- **Box / Dry Van** - Enclosed cargo box
- **Refrigerated (Reefer)** - Temperature-controlled truck
- **Curtainsider** - Side-curtain trailer
- **Tipper / Dump** - Tipping bed for bulk materials
- **Car Carrier** - Vehicle transport trailer

---

**End of Complete PRD Document**

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-15 | Product Team | Initial PRD |
| 2.0 | 2026-03-09 | Product Team | Merged with Device Lifecycle & Scorecard System |

---

**Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | | | |
| Technical Lead | | | |
| Compliance Officer | | | |

---
