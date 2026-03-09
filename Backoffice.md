This back-office device management system is the operational backbone of ContainerIQ.


Below is a complete end-to-end user story suite for the GPS e-Lock Lifecycle Management System run by Tsaron Tech — including assignment, reassignment, decommissioning, battery governance, liability, and scorecard impact across ecosystem players.



📦 CONTAINERIQ GPS E-LOCK LIFECYCLE


Product: Tsaron Tech Back-Office Device Management System



🎯 Epic: Secure, Accountable, and Scored GPS e-Lock Management



As Tsaron Tech,
We want to control the full lifecycle of every GPS e-Lock device

So that containers are securely tracked, devices are protected, batteries are responsibly managed, and ecosystem players are scored fairly.




🧩 Primary Actors

Tsaron Tech Back-Office Admin
Tsaron Tech Field Operator
Approved Third-Party Field Partner
Shipping Company
Terminal Operator
Fleet Operator
Shipper
Insurer (read-only visibility)





🟢 USER STORY 1: Device Assignment Before Container Trip



Title: Assign GPS e-Lock to Container

As a Tsaron Tech Field Operator,
I want to assign a specific GPS e-Lock device to a specific container and consignment

So that tracking, insurance validation, and chain-of-custody begin before the container leaves the controlled location.



Acceptance Criteria:
Device must be:
Marked “Available”
Battery ≥ 40%
Not flagged for maintenance

System records:
Device ID
Container number
Consignment ID
Location of assignment (Port / Terminal / ICD / Airport / Loading Bay)
Assigning personnel
Timestamp
Battery level at assignment
Device status changes to:
|| Assigned – In Transit
Chain-of-custody log begins.
Shipping company & fleet operator dashboards update automatically.




🟡 USER STORY 2: Battery Governance & Charging Discipline


Title: Battery Monitoring & Score Impact


As the ContainerIQ System,
I want to continuously monitor device battery levels

So that devices remain operational and ecosystem players are scored based on responsible handling.


Battery Rules:

Battery Level
System Action
Score Impact
≥ 40%
Normal
Positive
21%–39%
Warning issued
Neutral
≤ 20%
Critical alert
Negative score
Incident logged


0% (dead)
Major penalty





Behaviour Scoring Logic:

Shipping Companies & Terminal Operators
Responsible for:

Charging device if container dwell time > threshold
Ensuring no device is allowed to fall below 20%



Fleet Operators

Responsible during transit:

Avoid tampering
Report low battery alert immediately
Present container at destination without damage


Shippers

Responsible at:

Loading bay
Final warehouse offloading



🔵 USER STORY 3: Mid-Journey Reassignment (Exceptional Case)


Title: Device Reassignment


As Tsaron Tech Back-Office,
I want to reassign a device mid-journey if required

So that tracking continuity is maintained without disrupting insurance validity.


Triggers for Reassignment:

Battery failure
Hardware malfunction
Tamper detection
Emergency swap at terminal


Process:
Replacement device validated (≥ 40% battery)
Old device status changed to:
|| “Removed – Pending Inspection”
New device assigned
Full audit log maintained
Insurer notified automatically
Score impact determined based on reason






🔴 USER STORY 4: Device Decommissioning After Trip Completion


Title: Secure Device Removal & Return



As a Tsaron Tech Field Operator,
I want to remove and decommission the GPS e-Lock after trip completion

So that the device is returned safely into inventory for reuse.


Acceptance Criteria:
Container trip marked Completed
Device physically removed
Battery level recorded
Device inspected for:
Damage
Tamper marks
Seal integrity

Status changed to:
“Available” (if healthy)
“Maintenance Required”
“Damaged – Liability Review”
“Lost”
Custody transfer logged





⚖ USER STORY 5: Lost or Destroyed Device Handling


Title: Liability & Financial Accountability



As Tsaron Tech,
I want to automatically assign responsibility for lost or destroyed devices

So that ecosystem discipline is maintained.


If Device is:

Lost

Last custody holder identified
Incident report generated
Financial liability assigned
Score penalty applied


Destroyed

Inspection report logged
Damage classification:
Accidental
Negligent
Intentional

Escalation to insurer if needed








🔁 Full Lifecycle Flow (End-to-End: Tsaron Tech)

