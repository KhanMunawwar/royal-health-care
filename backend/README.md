# Royal Health Care Backend

Secure Node.js, Express and MongoDB REST API starter for the Royal Health Care platform.

## Included modules

- Patient registration and login with JWT
- Current-user profile endpoint
- Public verified-doctor listing and details
- Patient appointment booking and cancellation
- Doctor/admin appointment status management
- Request validation, rate limiting, CORS, Helmet and centralized errors

## Local setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.
Update `MONGODB_URI` and replace `JWT_SECRET` before starting the server.

## Main endpoints

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/health` | Public |
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| GET | `/api/v1/auth/me` | Authenticated |
| GET | `/api/v1/doctors` | Public |
| GET | `/api/v1/doctors/:id` | Public |
| POST | `/api/v1/appointments` | Patient |
| GET | `/api/v1/appointments/me` | Authenticated |
| PATCH | `/api/v1/appointments/:id/cancel` | Patient/Admin |
| PATCH | `/api/v1/appointments/:id/status` | Doctor/Admin |

Send JWT tokens as `Authorization: Bearer <token>`.

## Production notes

- Store secrets only in the deployment environment; never commit `.env`.
- Use MongoDB Atlas or a protected MongoDB deployment.
- Add audit logging, consent controls and field-level encryption before storing real medical records.
- Add automated tests and deploy behind HTTPS before production use.
