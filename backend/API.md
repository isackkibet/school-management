# API Documentation

Base URL: `http://localhost:5000`  
All timestamps are in ISO 8601 format.  
All endpoints requiring auth use `Authorization: Bearer <token>`.

---

## Response Envelope

Every response follows this structure:

```json
{
  "success": true|false,
  "data": { ... },
  "pagination": { "page": 1, "limit": 10, "total": 50, "totalPages": 5 }
}
```

Paginated endpoints accept `?page=1&limit=10` query params (default page=1, limit=10, max limit=100).

---

## Health Check

```
GET /health
```

No auth required.

**Response:**
```json
{
  "success": true,
  "status": "ok",
  "timestamp": "2026-05-14T12:00:00.000Z"
}
```

---

## Auth (`/api/auth`)

### Register

```
POST /api/auth/register
```

No auth required.

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "STUDENT",
  "phone": "1234567890",
  "address": "123 Main St",
  "dateOfBirth": "2010-01-15",
  "gender": "FEMALE"
}
```

Roles allowed: `SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`, `TEACHER`, `STUDENT`, `PARENT`.

If role is `STUDENT`, a `StudentProfile` with auto-generated admission number is created.  
If role is `TEACHER`, a `TeacherProfile` with auto-generated teacher ID is created.

**Response** `201`:
```json
{
  "success": true,
  "data": {
    "user": { "id": "cm...", "email": "jane@example.com", "role": "STUDENT", "firstName": "Jane", "lastName": "Doe", "createdAt": "..." },
    "token": "eyJ..."
  }
}
```

---

### Login

```
POST /api/auth/login
```

No auth required.

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { "id": "cm...", "email": "...", "role": "STUDENT", "firstName": "...", "lastName": "...", "isActive": true },
    "token": "eyJ..."
  }
}
```

---

### Get Current User

```
GET /api/auth/me
```

Auth required.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cm...",
    "email": "jane@example.com",
    "role": "STUDENT",
    "firstName": "Jane",
    "lastName": "Doe",
    "phone": "1234567890",
    "address": "123 Main St",
    "dateOfBirth": "2010-01-15T00:00:00.000Z",
    "gender": "FEMALE",
    "isActive": true,
    "createdAt": "...",
    "updatedAt": "...",
    "studentProfile": { ... },
    "teacherProfile": { ... }
  }
}
```

`studentProfile` and `teacherProfile` are only present for users with those roles.

---

### Update Profile

```
PATCH /api/auth/me
```

Auth required.

**Request body** (all optional):
```json
{
  "firstName": "Updated",
  "lastName": "Name",
  "phone": "0987654321",
  "address": "456 Oak Ave",
  "gender": "MALE"
}
```

---

## Students (`/api/students`)

All endpoints require auth.

### Create Student

```
POST /api/students
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body:** Either provide a `userId` (existing user with STUDENT role) OR provide `email` + `firstName` + `lastName` to create a new user.

```json
{
  "userId": "cm...",
  "classId": "cm...",
  "guardianName": "Bob Smith",
  "guardianPhone": "5559876543"
}
```

Or create a new user:

```json
{
  "email": "newstudent@example.com",
  "password": "pass123",
  "firstName": "New",
  "lastName": "Student",
  "classId": "cm...",
  "gender": "MALE",
  "guardianName": "Bob Smith",
  "guardianPhone": "5559876543"
}
```

**Response** `201`:

```json
{
  "success": true,
  "data": {
    "id": "cm...",
    "userId": "cm...",
    "studentId": "STU26001001",
    "classId": "cm...",
    "guardianName": "Bob Smith",
    "guardianPhone": "5559876543",
    "enrollmentDate": "...",
    "user": { "id": "...", "firstName": "...", "lastName": "...", "email": "..." },
    "class": { ... }
  }
}
```

---

### List Students

```
GET /api/students
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

**Query params:** `?page=1&limit=10&search=Jane&classId=cm...`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm...",
      "studentId": "STU26001001",
      "classId": "cm...",
      "guardianName": "...",
      "guardianPhone": "...",
      "enrollmentDate": "...",
      "user": { "id": "...", "firstName": "Jane", "lastName": "Doe", "email": "...", "isActive": true },
      "class": { "id": "...", "name": "Class 10", "section": "A" },
      "feePayments": [ ... ],
      "_count": { "attendance": 10, "examResults": 5, "feePayments": 2 }
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 25, "totalPages": 3 }
}
```

