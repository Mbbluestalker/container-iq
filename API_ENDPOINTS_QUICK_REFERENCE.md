# ContainerIQ API Endpoints - Quick Reference

**Version**: 1.0
**Base URL**: `https://api.containeriq.com/api`
**Auth**: Bearer Token (JWT)

---

## 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | User registration (3-step) | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/refresh-token` | Refresh access token | No |
| POST | `/auth/logout` | Logout user | Yes |
| GET | `/auth/me` | Get current user | Yes |

---

## 👤 Onboarding

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/onboarding/insurance` | Insurance company onboarding | Yes |
| POST | `/onboarding/shipper` | Shipper onboarding | Yes |
| POST | `/onboarding/fleet` | Fleet operator onboarding | Yes |
| POST | `/onboarding/shipping-company` | Shipping company onboarding | Yes |
| POST | `/onboarding/terminal-operator` | Terminal operator onboarding | Yes |
| GET | `/onboarding/status/:userId` | Get onboarding status | Yes |
| PATCH | `/onboarding/update/:userId` | Update onboarding | Yes |

---

## 🚛 Fleet Management - Drivers

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/fleet/drivers` | List all drivers | Yes | Fleet Operator |
| POST | `/fleet/drivers` | Create driver | Yes | Fleet Operator |
| GET | `/fleet/drivers/:id` | Get driver details | Yes | Fleet Operator |
| PATCH | `/fleet/drivers/:id` | Update driver | Yes | Fleet Operator |
| DELETE | `/fleet/drivers/:id` | Delete driver (soft) | Yes | Fleet Operator |
| POST | `/fleet/drivers/bulk-upload` | Bulk upload drivers (CSV) | Yes | Fleet Operator |
| GET | `/fleet/drivers/download-template` | Download CSV template | Yes | Fleet Operator |

**Query Params**: `?page=1&limit=20&search=query&status=active`

---

## 🚚 Fleet Management - Vehicles

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/fleet/vehicles` | List all vehicles | Yes | Fleet Operator |
| POST | `/fleet/vehicles` | Create vehicle | Yes | Fleet Operator |
| GET | `/fleet/vehicles/:id` | Get vehicle details | Yes | Fleet Operator |
| PATCH | `/fleet/vehicles/:id` | Update vehicle | Yes | Fleet Operator |
| DELETE | `/fleet/vehicles/:id` | Delete vehicle (soft) | Yes | Fleet Operator |
| POST | `/fleet/vehicles/bulk-upload` | Bulk upload vehicles (CSV) | Yes | Fleet Operator |
| GET | `/fleet/vehicles/download-template` | Download CSV template | Yes | Fleet Operator |

**Query Params**: `?page=1&limit=20&search=query&status=available`

---

## 📦 Fleet Management - Shipment Requests

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/fleet/shipment-requests` | List shipment requests | Yes | Fleet Operator |
| GET | `/fleet/shipment-requests/:id` | Get request details | Yes | Fleet Operator |
| PATCH | `/fleet/shipment-requests/:id/accept` | Accept shipment request | Yes | Fleet Operator |
| PATCH | `/fleet/shipment-requests/:id/modify` | Modify request (counter-offer) | Yes | Fleet Operator |
| PATCH | `/fleet/shipment-requests/:id/decline` | Decline shipment request | Yes | Fleet Operator |

**Query Params**: `?status=pending&page=1&limit=20`

---

## 🚗 Fleet Management - Active Trips

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/fleet/trips` | List active trips | Yes | Fleet Operator |
| GET | `/fleet/trips/:id` | Get trip details | Yes | Fleet Operator |
| PATCH | `/fleet/trips/:id/update-status` | Update trip status | Yes | Fleet Operator |

**Query Params**: `?status=active&page=1&limit=20`

---

## 📮 Shipment Management

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/shipments/create` | Create shipment (10 steps) | Yes | Shipper |
| GET | `/shipments` | List all shipments | Yes | Shipper |
| GET | `/shipments/:id` | Get shipment details | Yes | All |
| PATCH | `/shipments/:id/update` | Update shipment | Yes | Shipper |
| DELETE | `/shipments/:id` | Cancel shipment | Yes | Shipper |
| GET | `/shipments/:id/track` | Track shipment (live) | Yes | All |
| GET | `/shipments/:id/timeline` | Get shipment timeline | Yes | All |
| GET | `/shipments/:id/location` | Get current location | Yes | All |

**Query Params**: `?status=all&page=1&limit=20`

---

