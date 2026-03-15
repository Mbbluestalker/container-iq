# ContainerIQ Backend Implementation Plan

**Version**: 1.0
**Date**: 2026-03-15
**Purpose**: Comprehensive backend API and integration requirements for all completed UI features

---

## Table of Contents

1. [Authentication & User Management](#1-authentication--user-management)
2. [Onboarding System](#2-onboarding-system)
3. [Fleet Management](#3-fleet-management)
4. [Shipment Management](#4-shipment-management)
5. [Insurance Management](#5-insurance-management)
6. [Device Lifecycle Management](#6-device-lifecycle-management)
7. [Real-Time Telematics](#7-real-time-telematics)
8. [Regulatory Reporting](#8-regulatory-reporting)
9. [Evidence Vault](#9-evidence-vault)
10. [Scorecard System](#10-scorecard-system)
11. [Route Management](#11-route-management)
12. [Notification System](#12-notification-system)
13. [Implementation Priority](#13-implementation-priority)

---

## 1. Authentication & User Management

### 1.1 User Registration & Login

**Endpoints Required:**

```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/logout
GET  /api/auth/me
```

**Signup Request:**
```json
{
  "step1": {
    "organizationName": "string",
    "userType": "fleet_operator | shipper | insurance_company | shipping_company | terminal_operator",
    "cacNumber": "string",
    "tinNumber": "string",
    "businessAddress": "string",
    "stateOfOperation": "string",
    "country": "string"
  },
  "step2": {
    "fullName": "string",
    "email": "string",
    "phoneNumber": "string",
    "idType": "NIN | BVN | International Passport | Driver's License",
    "idNumber": "string"
  },
  "step3": {
    "termsAccepted": true,
    "dataConsentAccepted": true,
    "digitalSignature": "string"
  }
}
```

**Login Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "string",
      "fullName": "string",
      "organizationName": "string",
      "userType": "string",
      "onboardingCompleted": false,
      "profilePhotoUrl": "string"
    },
    "tokens": {
      "accessToken": "jwt_string",
      "refreshToken": "jwt_string"
    }
  }
}
```

**Requirements:**
- JWT-based authentication with refresh tokens
- Password hashing with bcrypt (min 10 rounds)
- Email verification (optional for MVP, required for production)
- Rate limiting: 5 failed login attempts = 15-minute lockout
- Store user sessions in Redis for quick validation

---

## 2. Onboarding System

### 2.1 Role-Specific Onboarding APIs

**Endpoints Required:**

```
POST /api/onboarding/insurance
POST /api/onboarding/shipper
POST /api/onboarding/fleet
POST /api/onboarding/shipping-company
POST /api/onboarding/terminal-operator
GET  /api/onboarding/status/:userId
PATCH /api/onboarding/update/:userId
```

### 2.2 Insurance Company Onboarding

**Request (4 steps):**
```json
{
  "step1": {
    "insuranceLicenseNumber": "string",
    "insuranceClasses": ["Marine", "Motor", "General"],
    "yearsInOperation": "number"
  },
  "step2": {
    "reinsurancePartners": ["partner1", "partner2"],
    "coverageGeography": {
      "ports": ["Apapa", "Tin Can Island"],
      "corridors": ["Lagos-Ibadan", "Port Harcourt-Aba"]
    }
  },
  "step3": {
    "policyTypesIssued": ["Comprehensive", "Third Party"],
    "claimsProcessingModel": "In-house | TPA"
  },
  "step4": {
    "telematicsConsent": true,
    "apiIntegrationMode": "Read Only | Read & Write",
    "documents": {
      "licenseUrl": "string",
      "certificateUrl": "string"
    }
  }
}
```

### 2.3 Shipper Onboarding

**Request (4 steps):**
```json
{
  "step1": {
    "businessClassification": "Importer | Exporter | Both",
    "productCategories": "string (HS Codes)",
    "averageMonthlyContainers": "number"
  },
  "step2": {
    "primaryPorts": ["Apapa", "Tin Can Island"],
    "cargoInsuranceProvider": "string (optional)",
    "preferredInsuranceMode": "Annual | Per-Shipment"
  },
  "step3": {
    "telematicsConsent": true,
    "dataConsentAccepted": true
  },
  "step4": {
    "documents": {
      "cacUrl": "string",
      "paarUrl": "string",
      "ncsLicenseUrl": "string"
    }
  }
}
```

### 2.4 Fleet Operator Onboarding

**Request (3 steps):**
```json
{
  "step1": {
    "numberOfVehicles": "number",
    "numberOfDrivers": "number",
    "operatingRoutes": ["Lagos-Ibadan", "Port Harcourt-Aba"],
    "frscComplianceStatus": "Compliant | Partially Compliant | Non-Compliant",
    "vehicleInsuranceProviders": ["provider1", "provider2"]
  },
  "step2": {
    "gpsInstalled": true,
    "eLockInstalled": true,
    "willingToInstallDevices": true
  },
  "step3": {
    "documents": {
      "cacUrl": "string",
      "operatingLicenseUrl": "string",
      "frscCertificateUrl": "string"
    }
  }
}
```

**Requirements:**
- Mark `onboardingCompleted: true` after successful submission
- Send welcome email with next steps
- Auto-redirect to dashboard after onboarding completion
- Store document URLs in cloud storage (AWS S3 / Azure Blob)

---

## 3. Fleet Management

### 3.1 Driver Management APIs

**Endpoints Required:**

```
GET    /api/fleet/drivers?page=1&limit=20&search=query&status=active
POST   /api/fleet/drivers
GET    /api/fleet/drivers/:id
PATCH  /api/fleet/drivers/:id
DELETE /api/fleet/drivers/:id
POST   /api/fleet/drivers/bulk-upload
GET    /api/fleet/drivers/download-template
```

**Create Driver Request:**
```json
{
  "personalInfo": {
    "fullName": "string",
    "dateOfBirth": "YYYY-MM-DD",
    "phoneNumber": "string",
    "email": "string",
    "residentialAddress": "string",
    "stateOfOrigin": "string",
    "lga": "string"
  },
  "governmentId": {
    "nin": "string",
    "driversLicenseNumber": "string",
    "licenseClass": "A | B | C | D | E",
    "licenseIssueDate": "YYYY-MM-DD",
    "licenseExpiryDate": "YYYY-MM-DD"
  },
  "employment": {
    "employmentType": "Permanent | Contract | Casual",
    "employeeId": "string",
    "dateEngaged": "YYYY-MM-DD",
    "depot": "string"
  },
  "competency": {
    "yearsOfExperience": "number",
    "trainingCertificates": ["Defensive Driving", "Hazmat"],
    "dangerousGoodsLicense": "string (optional)"
  },
  "compliance": {
    "medicalFitness": true,
    "backgroundCheck": true,
    "noConviction": true
  },
  "verificationStatus": "Pending | Verified | Rejected",
  "telematics": {
    "assignedDeviceId": "string (optional)",
    "driverAppInstalled": true,
    "behaviorMonitoringConsent": true
  },
  "documents": {
    "licenseUrl": "string",
    "idCardUrl": "string",
    "certificatesUrls": ["url1", "url2"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "fullName": "string",
    "driversLicenseNumber": "string",
    "phoneNumber": "string",
    "status": "Active",
    "verificationStatus": "Verified",
    "createdAt": "timestamp"
  }
}
```

### 3.2 Vehicle Management APIs

**Endpoints Required:**

```
GET    /api/fleet/vehicles?page=1&limit=20&search=query&status=active
POST   /api/fleet/vehicles
GET    /api/fleet/vehicles/:id
PATCH  /api/fleet/vehicles/:id
DELETE /api/fleet/vehicles/:id
POST   /api/fleet/vehicles/bulk-upload
GET    /api/fleet/vehicles/download-template
```

**Create Vehicle Request:**
```json
{
  "identification": {
    "registrationNumber": "string",
    "vin": "string",
    "engineNumber": "string",
    "make": "string",
    "model": "string",
    "year": "number",
    "color": "string"
  },
  "truckType": {
    "type": "Flatbed | Container Chassis | Tanker | Box Truck",
    "axleConfiguration": "4x2 | 6x4",
    "loadCapacity": "number (tons)",
    "containerCompatibility": ["20ft", "40ft"]
  },
  "ownership": {
    "ownershipType": "Owned | Leased",
    "ownerName": "string"
  },
  "regulatory": {
    "roadworthinessExpiry": "YYYY-MM-DD",
    "vehicleInsuranceExpiry": "YYYY-MM-DD",
    "hackneyPermitExpiry": "YYYY-MM-DD"
  },
  "safety": {
    "firstAidKit": true,
    "fireExtinguisher": true,
    "speedLimiter": true
  },
  "telematics": {
    "gpsDeviceId": "string",
    "eLockInstalled": true,
    "panicButton": true,
    "geofencingEnabled": true
  },
  "operational": {
    "baseLocation": "string",
    "operatingRegions": ["Lagos", "Ogun"],
    "status": "Available | In Transit | Under Maintenance | Out of Service"
  },
  "documents": {
    "registrationUrl": "string",
    "roadworthinessUrl": "string",
    "insuranceUrl": "string",
    "telematicsProofUrl": "string (optional)"
  }
}
```

### 3.3 Shipment Requests Management

**Endpoints Required:**

```
GET   /api/fleet/shipment-requests?status=pending&page=1&limit=20
GET   /api/fleet/shipment-requests/:id
PATCH /api/fleet/shipment-requests/:id/accept
PATCH /api/fleet/shipment-requests/:id/modify
PATCH /api/fleet/shipment-requests/:id/decline
```

**Accept Request:**
```json
{
  "assignedDriverId": "uuid",
  "assignedVehicleId": "uuid",
  "proposedPickupDate": "YYYY-MM-DD HH:mm",
  "estimatedDeliveryDate": "YYYY-MM-DD HH:mm",
  "notes": "string (optional)"
}
```

**Modify Request:**
```json
{
  "proposedRate": "number",
  "proposedPickupDate": "YYYY-MM-DD HH:mm",
  "proposedDeliveryDate": "YYYY-MM-DD HH:mm",
  "modificationReason": "string",
  "counterOfferNotes": "string"
}
```

### 3.4 Active Trips

**Endpoints Required:**

```
GET /api/fleet/trips?status=active&page=1&limit=20
GET /api/fleet/trips/:id
PATCH /api/fleet/trips/:id/update-status
```

**Requirements:**
- Soft delete for drivers/vehicles (mark as inactive instead of deleting)
- Validate driver license expiry dates
- Validate vehicle insurance and roadworthiness expiry dates
- Send alerts 30 days before document expiry
- Bulk upload: accept CSV/Excel, validate, return error report

---

## 4. Shipment Management

### 4.1 Shipment Creation Flow (10-Step Wizard)

**Endpoints Required:**

```
POST /api/shipments/create
GET  /api/shipments/:id
GET  /api/shipments?status=all&page=1&limit=20
PATCH /api/shipments/:id/update
DELETE /api/shipments/:id
```

**Shipment Creation Request (All 10 Steps):**
```json
{
  "step1_shipperDetails": {
    "fullName": "string",
    "email": "string",
    "phoneNumber": "string",
    "companyName": "string",
    "address": "string"
  },
  "step2_cargoDetails": {
    "cargoType": "string",
    "hsCode": "string",
    "cargoValue": "number",
    "currency": "NGN | USD",
    "cargoWeight": "number",
    "cargoDescription": "string",
    "packagingType": "Pallets | Boxes | Bulk",
    "specialHandlingRequired": false,
    "hazardousMaterial": false
  },
  "step3_containerSelection": {
    "containerType": "20ft | 40ft | 40ft HC | 20ft Reefer | 40ft Reefer",
    "containerNumber": "string",
    "sealNumber": "string",
    "containerCondition": "Excellent | Good | Fair",
    "containerOwner": "Shipper | Shipping Line",
    "detentionAllowance": "number (days)"
  },
  "step4_routeSelection": {
    "routeId": "uuid",
    "origin": "string",
    "destination": "string",
    "estimatedDistance": "number (km)",
    "estimatedDuration": "number (hours)",
    "approvedCorridors": ["corridor1", "corridor2"]
  },
  "step5_fleetSelection": {
    "selectionMode": "Auto Queue | Preferred Fleet | Leaderboard | Truck Type",
    "fleetOperatorId": "uuid",
    "preferredFleetReason": "string (optional)"
  },
  "step6_insuranceSelection": {
    "insuranceMode": "Auto Queue | Preferred Provider | Browse All",
    "insuranceProviderId": "uuid",
    "coverageType": "Comprehensive | Third Party | All Risks",
    "premiumAmount": "number",
    "sumInsured": "number",
    "deductible": "number"
  },
  "step7_tripSchedule": {
    "preferredPickupDate": "YYYY-MM-DD",
    "preferredPickupTime": "HH:mm",
    "preferredDeliveryDate": "YYYY-MM-DD",
    "deliveryDeadline": "YYYY-MM-DD HH:mm",
    "urgency": "Normal | Urgent | Critical"
  },
  "step8_additionalRequirements": {
    "requiresEscort": false,
    "daytimeOnlyMovement": false,
    "requiresRefrigeration": false,
    "temperatureRange": "string (optional)",
    "parkingRestrictions": "string (optional)",
    "specialInstructions": "string (optional)"
  },
  "step9_documentUpload": {
    "billOfLadingUrl": "string",
    "packingListUrl": "string",
    "invoiceUrl": "string",
    "customsDocumentsUrls": ["url1", "url2"],
    "otherDocumentsUrls": ["url1", "url2"]
  },
  "step10_reviewAndSubmit": {
    "agreedToTerms": true,
    "paymentMethod": "Card | Bank Transfer | Wallet | Pay on Delivery",
    "totalAmount": "number",
    "paymentStatus": "Pending | Paid | Failed"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "shipmentId": "SHP-2024-001",
    "status": "Pending Acceptance",
    "consignmentReference": "CNS-2024-001",
    "totalAmount": 150000,
    "insurancePremium": 25000,
    "transportCost": 125000,
    "estimatedPickupDate": "2024-03-20",
    "estimatedDeliveryDate": "2024-03-21",
    "createdAt": "timestamp"
  }
}
```

### 4.2 Shipment Tracking

**Endpoints Required:**

```
GET /api/shipments/:id/track
GET /api/shipments/:id/timeline
GET /api/shipments/:id/location
```

**Track Response:**
```json
{
  "success": true,
  "data": {
    "shipmentId": "SHP-2024-001",
    "status": "In Transit",
    "currentLocation": {
      "address": "Ojota, Lagos",
      "latitude": 6.5775,
      "longitude": 3.3670,
      "lastUpdated": "timestamp"
    },
    "progress": 65,
    "eta": "2 hours 15 mins",
    "driver": {
      "name": "John Doe",
      "phone": "08012345678"
    },
    "vehicle": {
      "truckNumber": "ABC-123-XY",
      "make": "Mack",
      "model": "Granite"
    },
    "deviceStatus": {
      "gpsActive": true,
      "batteryLevel": 85,
      "sealStatus": "Intact",
      "lastPing": "5 mins ago"
    }
  }
}
```

### 4.3 Payment Integration

**Endpoints Required:**

```
POST /api/payments/initialize
POST /api/payments/verify
GET  /api/payments/:transactionId/status
POST /api/payments/card
POST /api/payments/bank-transfer
POST /api/payments/wallet
```

**Payment Initialize Request:**
```json
{
  "shipmentId": "uuid",
  "amount": "number",
  "paymentMethod": "card | bank_transfer | wallet | pay_on_delivery",
  "currency": "NGN",
  "email": "string",
  "callbackUrl": "string"
}
```

**Requirements:**
- Integrate Paystack or Flutterwave for card payments
- Generate virtual account numbers for bank transfers
- Implement wallet system with top-up functionality
- Send payment receipts via email
- Store payment records with transaction references

---

## 5. Insurance Management

### 5.1 Insured Containers Dashboard

**Endpoints Required:**

```
GET /api/insurance/containers?status=active&page=1&limit=20
GET /api/insurance/containers/:containerId
GET /api/insurance/containers/:containerId/risk-score
GET /api/insurance/containers/:containerId/events
```

**Container Detail Response:**
```json
{
  "success": true,
  "data": {
    "containerId": "CONT-123",
    "containerNumber": "ABCD1234567",
    "shipment": {
      "shipmentId": "SHP-2024-001",
      "shipper": "ABC Company",
      "origin": "Apapa Port",
      "destination": "Ikeja Warehouse"
    },
    "insurance": {
      "policyNumber": "POL-2024-001",
      "coverageType": "Comprehensive",
      "sumInsured": 5000000,
      "premium": 250000,
      "startDate": "2024-03-15",
      "endDate": "2024-03-16"
    },
    "riskScore": {
      "overall": 72,
      "factors": [
        { "factor": "Route risk", "impact": "Low risk corridor", "score": 15 },
        { "factor": "GPS tracking active", "impact": "Reduces risk", "score": 15 },
        { "factor": "Driver experience", "impact": "5+ years", "score": 20 }
      ]
    },
    "currentStatus": "In Transit",
    "deviceData": {
      "deviceId": "DEV-003",
      "gpsActive": true,
      "batteryLevel": 85,
      "sealStatus": "Intact",
      "location": {
        "latitude": 6.5775,
        "longitude": 3.3670,
        "address": "Ojota, Lagos"
      }
    }
  }
}
```

### 5.2 Claims Management

**Endpoints Required:**

```
GET  /api/insurance/claims?status=all&page=1&limit=20
GET  /api/insurance/claims/:claimId
POST /api/insurance/claims/:claimId/approve
POST /api/insurance/claims/:claimId/reject
POST /api/insurance/claims/:claimId/request-info
PATCH /api/insurance/claims/:claimId/update-status
```

**Process Claim Request:**
```json
{
  "claimId": "uuid",
  "action": "approve | reject | request_more_info",
  "approvedAmount": "number (if approved)",
  "rejectionReason": "string (if rejected)",
  "additionalInfoRequired": "string (if requesting more info)",
  "adjustersNotes": "string",
  "evidenceReviewed": ["evidence1", "evidence2"],
  "settlementMethod": "Bank Transfer | Cheque",
  "processorId": "uuid"
}
```

**Requirements:**
- Auto-calculate risk scores based on route, driver, vehicle, device data
- Update risk scores in real-time when telemetry changes
- Send email notifications to insurers when claims are filed
- Auto-attach telematics evidence to claims

---

## 6. Device Lifecycle Management

### 6.1 Device Assignment & Monitoring

**Endpoints Required:**

```
GET   /api/devices?status=all&page=1&limit=20
POST  /api/devices/assign
POST  /api/devices/unassign
GET   /api/devices/:deviceId
PATCH /api/devices/:deviceId/update
GET   /api/devices/:deviceId/battery-status
GET   /api/devices/:deviceId/custody-history
POST  /api/devices/:deviceId/custody-transfer
POST  /api/devices/:deviceId/inspection
```

### 6.2 Device Assignment Request

**Request:**
```json
{
  "deviceId": "uuid",
  "containerId": "uuid",
  "shipmentId": "uuid",
  "assignedBy": "uuid (user_id)",
  "assignmentDate": "YYYY-MM-DD HH:mm",
  "expectedReturnDate": "YYYY-MM-DD",
  "assignmentNotes": "string (optional)"
}
```

**Pre-Assignment Validation:**
- Battery level must be ≥ 40%
- Device status must be "Available"
- Device must pass diagnostic check
- Container must not already have assigned device

**Response:**
```json
{
  "success": true,
  "data": {
    "assignmentId": "uuid",
    "deviceId": "DEV-2024-003",
    "containerId": "CONT-123",
    "status": "Assigned",
    "batteryLevel": 87,
    "assignedAt": "timestamp"
  }
}
```

### 6.3 Battery Monitoring

**Endpoint:**
```
GET /api/devices/battery-monitor?threshold=40
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalDevices": 50,
    "critical": [
      {
        "deviceId": "DEV-001",
        "batteryLevel": 15,
        "status": "In Transit",
        "shipmentId": "SHP-2024-001",
        "lastPing": "2 mins ago",
        "alert": "Critical - Immediate charging required"
      }
    ],
    "low": [
      {
        "deviceId": "DEV-002",
        "batteryLevel": 35,
        "status": "Available",
        "lastCharged": "2024-03-10",
        "alert": "Low - Charge before next assignment"
      }
    ],
    "healthy": []
  }
}
```

**Requirements:**
- Monitor battery levels in real-time (update every 30 seconds when active)
- Send alerts when battery < 40%
- Send critical alerts when battery < 20%
- Block device assignment if battery < 40%
- Track battery charge cycles and degradation

### 6.4 Custody Transfer

**Request:**
```json
{
  "deviceId": "uuid",
  "fromCustodian": "uuid (organization_id)",
  "toCustodian": "uuid (organization_id)",
  "transferReason": "Trip Assignment | Return from Trip | Maintenance | Relocation",
  "transferredBy": "uuid (user_id)",
  "receivedBy": "uuid (user_id)",
  "transferDate": "YYYY-MM-DD HH:mm",
  "deviceCondition": "Excellent | Good | Fair | Poor",
  "notes": "string (optional)"
}
```

### 6.5 Device Inspection

**Request:**
```json
{
  "deviceId": "uuid",
  "inspectionType": "Pre-Trip | Post-Trip | Routine Maintenance",
  "inspectedBy": "uuid (user_id)",
  "inspectionDate": "YYYY-MM-DD HH:mm",
  "batteryCondition": "Excellent | Good | Fair | Poor",
  "sealCondition": "Intact | Damaged",
  "gpsSignal": "Strong | Moderate | Weak | None",
  "physicalCondition": "Excellent | Good | Fair | Poor | Damaged",
  "issuesFound": ["Issue 1", "Issue 2"],
  "actionTaken": "Cleaned | Charged | Repaired | Replaced | No Action",
  "nextInspectionDate": "YYYY-MM-DD",
  "recommendation": "Return to Service | Send for Repair | Decommission",
  "inspectionNotes": "string"
}
```

**Requirements:**
- Maintain complete custody chain log (immutable)
- Track device condition degradation over time
- Auto-calculate device health score based on inspection history
- Flag devices for maintenance after N trips
- Send alerts for overdue inspections

---

## 7. Real-Time Telematics

### 7.1 WebSocket Connection for Real-Time Updates

**WebSocket Endpoint:**
```
ws://api.containeriq.com/ws/telematics
```

**Authentication:**
```json
{
  "type": "auth",
  "token": "jwt_token"
}
```

**Client Subscription:**
```json
{
  "type": "subscribe",
  "channels": [
    "device:DEV-001",
    "shipment:SHP-2024-001",
    "fleet:fleet_operator_id"
  ]
}
```

### 7.2 Real-Time Device Data Events

**Server → Client Events:**

**1. GPS Position Update:**
```json
{
  "type": "gps_update",
  "deviceId": "DEV-001",
  "shipmentId": "SHP-2024-001",
  "timestamp": "ISO8601",
  "data": {
    "latitude": 6.5775,
    "longitude": 3.3670,
    "altitude": 45.5,
    "speed": 65,
    "heading": 135,
    "accuracy": 5,
    "address": "Ojota, Lagos"
  }
}
```

**2. Battery Status Update:**
```json
{
  "type": "battery_update",
  "deviceId": "DEV-001",
  "timestamp": "ISO8601",
  "data": {
    "batteryLevel": 72,
    "voltage": 3.8,
    "charging": false,
    "temperature": 28,
    "estimatedHoursRemaining": 48,
    "alert": null
  }
}
```

**3. Seal Status Update:**
```json
{
  "type": "seal_update",
  "deviceId": "DEV-001",
  "shipmentId": "SHP-2024-001",
  "timestamp": "ISO8601",
  "data": {
    "sealStatus": "Intact | Breached",
    "sealNumber": "SEAL-12345",
    "tamperDetected": false,
    "lastVerified": "ISO8601"
  }
}
```

**4. Geofence Alert:**
```json
{
  "type": "geofence_alert",
  "deviceId": "DEV-001",
  "shipmentId": "SHP-2024-001",
  "timestamp": "ISO8601",
  "data": {
    "alertType": "route_deviation | extended_stop | unauthorized_zone",
    "severity": "critical | high | medium | low",
    "location": {
      "latitude": 6.5775,
      "longitude": 3.3670,
      "address": "Ojota, Lagos"
    },
    "details": {
      "deviationDistance": 2.3,
      "stopDuration": 45,
      "approvedCorridor": "Lagos-Ibadan Expressway"
    },
    "autoNotified": ["fleet_operator", "shipper", "insurance_company"]
  }
}
```

**5. Device Heartbeat:**
```json
{
  "type": "device_heartbeat",
  "deviceId": "DEV-001",
  "timestamp": "ISO8601",
  "data": {
    "online": true,
    "gpsSignalStrength": 85,
    "networkType": "4G LTE",
    "firmwareVersion": "2.4.1",
    "uptime": 86400
  }
}
```

### 7.3 REST API Endpoints for Telematics

**Endpoints Required:**

```
GET /api/telematics/devices/active
GET /api/telematics/devices/:deviceId/current-status
GET /api/telematics/devices/:deviceId/history?from=timestamp&to=timestamp
GET /api/telematics/shipments/:shipmentId/route-replay
GET /api/telematics/alerts?severity=all&status=active
GET /api/telematics/geofence/check
POST /api/telematics/geofence/routes/:routeId
```

**Current Status Response:**
```json
{
  "success": true,
  "data": {
    "deviceId": "DEV-001",
    "shipmentId": "SHP-2024-001",
    "status": "Active",
    "lastUpdate": "ISO8601",
    "gps": {
      "latitude": 6.5775,
      "longitude": 3.3670,
      "speed": 65,
      "heading": 135,
      "accuracy": 5,
      "signalStrength": 85
    },
    "battery": {
      "level": 72,
      "charging": false,
      "hoursRemaining": 48
    },
    "seal": {
      "status": "Intact",
      "lastVerified": "ISO8601"
    },
    "environmental": {
      "temperature": 24,
      "humidity": 60
    },
    "network": {
      "type": "4G LTE",
      "signalStrength": 90
    }
  }
}
```

### 7.4 Geofence Management

**Create Geofence for Route:**
```json
{
  "routeId": "uuid",
  "corridorWidth": 500,
  "checkpoints": [
    {
      "name": "Checkpoint 1",
      "latitude": 6.4698,
      "longitude": 3.3845,
      "radius": 100
    }
  ],
  "restrictedZones": [
    {
      "name": "High Risk Area",
      "polygon": [
        { "lat": 6.5, "lng": 3.3 },
        { "lat": 6.6, "lng": 3.4 }
      ]
    }
  ],
  "maxDeviationAllowed": 1000,
  "maxStopDuration": 30
}
```

**Requirements:**
- GPS updates every 30 seconds when shipment is active
- Battery monitoring every 5 seconds
- Seal status verification every 60 seconds
- Store all telemetry data for 90 days (hot storage), 2 years (cold storage)
- Implement geofencing with 500m default corridor width
- Auto-alert on route deviation > 1km
- Auto-alert on extended stop > 30 minutes
- Calculate ETA dynamically based on speed and distance
- Support route replay for completed trips

---

## 8. Regulatory Reporting

### 8.1 Report Generation APIs

**Endpoints Required:**

```
GET  /api/regulatory/reports?agency=all&status=all&page=1
POST /api/regulatory/reports/generate
GET  /api/regulatory/reports/:reportId
GET  /api/regulatory/reports/:reportId/download
PATCH /api/regulatory/reports/:reportId/submit
DELETE /api/regulatory/reports/:reportId
GET  /api/regulatory/reports/templates/:agency
```

### 8.2 NPA (Nigerian Ports Authority) Reports

**Generate Report Request:**
```json
{
  "reportType": "container_movement | terminal_activity | dwell_time",
  "agency": "NPA",
  "reportingPeriod": {
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD"
  },
  "filters": {
    "port": "Apapa | Tin Can Island | Port Harcourt",
    "terminal": "string (optional)",
    "containerType": "20ft | 40ft | All"
  }
}
```

**Container Movement Report Response:**
```json
{
  "success": true,
  "data": {
    "reportId": "RPT-NPA-001",
    "reportType": "Container Movement Report",
    "agency": "NPA",
    "generatedAt": "ISO8601",
    "period": {
      "from": "2024-03-01",
      "to": "2024-03-15"
    },
    "summary": {
      "totalContainers": 1250,
      "importContainers": 800,
      "exportContainers": 450,
      "averageDwellTime": 7.5
    },
    "movements": [
      {
        "containerNumber": "ABCD1234567",
        "type": "Import",
        "port": "Apapa",
        "gateInDate": "2024-03-10 08:30",
        "gateOutDate": "2024-03-12 14:20",
        "dwellTime": 2.25,
        "destination": "Ikeja Warehouse",
        "transporter": "ABC Transport Ltd"
      }
    ],
    "downloadUrl": "string"
  }
}
```

### 8.3 NIMASA (Maritime Safety) Reports

**Generate Report Request:**
```json
{
  "reportType": "vessel_manifest | cargo_safety | maritime_security",
  "agency": "NIMASA",
  "reportingPeriod": {
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD"
  },
  "filters": {
    "vesselName": "string (optional)",
    "shippingLine": "string (optional)",
    "cargoType": "General | Hazardous | All"
  }
}
```

### 8.4 FRSC (Road Safety) Reports

**Generate Report Request:**
```json
{
  "reportType": "driver_verification | vehicle_roadworthiness | fleet_inspection",
  "agency": "FRSC",
  "reportingPeriod": {
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD"
  },
  "filters": {
    "fleetOperator": "uuid (optional)",
    "complianceStatus": "Compliant | Non-Compliant | All"
  }
}
```

**Driver Verification Report Response:**
```json
{
  "success": true,
  "data": {
    "reportId": "RPT-FRSC-001",
    "reportType": "Driver Verification Report",
    "generatedAt": "ISO8601",
    "period": {
      "from": "2024-03-01",
      "to": "2024-03-15"
    },
    "summary": {
      "totalDrivers": 450,
      "verifiedDrivers": 420,
      "expiredLicenses": 30,
      "complianceRate": 93.33
    },
    "drivers": [
      {
        "fullName": "John Doe",
        "driversLicense": "ABC123456",
        "licenseExpiry": "2025-06-30",
        "fleetOperator": "XYZ Logistics",
        "verificationStatus": "Verified",
        "lastInspection": "2024-02-15"
      }
    ]
  }
}
```

### 8.5 NCS (Nigeria Customs Service) Reports

**Generate Report Request:**
```json
{
  "reportType": "paar_validation | export_declaration | import_clearance",
  "agency": "NCS",
  "reportingPeriod": {
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD"
  },
  "filters": {
    "customsPort": "Apapa | Tin Can Island | All",
    "declarationType": "Import | Export | All"
  }
}
```

**Requirements:**
- Auto-generate reports on schedule (daily, weekly, monthly)
- Support PDF and Excel export formats
- Store generated reports for 5 years
- Auto-submit reports to regulatory portals via API integration
- Email reports to designated compliance officers
- Track submission status (Draft, Submitted, Approved, Rejected)
- Support report templates for each agency
- Validate data completeness before report generation

---

## 9. Evidence Vault

### 9.1 Immutable Event Logs

**Endpoints Required:**

```
GET  /api/evidence/events?page=1&limit=20&severity=all&type=all
GET  /api/evidence/events/:eventId
POST /api/evidence/events/verify-hash
GET  /api/evidence/events/:eventId/evidence
POST /api/evidence/events/:eventId/download
```

**Event Log Entry:**
```json
{
  "id": "EVT-001",
  "timestamp": "ISO8601",
  "eventType": "Tamper Detection | Seal Breach | Route Deviation | Extended Stop | Device Malfunction",
  "severity": "Critical | High | Medium | Low",
  "shipmentId": "SHP-2024-001",
  "containerId": "CONT-123",
  "deviceId": "DEV-003",
  "location": {
    "latitude": 6.5775,
    "longitude": 3.3670,
    "address": "Ojota, Lagos"
  },
  "description": "Unauthorized seal breach detected",
  "evidenceFiles": [
    {
      "fileId": "EV-001",
      "fileType": "photo",
      "fileUrl": "string",
      "hash": "sha256_hash",
      "capturedAt": "ISO8601"
    }
  ],
  "hash": "sha256_hash_of_entire_event",
  "blockchainTxHash": "string",
  "immutable": true,
  "verificationStatus": "Verified | Pending | Failed"
}
```

### 9.2 Document Storage

**Endpoints Required:**

```
GET  /api/evidence/documents?category=all&page=1&limit=20
POST /api/evidence/documents/upload
GET  /api/evidence/documents/:documentId
POST /api/evidence/documents/:documentId/verify-hash
DELETE /api/evidence/documents/:documentId
GET  /api/evidence/documents/:documentId/download
```

**Upload Document Request:**
```json
{
  "file": "multipart/form-data",
  "category": "Shipping Documents | Insurance | Customs | Compliance | Claims",
  "documentType": "Bill of Lading | Packing List | Invoice | Policy | Permit",
  "shipmentId": "uuid (optional)",
  "containerId": "uuid (optional)",
  "uploadedBy": "uuid",
  "encryptionEnabled": true,
  "metadata": {
    "documentNumber": "string",
    "issueDate": "YYYY-MM-DD",
    "expiryDate": "YYYY-MM-DD (optional)",
    "issuer": "string"
  }
}
```

**Document Response:**
```json
{
  "success": true,
  "data": {
    "documentId": "DOC-001",
    "fileName": "bill_of_lading.pdf",
    "fileType": "PDF",
    "fileSize": 1024000,
    "category": "Shipping Documents",
    "uploadedBy": "John Doe",
    "uploadedAt": "ISO8601",
    "hash": "sha256_hash",
    "encrypted": true,
    "downloadUrl": "string",
    "metadata": {
      "container": "CONT-123",
      "shipment": "SHP-2024-001",
      "documentNumber": "BOL-2024-001"
    }
  }
}
```

### 9.3 Photo & Video Evidence

**Endpoints Required:**

```
GET  /api/evidence/media?type=all&page=1&limit=20
POST /api/evidence/media/upload
GET  /api/evidence/media/:mediaId
POST /api/evidence/media/:mediaId/verify-hash
DELETE /api/evidence/media/:mediaId
```

**Auto-Captured Media Entry:**
```json
{
  "mediaId": "MED-001",
  "mediaType": "photo | video",
  "captureSource": "GPS e-Lock | Manual Upload",
  "captureEvent": "Seal Activation | Tamper Detection | Checkpoint | Delivery",
  "shipmentId": "uuid",
  "containerId": "uuid",
  "deviceId": "uuid",
  "capturedAt": "ISO8601",
  "location": {
    "latitude": 6.5775,
    "longitude": 3.3670,
    "address": "Ojota, Lagos"
  },
  "fileSize": 2048000,
  "hash": "sha256_hash",
  "thumbnailUrl": "string",
  "fullResolutionUrl": "string",
  "metadata": {
    "resolution": "1920x1080",
    "duration": 30,
    "format": "MP4 | JPG"
  }
}
```

### 9.4 Blockchain Verification

**Endpoints Required:**

```
POST /api/evidence/blockchain/anchor
POST /api/evidence/blockchain/verify
GET  /api/evidence/blockchain/status
GET  /api/evidence/blockchain/certificate/:evidenceId
```

**Anchor Evidence Request:**
```json
{
  "evidenceType": "event | document | media",
  "evidenceId": "uuid",
  "hash": "sha256_hash",
  "metadata": {
    "timestamp": "ISO8601",
    "type": "string",
    "relatedEntities": ["shipment:123", "container:456"]
  }
}
```

**Blockchain Anchor Response:**
```json
{
  "success": true,
  "data": {
    "evidenceId": "uuid",
    "hash": "sha256_hash",
    "blockchain": "Ethereum Mainnet | Polygon",
    "transactionHash": "0x1234567890abcdef",
    "blockNumber": 18234567,
    "blockTimestamp": "ISO8601",
    "confirmations": 12,
    "verificationUrl": "string",
    "certificateUrl": "string"
  }
}
```

**Verify Evidence Request:**
```json
{
  "evidenceId": "uuid",
  "hash": "sha256_hash"
}
```

**Verify Evidence Response:**
```json
{
  "success": true,
  "data": {
    "verified": true,
    "evidenceId": "uuid",
    "originalHash": "sha256_hash",
    "currentHash": "sha256_hash",
    "hashMatch": true,
    "blockchainRecord": {
      "transactionHash": "0x1234567890abcdef",
      "blockNumber": 18234567,
      "timestamp": "ISO8601"
    },
    "tamperDetected": false,
    "verifiedAt": "ISO8601"
  }
}
```

**Requirements:**
- All event logs must be cryptographically hashed (SHA-256)
- Event logs are immutable (no updates/deletes allowed)
- Documents encrypted at rest (AES-256) and in transit (TLS 1.3)
- Auto-capture photos/videos from GPS e-Locks during critical events
- Geotag and timestamp all media evidence
- Anchor critical evidence to blockchain (Ethereum or Polygon)
- Generate verification certificates for evidence
- Maintain 100% audit trail (who accessed what when)
- Support batch verification of evidence
- Auto-attach evidence to claims and regulatory reports

---

## 10. Scorecard System

### 10.1 Scorecard Calculation APIs

**Endpoints Required:**

```
GET  /api/scorecards?organizationType=all&page=1&limit=20
GET  /api/scorecards/:organizationId
GET  /api/scorecards/:organizationId/history?period=90days
POST /api/scorecards/calculate
GET  /api/scorecards/leaderboard?type=fleet&region=lagos
```

### 10.2 Scorecard Structure

**Get Scorecard Response:**
```json
{
  "success": true,
  "data": {
    "organizationId": "uuid",
    "organizationName": "ABC Transport Ltd",
    "organizationType": "fleet_operator | shipping_company | terminal_operator",
    "currentMonth": "2024-03",
    "overallScore": 85.5,
    "ratingBand": "Gold | Silver | Bronze | Standard",
    "pillars": {
      "onTimePerformance": {
        "score": 88,
        "weight": 35,
        "weightedScore": 30.8,
        "metrics": {
          "onTimePickups": 92,
          "onTimeDeliveries": 84,
          "averageDelayMinutes": 45,
          "punctualityTrend": "improving"
        }
      },
      "compliance": {
        "score": 82,
        "weight": 35,
        "weightedScore": 28.7,
        "metrics": {
          "documentCompliance": 95,
          "regulatoryCompliance": 88,
          "routeCompliance": 76,
          "deviceUsageCompliance": 90
        }
      },
      "safety": {
        "score": 87,
        "weight": 30,
        "weightedScore": 26.1,
        "metrics": {
          "incidentFreeTrips": 94,
          "sealIntegrity": 98,
          "driverSafetyScore": 85,
          "speedingViolations": 2
        }
      }
    },
    "totalTrips": 120,
    "achievements": [
      {
        "title": "100 Incident-Free Trips",
        "dateEarned": "2024-03-10",
        "icon": "trophy"
      }
    ],
    "areasForImprovement": [
      {
        "area": "Route Compliance",
        "currentScore": 76,
        "targetScore": 85,
        "recommendation": "Reduce route deviations by 50%"
      }
    ],
    "monthlyTrend": [
      { "month": "2024-01", "score": 82 },
      { "month": "2024-02", "score": 84 },
      { "month": "2024-03", "score": 85.5 }
    ]
  }
}
```

### 10.3 Scorecard Calculation Logic

**Calculate Scorecard Request:**
```json
{
  "organizationId": "uuid",
  "period": {
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD"
  },
  "includeDeductions": true
}
```

**Calculation Formula:**

```
Overall Score = (On-Time Performance × 35%) + (Compliance × 35%) + (Safety × 30%)

On-Time Performance Score:
- On-time pickups: 0-100 (based on % within 30-min window)
- On-time deliveries: 0-100 (based on % meeting ETA)
- Deduction: -5 points per hour of delay (max -30)

Compliance Score:
- Document compliance: 0-100 (all required docs uploaded)
- Regulatory compliance: 0-100 (licenses/permits valid)
- Route compliance: 0-100 (% of trips without deviation)
- Device usage: 0-100 (% of trips with active telemetry)
- Deduction: -10 points per route deviation > 1km
- Deduction: -20 points per seal breach

Safety Score:
- Incident-free trips: 0-100 (% without incidents)
- Seal integrity: 0-100 (% intact seals)
- Driver safety: 0-100 (based on speed, braking, violations)
- Deduction: -15 points per accident
- Deduction: -5 points per speeding violation

Rating Bands:
- Gold: 85-100
- Silver: 70-84
- Bronze: 55-69
- Standard: 0-54
```

### 10.4 Event-Based Deductions

**Deduction Events:**
```json
{
  "organizationId": "uuid",
  "eventType": "route_deviation | seal_breach | late_delivery | speeding | accident | document_missing",
  "severity": "critical | high | medium | low",
  "deductionPoints": "number",
  "tripId": "uuid",
  "timestamp": "ISO8601",
  "description": "string",
  "autoCalculated": true
}
```

**Requirements:**
- Calculate scores daily (batch process at midnight)
- Update scores in real-time when critical events occur
- Store historical scores for trend analysis (24 months)
- Auto-generate monthly performance reports
- Send score updates via email weekly
- Display leaderboard rankings by region/category
- Award achievements automatically based on milestones
- Flag organizations with declining scores for review

---

## 11. Route Management

### 11.1 Route APIs

**Endpoints Required:**

```
GET    /api/routes?page=1&limit=20&status=active
POST   /api/routes
GET    /api/routes/:routeId
PATCH  /api/routes/:routeId
DELETE /api/routes/:routeId
GET    /api/routes/search?origin=lagos&destination=ibadan
```

**Create Route Request:**
```json
{
  "routeName": "Lagos to Ibadan Expressway",
  "origin": {
    "name": "Apapa Port",
    "address": "Apapa, Lagos",
    "latitude": 6.4391,
    "longitude": 3.3903,
    "type": "Port | Warehouse | Terminal"
  },
  "destination": {
    "name": "Ibadan Depot",
    "address": "Challenge, Ibadan",
    "latitude": 7.3775,
    "longitude": 3.9470,
    "type": "Port | Warehouse | Terminal"
  },
  "waypoints": [
    {
      "name": "Checkpoint 1",
      "latitude": 6.5244,
      "longitude": 3.3792,
      "order": 1
    }
  ],
  "distance": 120,
  "estimatedDuration": 180,
  "roadCondition": "Excellent | Good | Fair | Poor",
  "riskLevel": "Low | Medium | High",
  "approvedCorridors": [
    {
      "corridorName": "Lagos-Ibadan Expressway",
      "width": 500,
      "polygon": []
    }
  ],
  "restrictions": {
    "daytimeOnly": false,
    "requiresEscort": false,
    "maximumSpeed": 80,
    "prohibitedHours": []
  },
  "tollGates": [
    {
      "name": "Berger Toll",
      "location": { "lat": 6.5775, "lng": 3.3670 },
      "fee": 500
    }
  ],
  "status": "Active | Inactive"
}
```

**Requirements:**
- Auto-calculate distance and duration using mapping API
- Validate routes with real road networks
- Store route polygons for geofencing
- Support multiple alternate routes
- Auto-update risk levels based on incident data
- Integrate with Google Maps/Mapbox for route optimization

---

## 12. Notification System

### 12.1 Notification APIs

**Endpoints Required:**

```
GET  /api/notifications?page=1&limit=20&type=all&status=unread
POST /api/notifications/send
PATCH /api/notifications/:notificationId/mark-read
DELETE /api/notifications/:notificationId
GET  /api/notifications/preferences/:userId
PATCH /api/notifications/preferences/:userId
```

### 12.2 Send Notification Request

**Request:**
```json
{
  "recipientId": "uuid",
  "recipientEmail": "string",
  "recipientPhone": "string",
  "notificationType": "email | sms | in_app | whatsapp | push",
  "category": "shipment_update | device_alert | claim_update | payment | regulatory",
  "priority": "critical | high | medium | low",
  "subject": "string",
  "message": "string",
  "data": {
    "shipmentId": "uuid (optional)",
    "claimId": "uuid (optional)",
    "alertType": "string (optional)"
  },
  "templateId": "string (optional)",
  "templateVariables": {}
}
```

### 12.3 Notification Templates

**Email Templates:**
- Shipment request created
- Shipment accepted by fleet
- Shipment in transit
- Shipment delivered
- Payment received
- Claim filed
- Claim approved/rejected
- Device battery low
- Route deviation alert
- Seal breach alert
- Document expiry warning

**SMS Templates:**
- Critical alerts only (battery critical, seal breach, accident)
- Delivery confirmation
- Payment confirmation

**In-App Notifications:**
- All notification types
- Real-time via WebSocket
- Badge count updates

**WhatsApp Templates:**
- Shipment tracking links
- Payment receipts
- Delivery confirmations

### 12.4 Notification Preferences

**User Preferences:**
```json
{
  "userId": "uuid",
  "preferences": {
    "email": {
      "enabled": true,
      "categories": ["shipment_update", "payment", "claim_update"]
    },
    "sms": {
      "enabled": true,
      "categories": ["device_alert"]
    },
    "inApp": {
      "enabled": true,
      "categories": ["all"]
    },
    "whatsapp": {
      "enabled": false,
      "categories": []
    },
    "push": {
      "enabled": true,
      "categories": ["shipment_update", "device_alert"]
    }
  },
  "quietHours": {
    "enabled": true,
    "start": "22:00",
    "end": "07:00"
  }
}
```

**Requirements:**
- Integrate SendGrid/Mailgun for email
- Integrate Twilio/Termii for SMS (Nigeria-focused)
- Integrate WhatsApp Business API
- Implement notification queue (Redis/RabbitMQ)
- Support batch notifications
- Track delivery status (sent, delivered, failed, read)
- Respect user preferences and quiet hours
- Implement rate limiting (max 10 SMS/hour per user)
- Store notification history for 90 days

---

## 13. Implementation Priority

### Phase 1: Core Foundation (Weeks 1-4)

**Priority 1A: Authentication & Onboarding**
1. User registration/login APIs
2. JWT authentication
3. Role-based access control
4. All 5 onboarding flows
5. Document upload to cloud storage

**Priority 1B: Fleet Management**
6. Driver CRUD APIs
7. Vehicle CRUD APIs
8. Bulk upload functionality
9. Document expiry tracking

**Priority 1C: Basic Shipment Flow**
10. Shipment creation (all 10 steps)
11. Shipment tracking (basic)
12. Payment integration (Paystack)

**Deliverables:**
- Users can register, onboard, and access dashboard
- Fleet operators can manage drivers/vehicles
- Shippers can create shipments and make payments

---

### Phase 2: Telematics & Device Management (Weeks 5-8)

**Priority 2A: Device Lifecycle**
1. Device CRUD APIs
2. Device assignment/unassignment
3. Battery monitoring with alerts
4. Custody transfer workflow
5. Device inspection records

**Priority 2B: Real-Time Telematics**
6. WebSocket server setup
7. GPS position tracking (REST + WebSocket)
8. Battery status updates
9. Seal status monitoring
10. Geofencing logic
11. Alert generation system

**Priority 2C: Shipment Operations**
12. Shipment request management (accept/modify/decline)
13. Active trips tracking
14. Live shipment tracking with telematics

**Deliverables:**
- Complete device lifecycle management
- Real-time GPS tracking operational
- Geofence alerts working
- Shipments can be monitored end-to-end

---

### Phase 3: Insurance & Compliance (Weeks 9-12)

**Priority 3A: Insurance Management**
1. Insured containers dashboard
2. Risk score calculation engine
3. Claims filing APIs
4. Claims processing workflow
5. Auto-attach telematics evidence to claims

**Priority 3B: Evidence Vault**
6. Immutable event logs
7. Document storage with encryption
8. Media evidence storage
9. SHA-256 hashing for all evidence
10. Blockchain anchoring (Polygon for cost efficiency)
11. Evidence verification APIs

**Priority 3C: Regulatory Reporting**
12. Report generation for all 4 agencies (NPA, NIMASA, FRSC, NCS)
13. PDF/Excel export
14. Report scheduling
15. Report submission tracking

**Deliverables:**
- Insurance companies can monitor risk and process claims
- Complete evidence vault with blockchain verification
- Regulatory reports auto-generated and exportable

---

### Phase 4: Scorecards & Notifications (Weeks 13-16)

**Priority 4A: Scorecard System**
1. Scorecard calculation engine
2. 3-pillar scoring logic
3. Event-based deductions
4. Historical trends
5. Leaderboard rankings
6. Achievements system

**Priority 4B: Notification System**
7. Email notifications (SendGrid)
8. SMS notifications (Termii for Nigeria)
9. In-app notifications via WebSocket
10. WhatsApp Business integration
11. Notification preferences
12. Notification templates

**Priority 4C: Analytics & Reporting**
13. Dashboard analytics APIs
14. User-specific dashboards
15. Performance metrics
16. Export functionality

**Deliverables:**
- Scorecard system fully operational
- Multi-channel notification system
- Comprehensive analytics dashboards

---

### Phase 5: Polish & Production Readiness (Weeks 17-20)

**Priority 5A: Performance Optimization**
1. Database indexing and query optimization
2. Redis caching for frequent queries
3. CDN setup for media/documents
4. API rate limiting
5. Load testing and scaling

**Priority 5B: Security Hardening**
6. Input validation on all endpoints
7. SQL injection prevention
8. XSS protection
9. CORS configuration
10. Security audit

**Priority 5C: Monitoring & Logging**
11. Application logging (Winston/Bunyan)
12. Error tracking (Sentry)
13. Performance monitoring (New Relic/DataDog)
14. Uptime monitoring
15. Alert thresholds

**Deliverables:**
- Production-ready backend
- 99.9% uptime SLA capable
- Comprehensive monitoring and alerting

---

## Database Schema Overview

### Core Tables

**users**
- id (uuid, primary key)
- email (unique)
- password_hash
- full_name
- user_type (enum)
- organization_id (foreign key)
- onboarding_completed (boolean)
- created_at, updated_at

**organizations**
- id (uuid, primary key)
- name
- user_type (enum)
- cac_number
- tin_number
- business_address
- onboarding_data (jsonb)
- created_at, updated_at

**drivers**
- id (uuid, primary key)
- fleet_operator_id (foreign key)
- full_name
- drivers_license_number (unique)
- phone_number
- email
- verification_status (enum)
- driver_data (jsonb)
- created_at, updated_at

**vehicles**
- id (uuid, primary key)
- fleet_operator_id (foreign key)
- registration_number (unique)
- vin
- truck_type
- status (enum)
- vehicle_data (jsonb)
- created_at, updated_at

**shipments**
- id (uuid, primary key)
- shipment_id (unique, e.g., SHP-2024-001)
- shipper_id (foreign key)
- fleet_operator_id (foreign key)
- insurance_provider_id (foreign key)
- route_id (foreign key)
- status (enum)
- shipment_data (jsonb)
- created_at, updated_at

**devices**
- id (uuid, primary key)
- device_id (unique, e.g., DEV-2024-003)
- status (enum)
- battery_level (integer)
- firmware_version
- device_data (jsonb)
- created_at, updated_at

**device_assignments**
- id (uuid, primary key)
- device_id (foreign key)
- container_id (foreign key)
- shipment_id (foreign key)
- assigned_at
- returned_at
- assignment_data (jsonb)

**telemetry_data** (Partitioned by date)
- id (uuid, primary key)
- device_id (foreign key)
- timestamp
- latitude, longitude
- speed, heading
- battery_level
- seal_status
- telemetry_data (jsonb)

**events** (Immutable)
- id (uuid, primary key)
- event_id (unique, e.g., EVT-001)
- event_type (enum)
- severity (enum)
- shipment_id (foreign key)
- device_id (foreign key)
- event_data (jsonb)
- hash (sha256)
- blockchain_tx_hash
- created_at (immutable)

**evidence_documents**
- id (uuid, primary key)
- file_name
- file_type
- category
- hash (sha256)
- encrypted (boolean)
- storage_url
- metadata (jsonb)
- created_at

**scorecards**
- id (uuid, primary key)
- organization_id (foreign key)
- period (e.g., '2024-03')
- overall_score
- rating_band
- pillar_scores (jsonb)
- created_at

**notifications**
- id (uuid, primary key)
- recipient_id (foreign key)
- notification_type (enum)
- category
- priority
- message
- read_at
- created_at

---

## Technology Stack Recommendations

### Backend Framework
- **Node.js** with **Express.js** (fast, scalable, large ecosystem)
- **Alternative**: Python with FastAPI (if ML/AI features planned)

### Database
- **PostgreSQL 15+** (JSONB support, robust, ACID compliant)
- **Redis** (caching, session storage, WebSocket pub/sub)
- **TimescaleDB** extension (for time-series telemetry data)

### Real-Time Communication
- **Socket.io** or **ws** library for WebSocket
- **Redis Pub/Sub** for horizontal scaling of WebSocket servers

### File Storage
- **AWS S3** or **Azure Blob Storage** (documents, media evidence)
- **CloudFront/Azure CDN** (fast global delivery)

### Message Queue
- **RabbitMQ** or **Redis Queue** (async tasks, notifications)

### Email/SMS
- **SendGrid** or **Mailgun** (email)
- **Termii** or **Twilio** (SMS - Nigeria support)

### Blockchain
- **Polygon** (low cost, Ethereum-compatible) or **Ethereum** (if budget allows)
- **ethers.js** library for blockchain interaction

### Payment
- **Paystack** (Nigeria-focused, easy integration)
- **Flutterwave** (alternative/backup)

### Monitoring
- **Sentry** (error tracking)
- **New Relic** or **DataDog** (APM)
- **Winston** or **Bunyan** (logging)

### DevOps
- **Docker** (containerization)
- **Kubernetes** or **AWS ECS** (orchestration)
- **GitHub Actions** or **GitLab CI/CD** (automation)
- **Nginx** (reverse proxy, load balancing)

---

## Security Considerations

1. **Authentication**: JWT with refresh tokens, stored in httpOnly cookies
2. **Password**: Bcrypt with 12 rounds minimum
3. **API Security**: Rate limiting (100 requests/minute per IP)
4. **Data Encryption**: AES-256 for documents at rest, TLS 1.3 in transit
5. **Input Validation**: Joi or Yup for request validation
6. **SQL Injection**: Use parameterized queries (Sequelize/TypeORM)
7. **XSS Protection**: Sanitize all user inputs, CSP headers
8. **CORS**: Whitelist only frontend domains
9. **File Upload**: Virus scanning (ClamAV), file type validation, size limits
10. **API Keys**: Store in environment variables, rotate regularly

---

## Testing Requirements

1. **Unit Tests**: 80% code coverage minimum (Jest/Mocha)
2. **Integration Tests**: All API endpoints
3. **E2E Tests**: Critical user flows (Cypress/Playwright)
4. **Load Tests**: 1000 concurrent users (Artillery/k6)
5. **Security Tests**: OWASP Top 10 compliance

---

## Documentation Deliverables

1. **API Documentation**: OpenAPI/Swagger spec for all endpoints
2. **Database Schema**: ER diagrams, table descriptions
3. **WebSocket Events**: Complete event catalog
4. **Deployment Guide**: Step-by-step setup instructions
5. **Environment Variables**: Complete .env.example file

---

## Success Metrics

1. **Performance**: API response time < 200ms (95th percentile)
2. **Availability**: 99.9% uptime
3. **Data Accuracy**: 100% for telemetry, evidence, and financial data
4. **Security**: Zero critical vulnerabilities
5. **Scalability**: Support 10,000 concurrent shipments

---

**End of Backend Implementation Plan**

This plan provides comprehensive guidance for backend development. Each section includes detailed API specifications, data structures, and implementation requirements that a backend developer can follow to build a production-ready system.