---

### Bulk Create Students

```
POST /api/students/bulk
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body:**
```json
{
  "students": [
    {
      "email": "student1@example.com",
      "firstName": "Alice",
      "lastName": "Smith",
      "classId": "cm...",
      "gender": "FEMALE"
    },
    {
      "email": "student2@example.com",
      "firstName": "Bob",
      "lastName": "Jones",
      "classId": "cm...",
      "gender": "MALE"
    }
  ]
}
```

**Response** `201`:
```json
{
  "success": true,
  "data": [ ... ],
  "count": 2
}
```

---

### Get Unassigned Students

```
GET /api/students/unassigned
```

Roles: `SUPER_ADMIN`, `ADMIN`

Returns students without a class.

---

### Get Student by ID

```
GET /api/students/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

Includes attendance records, exam results, fee payments, and class with subjects.

---

### Update Student

```
PATCH /api/students/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body** (all optional):
```json
{
  "classId": "cm...",
  "firstName": "Updated",
  "lastName": "Name",
  "phone": "1112223333",
  "address": "New Address",
  "dateOfBirth": "2009-05-20",
  "gender": "FEMALE",
  "guardianName": "New Guardian",
  "guardianPhone": "9998887777"
}
```

---

### Delete Student

```
DELETE /api/students/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`

Deletes the student profile and deactivates the associated user account.

**Response:**
```json
{
  "success": true,
  "message": "Student deleted and account deactivated."
}
```

---

### Assign Class

```
PATCH /api/students/:id/assign-class
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body:**
```json
{
  "classId": "cm..."
}
```

---

### Toggle Student Status

```
PATCH /api/students/:id/status
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body:**
```json
{
  "isActive": false
}
```

**Response:**
```json
{
  "success": true,
  "data": { "userId": "cm...", "isActive": false }
}
```

---

## Teachers (`/api/teachers`)

All endpoints require auth.

### Create Teacher Profile

```
POST /api/teachers
```

Roles: `SUPER_ADMIN`, `ADMIN`

Links an existing user (with role `TEACHER`) to a teacher profile.

**Request body:**
```json
{
  "userId": "cm...",
  "qualification": "M.Sc. Mathematics",
  "specialization": "Mathematics"
}
```

**Response** `201`:
```json
{
  "success": true,
  "data": {
    "id": "cm...",
    "userId": "cm...",
    "teacherId": "TCH26001",
    "qualification": "M.Sc. Mathematics",
    "specialization": "Mathematics",
    "joinDate": "...",
    "user": { "id": "...", "firstName": "...", "lastName": "...", "email": "..." }
  }
}
```

---

### List Teachers

```
GET /api/teachers
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

**Query params:** `?page=1&limit=10&search=John`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm...",
      "teacherId": "TCH26001",
      "qualification": "...",
      "specialization": "...",
      "joinDate": "...",
      "user": { "id": "...", "firstName": "John", "lastName": "Doe", "email": "...", "isActive": true },
      "_count": { "classes": 1, "subjects": 2 }
    }
  ],
  "pagination": { ... }
}
```

---

### Get Teacher by ID

```
GET /api/teachers/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

Includes assigned classes and subjects.

---

### Update Teacher

```
PATCH /api/teachers/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body** (all optional):
```json
{
  "qualification": "Ph.D. Physics",
  "specialization": "Physics"
}
```

---

### Delete Teacher

```
DELETE /api/teachers/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`

---

### Assign Class Teacher

```
POST /api/teachers/assign-class
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body:**
```json
{
  "teacherId": "cm...",
  "classId": "cm..."
}
```

Updates the class with the teacher as class teacher.

---

### Assign Subject Teacher

```
POST /api/teachers/assign-subject
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body:**
```json
{
  "teacherId": "cm...",
  "subjectId": "cm..."
}
```

Assigns the teacher to the subject.

---

## Classes (`/api/classes`)

All endpoints require auth.

### Create Class

```
POST /api/classes
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body:**
```json
{
  "name": "Class 10",
  "section": "A",
  "room": "101"
}
```