## 💳 Payment

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payments/initialize` | Initialize payment | Yes |
| POST | `/payments/verify` | Verify payment | Yes |
| GET | `/payments/:transactionId/status` | Get payment status | Yes |
| POST | `/payments/card` | Card payment | Yes |
| POST | `/payments/bank-transfer` | Bank transfer payment | Yes |
| POST | `/payments/wallet` | Wallet payment | Yes |

---

## 🛡️ Insurance Management

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/insurance/containers` | List insured containers | Yes | Insurance Company |
| GET | `/insurance/containers/:containerId` | Get container details | Yes | Insurance Company |
| GET | `/insurance/containers/:containerId/risk-score` | Get risk score | Yes | Insurance Company |
| GET | `/insurance/containers/:containerId/events` | Get container events | Yes | Insurance Company |
| GET | `/insurance/claims` | List all claims | Yes | Insurance Company |
| GET | `/insurance/claims/:claimId` | Get claim details | Yes | Insurance Company |
| POST | `/insurance/claims/:claimId/approve` | Approve claim | Yes | Insurance Company |
| POST | `/insurance/claims/:claimId/reject` | Reject claim | Yes | Insurance Company |
| POST | `/insurance/claims/:claimId/request-info` | Request more info | Yes | Insurance Company |
| PATCH | `/insurance/claims/:claimId/update-status` | Update claim status | Yes | Insurance Company |

**Query Params**: `?status=all&page=1&limit=20`

---

## 📱 Device Lifecycle Management

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/devices` | List all devices | Yes | Super Admin |
| POST | `/devices/assign` | Assign device to container | Yes | Super Admin |
| POST | `/devices/unassign` | Unassign device | Yes | Super Admin |
| GET | `/devices/:deviceId` | Get device details | Yes | Super Admin |
| PATCH | `/devices/:deviceId/update` | Update device | Yes | Super Admin |
| GET | `/devices/:deviceId/battery-status` | Get battery status | Yes | All |
| GET | `/devices/:deviceId/custody-history` | Get custody history | Yes | Super Admin |
| POST | `/devices/:deviceId/custody-transfer` | Transfer custody | Yes | Super Admin |
| POST | `/devices/:deviceId/inspection` | Log inspection | Yes | Super Admin |
| GET | `/devices/battery-monitor` | Monitor all batteries | Yes | Super Admin |

**Query Params**: `?status=all&page=1&limit=20&threshold=40`

---

## 📡 Real-Time Telematics (REST)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/telematics/devices/active` | Get all active devices | Yes |
| GET | `/telematics/devices/:deviceId/current-status` | Get current status | Yes |
| GET | `/telematics/devices/:deviceId/history` | Get telemetry history | Yes |
| GET | `/telematics/shipments/:shipmentId/route-replay` | Replay completed route | Yes |
| GET | `/telematics/alerts` | Get all alerts | Yes |
| GET | `/telematics/geofence/check` | Check geofence compliance | Yes |
| POST | `/telematics/geofence/routes/:routeId` | Create geofence for route | Yes |

**Query Params for History**: `?from=timestamp&to=timestamp`
**Query Params for Alerts**: `?severity=all&status=active`

---

## 📡 Real-Time Telematics (WebSocket)

**WebSocket URL**: `wss://api.containeriq.com/ws/telematics`

### Client → Server Events

```json
// Authenticate
{ "type": "auth", "token": "jwt_token" }

// Subscribe to channels
{
  "type": "subscribe",
  "channels": ["device:DEV-001", "shipment:SHP-2024-001", "fleet:fleet_id"]
}

// Unsubscribe
{
  "type": "unsubscribe",
  "channels": ["device:DEV-001"]
}
```

### Server → Client Events

```json
// GPS Update (every 30s)
{
  "type": "gps_update",
  "deviceId": "DEV-001",
  "timestamp": "ISO8601",
  "data": { "latitude": 6.5775, "longitude": 3.3670, "speed": 65 }
}

// Battery Update (every 5s)
{
  "type": "battery_update",
  "deviceId": "DEV-001",
  "data": { "batteryLevel": 72, "alert": "low | critical | null" }
}

// Seal Status
{
  "type": "seal_update",
  "deviceId": "DEV-001",
  "data": { "sealStatus": "Intact | Breached" }
}

// Geofence Alert
{
  "type": "geofence_alert",
  "severity": "critical",
  "data": { "alertType": "route_deviation", "deviationDistance": 2.3 }
}

// Device Heartbeat (every 60s)
{
  "type": "device_heartbeat",
  "deviceId": "DEV-001",
  "data": { "online": true, "gpsSignalStrength": 85 }
}
```

---

## 📊 Regulatory Reporting

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/regulatory/reports` | List all reports | Yes | Super Admin |
| POST | `/regulatory/reports/generate` | Generate new report | Yes | Super Admin |
| GET | `/regulatory/reports/:reportId` | Get report details | Yes | Super Admin |
| GET | `/regulatory/reports/:reportId/download` | Download report (PDF/Excel) | Yes | Super Admin |
| PATCH | `/regulatory/reports/:reportId/submit` | Submit report to agency | Yes | Super Admin |
| DELETE | `/regulatory/reports/:reportId` | Delete draft report | Yes | Super Admin |
| GET | `/regulatory/reports/templates/:agency` | Get report template | Yes | Super Admin |

**Query Params**: `?agency=all&status=all&page=1`

**Agencies**: `NPA`, `NIMASA`, `FRSC`, `NCS`

---

## 🗄️ Evidence Vault - Event Logs

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/evidence/events` | List all events | Yes | Super Admin |
| GET | `/evidence/events/:eventId` | Get event details | Yes | All |
| POST | `/evidence/events/verify-hash` | Verify event integrity | Yes | All |
| GET | `/evidence/events/:eventId/evidence` | Get event evidence files | Yes | All |
| POST | `/evidence/events/:eventId/download` | Download evidence package | Yes | All |

