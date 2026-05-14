# School Management System — Backend API

RESTful backend API for managing school operations: students, teachers, classes, subjects, attendance, exams, and fees.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (ES Modules) |
| Framework | Express 4.21 |
| ORM | Prisma 6.6 |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Auth | bcryptjs + JWT |
| Validation | Joi 17 |
| Security | helmet, cors, express-rate-limit |
| Logging | morgan |

## Prerequisites

- Node.js >= 18
- npm

## Setup

```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Generate Prisma client and push schema to database
npm run prisma:generate
npm run prisma:push

# (Optional) Seed the database with sample data
npm run prisma:seed
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `DATABASE_URL` | `file:./dev.db` | Prisma connection string |
| `JWT_SECRET` | (dev default) | Secret for signing JWT tokens |
| `JWT_EXPIRES_IN` | `7d` | Token expiry duration |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed CORS origin |

## Development

```bash
npm run dev       # Start with nodemon (auto-reload)
npm start         # Start without auto-reload
```

## Database Commands

```bash
npm run prisma:generate   # Regenerate Prisma client
npm run prisma:push       # Push schema to database
npm run prisma:migrate    # Create a new migration
npm run prisma:seed       # Seed sample data
```

## Seed Credentials

| Role | Email | Password |
|------|-------|----------|
| SUPER_ADMIN | admin@school.com | admin123 |
| TEACHER | teacher@school.com | teacher123 |
| STUDENT | student@school.com | student123 |

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema (10 models)
│   ├── seed.js                # Sample data seeder
│   └── dev.db                 # SQLite database (auto-created)
├── src/
│   ├── app.js                 # Express entry point
│   ├── config/
│   │   └── database.js        # PrismaClient singleton
│   ├── controllers/           # Route handler logic
│   ├── middleware/            # Auth, role check, validation, error handler
│   ├── routes/                # Express route definitions
│   ├── utils/                 # Helpers (ID generators, pagination)
│   └── validators/            # Joi validation schemas
├── .env
├── .env.example
└── package.json
```

## API Overview

All endpoints are prefixed with `/api`.  
See [API.md](./API.md) for full documentation.

| Resource | Base Path |
|----------|-----------|
| Auth | `/api/auth` |
| Students | `/api/students` |
| Teachers | `/api/teachers` |
| Classes | `/api/classes` |
| Subjects | `/api/subjects` |
| Attendance | `/api/attendance` |
| Exams | `/api/exams` |
| Fees | `/api/fees` |
| Dashboard | `/api/dashboard` |

## Authentication

Most endpoints require a JWT token sent as:

```
Authorization: Bearer <token>
```

Obtain a token via `POST /api/auth/login` or `POST /api/auth/register`.

## Roles

| Role | Permissions |
|------|-------------|
| SUPER_ADMIN | Full access to all resources |
| ADMIN | Full access (except SUPER_ADMIN-only restrictions) |
| TEACHER | Read access to most resources; can mark attendance and record exam results |
| ACCOUNTANT | Full access to fee management |
| STUDENT | Read-only access to own data (attendance, fees, results) |
| PARENT | Same as STUDENT |

## Rate Limiting

- 100 requests per 15 minutes per IP on the `/api` prefix.

## Error Response Format

```json
{
  "success": false,
  "error": "Error message"
  // "stack": "..."  (only in development)
}
```
