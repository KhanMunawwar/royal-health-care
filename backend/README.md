# Royal Health Care Backend API

Secure Node.js, Express and MongoDB REST API for the Royal Health Care platform.

## Included modules

- Patient registration and login with JWT
- Authenticated current-user profile
- Secure admin account bootstrap
- Public verified-doctor listing and doctor details
- Admin doctor creation, listing, update and soft deactivation
- Patient appointment booking and cancellation
- Doctor/admin appointment status management
- MongoDB Atlas integration
- Request validation and centralized error handling
- CORS, Helmet, rate limiting and request logging

## Technology

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Token
- bcrypt
- express-validator

## Local setup

```bash
cd backend
npm install
```

Create the private environment file:

```powershell
Copy-Item .env.example .env
```

Update `.env` with your private MongoDB URI, JWT secret and admin credentials.

Start the development server:

```powershell
npm.cmd run dev
```

The API runs at:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

## Create or update the admin account

Set these values only inside the private `.env` file:

```text
ADMIN_NAME=Royal Health Care Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=use-a-strong-private-password
ADMIN_PHONE=
```

Run:

```powershell
npm.cmd run admin:create
```

The command creates a new admin or safely updates the existing admin with the same email.

## Main endpoints

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/health` | Public |
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| GET | `/api/v1/auth/me` | Authenticated |
| GET | `/api/v1/doctors` | Public |
| GET | `/api/v1/doctors/:id` | Public |
| GET | `/api/v1/doctors/admin` | Admin |
| POST | `/api/v1/doctors` | Admin |
| PATCH | `/api/v1/doctors/:id` | Admin |
| DELETE | `/api/v1/doctors/:id` | Admin |
| POST | `/api/v1/appointments` | Patient |
| GET | `/api/v1/appointments/me` | Authenticated |
| PATCH | `/api/v1/appointments/:id/cancel` | Patient/Admin |
| PATCH | `/api/v1/appointments/:id/status` | Doctor/Admin |

Send JWT tokens using:

```text
Authorization: Bearer <token>
```

## Doctor deactivation

`DELETE /api/v1/doctors/:id` performs a safe soft deactivation:

- Doctor verification is disabled
- Linked user login is disabled
- Existing appointment references remain preserved

An admin can reactivate the doctor using:

```text
PATCH /api/v1/doctors/:id
```

with:

```json
{
  "isActive": true,
  "isVerified": true
}
```

## Security notes

- Never commit the private `.env` file.
- Use strong and different passwords for MongoDB and application admins.
- Restrict MongoDB Atlas IP access before production deployment.
- Temporary `0.0.0.0/0` access must be removed after local testing.
- Deploy only behind HTTPS.
- Add audit logging, consent controls and field-level encryption before storing real medical records.

## Remaining platform modules

The current backend covers authentication, doctors and appointments. Future modules include:

- Lab tests
- Pharmacy and prescriptions
- Ambulance booking
- Home healthcare
- Payments
- Notifications
- Medical records
- Video consultation integration