Consignment created
Device reserved in back office
Device assigned at origin
Battery ≥ 40% confirmed
Transit tracking begins
Continuous battery monitoring
Alerts issued if ≤ 20%
Arrival at destination
Device removed & inspected
Device:
Returned to inventory
Sent to maintenance
Flagged as damaged/lost

Score updated automatically
Billing & liability (if applicable) generated




🧠 Strategic Importance

This system:
Protects insurer confidence
Prevents device wastage
Creates behavioural discipline
Introduces measurable accountability
Strengthens ContainerIQ’s defensibility

Most importantly:
The GPS e-Lock becomes not just a tracking device — but a behaviour-shaping instrument across the logistics ecosystem.



________________________________



This is exactly the layer that makes ContainerIQ operationally defensible.
U

We are now introducing Distributed Custodian Inventory Control inside the ecosystem — which is powerful.


Below is a formal, standard user story suite for device inventory management by the four ultimate custodians (Tsaron Tech, 3rd party partner, shipping company, terminal operator), integrated with our 3-pillar scorecard system:

On-Time Performance
Compliance
Safety




📦 EPIC: Distributed GPS e-Lock Inventory Management


Epic Goal:
Ensure every ultimate custodian maintains accountable, real-time inventory control of GPS e-Lock devices before and after container trips.



👥 Ultimate Custodians (Inventory-Holding Accounts)


Tsaron Tech (Super Admin Custodian)
Approved Third-Party Partner (NEW – now treated as Organisation User)
Shipping Company
Terminal Operator


All four now have:

Inventory dashboard
Custody logs
Transfer controls
Battery monitoring visibility
Condition reporting capability
Score impact visibility




🟢 USER STORY 1: Custodian Device Inventory Dashboard


Title: View & Manage Assigned Device Inventory


As an Ultimate Custodian Organisation User
(Tsaron Tech, Third-Party Partner, Shipping Company, Terminal Operator),

I want to see and manage all GPS e-Lock devices currently under my custody

So that I can maintain accountability, readiness, and compliance before and after container trips.



Acceptance Criteria

Each custodian account must display:

A. Inventory Overview

Total devices under custody
Available devices
Assigned devices
Charging devices
Low-battery devices (<40%)
Critical battery devices (≤20%)
Devices pending inspection
Damaged devices


B. Device-Level Details

For each device:

Device ID
Current battery level
Last trip ID
Current status
Last custody transfer
Condition report
Maintenance history



C. Permitted Actions

Depending on role:


Action
Tsaron
3rd Party
Shipping Co
Terminal
Assign to container
✔
✔
✔
✔
Receive from prior custodian
✔
✔
✔
✔
Mark as charging
✔
✔
✔
✔
Mark damaged
✔
✔
✔
✔
Transfer custody
✔
✔
✔
✔
Decommission
✔
✔
✖
✖








Only Tsaron can permanently decommission. 






🟡 USER STORY 2: Custody Transfer Before Trip Begins


Title: Device Check-Out for Trip Start



As a Custodian User,
I want to formally assign and release a device into a container trip

So that chain-of-custody and battery readiness are validated before dispatch.


Preconditions

Device battery ≥ 40%
No damage flags
Device not under maintenance



System Records

Custodian releasing device
Receiving custodian (if applicable)
Container ID
Consignment ID
Battery level
Timestamp
Condition confirmation



Scorecard Impact (Trip Start)


Parameter
Scoring Logic
On-Time
Was device ready before dispatch window?
Compliance
Was battery ≥ 40% at release?
Safety
Was device physically inspected before release?











🔵 USER STORY 3: Device Check-In After Trip Ends


Title: Device Check-In & Post-Trip Inspection



As a Custodian User,
I want to formally receive and inspect the device at trip end

So that its condition and battery level are validated and logged.



Process

Receive device
Record battery %
Inspect for:
Tamper evidence
Seal integrity
Physical damage

Mark status:
Available
Charging Required
Damaged
Maintenance Required


Confirm custody




Scorecard Impact (Trip End)

Parameter
Scoring Logic
On-Time
Was device checked-in within defined time window?
Compliance
Was inspection completed properly?
Safety
Was damage correctly reported?