**Query Params**: `?page=1&limit=20&severity=all&type=all`

**Note**: Events are **immutable** - no POST/PATCH/DELETE allowed

---

## 🗄️ Evidence Vault - Documents

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/evidence/documents` | List all documents | Yes |
| POST | `/evidence/documents/upload` | Upload document | Yes |
| GET | `/evidence/documents/:documentId` | Get document details | Yes |
| POST | `/evidence/documents/:documentId/verify-hash` | Verify document integrity | Yes |
| DELETE | `/evidence/documents/:documentId` | Delete document | Yes |
| GET | `/evidence/documents/:documentId/download` | Download document | Yes |

**Query Params**: `?category=all&page=1&limit=20`

---

## 🗄️ Evidence Vault - Media

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/evidence/media` | List all media files | Yes |
| POST | `/evidence/media/upload` | Upload media | Yes |
| GET | `/evidence/media/:mediaId` | Get media details | Yes |
| POST | `/evidence/media/:mediaId/verify-hash` | Verify media integrity | Yes |
| DELETE | `/evidence/media/:mediaId` | Delete media | Yes |

**Query Params**: `?type=all&page=1&limit=20`

---

## 🗄️ Evidence Vault - Blockchain

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/evidence/blockchain/anchor` | Anchor evidence to blockchain | Yes | Super Admin |
| POST | `/evidence/blockchain/verify` | Verify blockchain record | Yes | All |
| GET | `/evidence/blockchain/status` | Get anchoring status | Yes | All |
| GET | `/evidence/blockchain/certificate/:evidenceId` | Download verification certificate | Yes | All |

---

## 🏆 Scorecard System

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/scorecards` | List all scorecards | Yes |
| GET | `/scorecards/:organizationId` | Get organization scorecard | Yes |
| GET | `/scorecards/:organizationId/history` | Get scorecard history | Yes |
| POST | `/scorecards/calculate` | Manually trigger calculation | Yes |
| GET | `/scorecards/leaderboard` | Get leaderboard | Yes |

**Query Params**: `?organizationType=all&page=1&limit=20`
**History Params**: `?period=90days`
**Leaderboard Params**: `?type=fleet&region=lagos`

---

## 🗺️ Route Management

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/routes` | List all routes | Yes | All |
| POST | `/routes` | Create route | Yes | Super Admin |
| GET | `/routes/:routeId` | Get route details | Yes | All |
| PATCH | `/routes/:routeId` | Update route | Yes | Super Admin |
| DELETE | `/routes/:routeId` | Delete route | Yes | Super Admin |
| GET | `/routes/search` | Search routes | Yes | All |

**Query Params**: `?page=1&limit=20&status=active`
**Search Params**: `?origin=lagos&destination=ibadan`

---

## 🔔 Notification System

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/notifications` | List user notifications | Yes |
| POST | `/notifications/send` | Send notification (admin only) | Yes |
| PATCH | `/notifications/:notificationId/mark-read` | Mark as read | Yes |
| DELETE | `/notifications/:notificationId` | Delete notification | Yes |
| GET | `/notifications/preferences/:userId` | Get notification preferences | Yes |
| PATCH | `/notifications/preferences/:userId` | Update preferences | Yes |

**Query Params**: `?page=1&limit=20&type=all&status=unread`

---

## 📈 Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

---

## 🔒 Authentication Header

All authenticated endpoints require:

```
Authorization: Bearer <jwt_access_token>
```

---

## 📊 Pagination

All list endpoints support pagination:

**Query Params**:
- `page` (default: 1)
- `limit` (default: 20, max: 100)

**Response Meta**:
```json
{
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 🔍 Filtering & Searching

Common filter params across endpoints:

- `status` - Filter by status (e.g., `active`, `pending`, `completed`)
- `search` - Full-text search (searches multiple fields)
- `from` / `to` - Date range filtering (ISO8601 format)
- `type` - Filter by type/category
- `severity` - Filter by severity (alerts/events)

---

## 📌 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Successful but no data to return |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation failed |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable - Temporary outage |

---

## 🚀 Rate Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Authentication | 10 requests | 1 minute |
| General API | 100 requests | 1 minute |
| File Upload | 20 requests | 1 minute |
| WebSocket | 1000 messages | 1 minute |

**Rate Limit Headers** (included in all responses):
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1678901234
```

---

## 📄 Content Types

**Request**:
- `application/json` (default)
- `multipart/form-data` (file uploads)

**Response**:
- `application/json` (default)
- `application/pdf` (report downloads)
- `application/vnd.ms-excel` (Excel exports)

---

**Total Endpoints**: ~150 REST + WebSocket server

**API Documentation**: Full OpenAPI/Swagger spec available at `/api/docs`

---

**End of Quick Reference**
