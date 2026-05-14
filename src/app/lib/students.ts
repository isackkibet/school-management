import { apiRequest } from "./api";
import { getAuthToken } from "./auth";

export type SchoolClass = {
  id: string;
  name: string;
  section?: string | null;
  room?: string | null;
};

export type StudentRecord = {
  id: string;
  studentId: string;
  guardianName?: string | null;
  guardianPhone?: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
  };
  class: SchoolClass;
  feePayments?: Array<{ amountPaid: number; fee?: { amount: number } }>;
};

export type CreateStudentPayload = {
  studentId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string | null;
  classId: string;
  guardianName?: string;
  guardianPhone?: string;
};

export type UpdateStudentPayload = Partial<Omit<CreateStudentPayload, "email" | "password" | "studentId">>;

export async function fetchStudents(search = "", token = getAuthToken()) {
  if (!token) throw new Error("Please sign in to load students.");
  const query = new URLSearchParams({ limit: "100" });
  if (search.trim()) query.set("search", search.trim());

  const response = await apiRequest<StudentRecord[]>(`/students?${query.toString()}`, { token });
  return response.data || [];
}

export async function fetchClasses(token = getAuthToken()) {
  if (!token) throw new Error("Please sign in to load classes.");

  const response = await apiRequest<SchoolClass[]>("/classes?limit=100", { token });
  return response.data || [];
}

export async function createStudent(payload: CreateStudentPayload, token = getAuthToken()) {
  if (!token) throw new Error("Please sign in to register students.");

  const response = await apiRequest<StudentRecord>("/students", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });

  if (!response.data) throw new Error("The server did not return the new student.");
  return response.data;
}

export async function updateStudent(id: string, payload: UpdateStudentPayload, token = getAuthToken()) {
  if (!token) throw new Error("Please sign in to update students.");

  const response = await apiRequest<StudentRecord>(`/students/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(payload),
  });

  if (!response.data) throw new Error("The server did not return the updated student.");
  return response.data;
}

export async function deleteStudent(id: string, token = getAuthToken()) {
  if (!token) throw new Error("Please sign in to delete students.");

  await apiRequest<{ message?: string }>(`/students/${id}`, {
    method: "DELETE",
    token,
  });
}

export function getStudentBalance(student: StudentRecord) {
  return (student.feePayments || []).reduce((total, payment) => {
    const feeAmount = payment.fee?.amount || 0;
    return total + Math.max(feeAmount - payment.amountPaid, 0);
  }, 0);
}