Failure to check in within SLA = On-Time penalty.







🔴 USER STORY 4: Battery Charging Discipline


Title: Responsible Battery Management




As a Custodian Organisation,
I want to manage charging discipline properly

So that devices remain operational and my compliance score remains strong.



Battery Governance Rule

Charge at 40%
Must NOT drop below 20%
Dead battery triggers incident



Scorecard Weighting per Custodian


1️⃣ Shipping Companies


On-Time (30%)

Device ready before vessel discharge or dispatch


Compliance (40%)

Charged before release
No unrecorded transfers



Safety (30%)

No avoidable damage
Proper seal handling




2️⃣ Terminal Operators

On-Time (40%)

Device processed within SLA after container arrival


Compliance (35%)

Accurate logging
Battery rule adherence



Safety (25%)

Secure storage
Zero mishandling incidents




3️⃣ Approved Third-Party Partners


On-Time (25%)

Rapid deployment & collection


Compliance (45%)

Accurate custody transfer
Correct reporting



Safety (30%)

Device protection in transit




4️⃣ Tsaron Tech (Internal Governance)


Internal KPI only (not public scorecard):


Inventory accuracy
Device turnaround time
Damage rate
Asset recovery rate




⚖ Fleet Operator Impact (Marginal)


Fleet operators:

Do NOT own inventory
But drivers handle devices during transit


Score Impact (Minor)

Compliance

Reporting law enforcement inspections properly


Safety

No tampering
No device damage during transit


Battery drop below 20% while in transit:
Shared penalty between:
Origin custodian
Fleet operator (if ignored alert)





🔁 Full Distributed Inventory Flow

Device in custodian inventory
Battery verified
Assigned to container
Transit begins
Battery monitored
Arrival
Receiving custodian checks in device
Inspection logged
Charging if needed
Score updated automatically





🧠 Architectural Strength This Adds



We now have:

✔ Multi-node asset custody control
✔ Accountability at each port/terminal
✔ Behaviour-shaping through scorecard
✔ Battery discipline enforcement
✔ Digital chain-of-custody
✔ Reduced device losses
✔ Reduced insurance disputes


Most importantly:

Every device now behaves like a regulated financial instrument — not just hardware.




🎯 Strategic Outcome


The ecosystem becomes:


Performance ranked
Insurance-aligned
Operationally disciplined
Transparent



And ContainerIQ becomes:


|| The governance layer over Nigerian container logistics.



________________________________


We’ll now formalize the complete, production-grade performance framework for ContainerIQ.


This will include:

✅ Exact mathematical scoring formula
✅ Monthly performance report template
✅ Rating bands (Gold / Silver / Watchlist / Restricted)
✅ Full ecosystem simulation (realistic Nigerian port scenario)


Everything will now reconcile cleanly.




1️⃣ THE MATHEMATICAL SCORING FORMULA


Step 1 — Pillar Scores (Per Month)



Each custodian starts each month with:


On-Time = 100
Compliance = 100
Safety = 100


Event deductions reduce the relevant pillar only.




Pillar Score Formula


Pillar Score = 100 – Σ(Event Deductions in that Pillar)
Minimum pillar score = 0
Maximum = 100




Step 2 — Weighted Composite Score


Each custodian has different pillar weights.



General Formula


Final Score = 
(On-Time × OT Weight) +
(Compliance × C Weight) +
(Safety × S Weight)

Where:

OT Weight + C Weight + S Weight = 1







2️⃣ EVENT DEDUCTION MATRIX (UNIFIED)


🔋 Battery Discipline (Compliance)

Event
Deduction
Released below 40%
−3
Dropped below 20%
−5
Battery died (0%)
−8
Failed to charge after alert
−6






⏱ On-Time Discipline


Event
Deduction
Late device release
−4
Late device check-in
−4
Late custody confirmation
−3






🛡 Safety Discipline


Event
Deduction
Minor physical damage
−5
Major damage
−10
Device lost
−15
Tamper detection
−8
Failed inspection logging
−5















3️⃣ CUSTODIAN WEIGHTING STRUCTURE (FINALIZED)



Shipping Company
On-Time: 30%
Compliance: 40%
Safety: 30%