---

### List Classes

```
GET /api/classes
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

**Query params:** `?page=1&limit=10`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm...",
      "name": "Class 10",
      "section": "A",
      "room": "101",
      "classTeacher": { "user": { "firstName": "John", "lastName": "Doe" } },
      "_count": { "students": 30, "subjects": 6, "exams": 4 }
    }
  ],
  "pagination": { ... }
}
```

---

### Get Class by ID

```
GET /api/classes/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

Includes students, subjects with assigned teachers, and class teacher info.

---

### Update Class

```
PATCH /api/classes/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body** (all optional):
```json
{
  "name": "Class 10",
  "section": "B",
  "room": "202"
}
```

---

### Delete Class

```
DELETE /api/classes/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`

---

## Subjects (`/api/subjects`)

All endpoints require auth.

### Create Subject

```
POST /api/subjects
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body:**
```json
{
  "name": "Mathematics",
  "code": "MTH10",
  "classId": "cm..."
}
```

---

### List Subjects

```
GET /api/subjects
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

**Query params:** `?page=1&limit=10&classId=cm...`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm...",
      "name": "Mathematics",
      "code": "MTH10",
      "classId": "cm...",
      "teacherId": "cm...",
      "class": { "id": "...", "name": "Class 10" },
      "teacher": { "user": { "firstName": "John", "lastName": "Doe" } }
    }
  ],
  "pagination": { ... }
}
```

---

### Get Subject by ID

```
GET /api/subjects/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

---

### Update Subject

```
PATCH /api/subjects/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body** (all optional):
```json
{
  "name": "Advanced Mathematics",
  "code": "ADV_MTH10"
}
```

---

### Delete Subject

```
DELETE /api/subjects/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`

---

## Attendance (`/api/attendance`)

All endpoints require auth.

### Mark Attendance

```
POST /api/attendance
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

Uses upsert — if a record already exists for the same student + class + date, it is updated.

**Request body:**
```json
{
  "records": [
    { "studentId": "cm...", "status": "PRESENT", "remark": "" },
    { "studentId": "cm...", "status": "ABSENT", "remark": "Sick" }
  ],
  "classId": "cm...",
  "date": "2026-05-14"
}
```

Status values: `PRESENT`, `ABSENT`, `LATE`, `EXCUSED`.

**Response** `201`:
```json
{
  "success": true,
  "data": [ ... ],
  "message": "Marked 2 students."
}
```

---

### Get Attendance Summary

```
GET /api/attendance/summary
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

**Query params:** `?classId=cm...&startDate=2026-01-01&endDate=2026-06-30`

**Response:**
```json
{
  "success": true,
  "data": {
    "student_id_1": { "PRESENT": 15, "ABSENT": 2, "LATE": 1, "EXCUSED": 0 },
    "student_id_2": { "PRESENT": 17, "ABSENT": 0, "LATE": 1, "EXCUSED": 0 }
  }
}
```

---

### Get Attendance by Class

```
GET /api/attendance/class/:classId
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

**Query params:** `?date=2026-05-14&page=1&limit=10`

---

### Get Attendance by Student

```
GET /api/attendance/student/:studentId
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`, `STUDENT`, `PARENT`

**Query params:** `?page=1&limit=10`

---

### Update Attendance Record

```
PATCH /api/attendance/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

**Request body:**
```json
{
  "status": "LATE",
  "remark": "Arrived late"
}
```

---

## Exams (`/api/exams`)

All endpoints require auth.

### Create Exam

```
POST /api/exams
```

Roles: `SUPER_ADMIN`, `ADMIN`

**Request body:**
```json
{
  "name": "Mid Term Exam",
  "classId": "cm...",
  "subjectId": "cm...",
  "date": "2026-06-15",
  "totalMarks": 100,
  "passMarks": 40
}
```

---

### List Exams

```
GET /api/exams
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

**Query params:** `?page=1&limit=10&classId=cm...&subjectId=cm...`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm...",
      "name": "Mid Term Exam",
      "classId": "...",
      "subjectId": "...",
      "date": "2026-06-15T00:00:00.000Z",
      "totalMarks": 100,
      "passMarks": 40,
      "class": { ... },
      "subject": { ... },
      "_count": { "results": 25 }
    }
  ],
  "pagination": { ... }
}
```

---

### Get Exam by ID

```
GET /api/exams/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

Includes results with student names, ordered by marks descending.

---

### Update Exam

```
PATCH /api/exams/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`

---

### Delete Exam

```
DELETE /api/exams/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`

---

### Record Exam Results

```
POST /api/exams/:examId/results
```

Roles: `SUPER_ADMIN`, `ADMIN`, `TEACHER`

Uses upsert — if a result already exists for the student + exam, it is updated. Grades are auto-calculated.

**Grade scale:** F (< passMarks), E (50-59%), D (60-69%), C (70-79%), B (80-89%), A (80-89%), A+ (>=90%)

**Request body:**
```json
{
  "results": [
    { "studentId": "cm...", "marksObtained": 85 },
    { "studentId": "cm...", "marksObtained": 42 }
  ]
}
```

---

## Fees (`/api/fees`)

All endpoints require auth.

### Create Fee

```
POST /api/fees
```

Roles: `SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`

**Request body:**
```json
{
  "name": "Tuition Fee - Term 1",
  "amount": 5000,
  "classId": "cm...",
  "dueDate": "2026-05-01",
  "academicYear": "2026-2027"
}
```

---

### List Fees

```
GET /api/fees
```

Roles: `SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`, `TEACHER`

**Query params:** `?page=1&limit=10&classId=cm...&academicYear=2026-2027`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm...",
      "name": "Tuition Fee - Term 1",
      "amount": 5000,
      "classId": "...",
      "dueDate": "2026-05-01T00:00:00.000Z",
      "academicYear": "2026-2027",
      "class": { ... },
      "_count": { "payments": 20 }
    }
  ],
  "pagination": { ... }
}
```

---

### Get Fee by ID

```
GET /api/fees/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`, `TEACHER`, `STUDENT`, `PARENT`

Includes all payments with student names.

---

### Update Fee

```
PATCH /api/fees/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`

---

### Delete Fee

```
DELETE /api/fees/:id
```

Roles: `SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`

---

### Record Payment

```
POST /api/fees/:feeId/payments
```

Roles: `SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`

Uses upsert — if a payment already exists for the same fee + student, it is updated.

**Request body:**
```json
{
  "studentId": "cm...",
  "amountPaid": 5000,
  "paymentMethod": "CASH",
  "status": "PAID"
}
```

Status values: `PAID`, `UNPAID`, `PARTIAL`, `OVERDUE` (default: `PAID`).

---

### Get Payments by Student

```
GET /api/fees/payments/student/:studentId
```

Roles: `SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`, `TEACHER`, `STUDENT`, `PARENT`

**Query params:** `?page=1&limit=10`

---

## Dashboard (`/api/dashboard`)

### Get Dashboard Stats

```
GET /api/dashboard
```

Auth required (any role).

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "role": "SUPER_ADMIN", ... },
    "stats": {
      "totalUsers": 150,
      "totalStudents": 120,
      "totalTeachers": 15,
      "totalClasses": 8,
      "totalSubjects": 24,
      "totalExams": 6,
      "totalFeeAmount": 500000,
      "totalPaidAmount": 380000,
      "outstandingAmount": 120000
    },
    "recentPayments": [ ... ],
    "recentUsers": [ ... ],
    "notices": [
      { "type": "success", "title": "Server connected", "message": "...", "createdAt": "..." },
      { "type": "info", "title": "Authenticated session", "message": "...", "createdAt": "..." }
    ]
  }
}
```

---

## Error Codes

| Status | Meaning |
|--------|---------|
| 400 | Validation error — check the `error` field for details |
| 401 | Unauthenticated — missing or invalid token |
| 403 | Forbidden — your role does not permit this action |
| 404 | Resource not found |
| 409 | Conflict — duplicate email, admission number, etc. |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

## Common Error Response

```json
{
  "success": false,
  "error": "Email already taken."
}
```