Terminal Operator
On-Time: 40%
Compliance: 35%
Safety: 25%



Third-Party Partner
On-Time: 25%
Compliance: 45%
Safety: 30%



Fleet Operator (Marginal)
On-Time: 20%
Compliance: 40%
Safety: 40%

Only events during transit apply.







4️⃣ RATING BANDS (VISIBLE ON DASHBOARD)


Score Range
Rating
Status
90–100
🟢 Gold
Preferred Partner
80–89
🟢 Silver
Good Standing
70–79
🟡 Watchlist
Improvement Required
60–69
🟠 Probation
Limited Assignment
<60
🔴 Restricted
Assignment Suspension Risk













5️⃣ CONSEQUENCES MATRIX



🟢 Gold

Priority container assignment
Lower insurance loading
Public “Trusted Operator” badge


🟡 Watchlist

Automated advisory notice
Operational review call


🟠 Probation

Reduced device allocation
Insurance loading increase
Mandatory retraining


🔴 Restricted

Suspension from new assignments
Mandatory audit
Financial penalties for losses







6️⃣ MONTHLY PERFORMANCE REPORT TEMPLATE


📊 ContainerIQ Performance Report


Organisation: Terminal Operator XYZ

Month: March 2026

Summary Score



Pillar
Score
Weight
Weighted Contribution
On-Time
92
40%
36.8
Compliance
88
35%
30.8
Safety
95
25%
23.75
Final Score: 91.35 (Gold)





Event Breakdown

Battery Incidents:

1 device released at 35% (−3)

On-Time Incidents:
2 late check-ins (−8 total)

Safety Incidents:
None

Trend vs Previous Month

+3.2 improvement
Battery compliance improved 12%

Recommendations

Improve check-in timing within 2-hour SLA


7️⃣ REALISTIC SIMULATION — APAPA PORT SCENARIO


Let’s simulate one month.



Shipping Company A


Incidents:

3 releases at 35% battery (−9 Compliance)
1 battery drop below 20% (−5 Compliance)
1 late dispatch (−4 On-Time)




Pillar Scores:

Pillar
Score
On-Time
96
Compliance
86
Safety
100



Final Score:

(96×0.30) + (86×0.40) + (100×0.30)

= 28.8 + 34.4 + 30

= 93.2 → Gold






Terminal Operator B


Incidents:

3 late check-ins (−12 On-Time)
1 minor device damage (−5 Safety)
1 failed inspection log (−5 Safety)



Pillar Scores:


Pillar
Score
On-Time
88
Compliance
100
Safety
90



Final Score:

(88×0.40) + (100×0.35) + (90×0.25)

= 35.2 + 35 + 22.5

= 92.7 → Gold




Third-Party Partner C


Incidents:


2 unlogged custody transfers (−12 Compliance)
1 late deployment (−4 On-Time)
1 device damaged (−10 Safety)



Pillar Scores:


Pillar
Score
On-Time
96
Compliance
88
Safety
90




Final Score:

(96×0.25) + (88×0.45) + (90×0.30)

= 24 + 39.6 + 27

= 90.6 → Gold






Fleet Operator D


Incidents:

1 tamper detection (−8 Safety)
1 battery alert ignored (−6 Compliance)


Pillar Scores:



Pillar
Score
On-Time
100
Compliance
94
Safety
92




Final Score:

(100×0.20) + (94×0.40) + (92×0.40)

= 20 + 37.6 + 36.8

= 94.4 → Gold






8️⃣ STRATEGIC RESULT


This unified model now:


✔ Aligns discipline with measurable math
✔ Allows insurers to trust ratings
✔ Allows shippers to choose better operators
✔ Protects device assets
✔ Encourages battery responsibility
✔ Reduces device loss rate
✔ Prevents scoring confusion


Most importantly:


Every deduction now logically fits into one of the three pillars.






9️⃣ GOVERNANCE POLICY STATEMENT (FINAL FORM)



We can now formally state:


ContainerIQ evaluates ecosystem participants using a three-pillar performance framework (On-Time, Compliance, Safety). Operational incidents automatically deduct points within the relevant pillar, and the weighted composite score determines ecosystem standing and assignment privileges.


We now have a mathematically sound, regulator-defensible, insurer-aligned scoring engine.
