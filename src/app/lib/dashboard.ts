import { apiRequest } from "./api";
import { AuthUser, getAuthToken } from "./auth";

export type DashboardStats = {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSubjects: number;
  totalExams: number;
  totalFeeAmount: number;
  totalPaidAmount: number;
  outstandingAmount: number;
};

export type DashboardNotice = {
  type: "success" | "info" | "warning";
  title: string;
  message: string;
  createdAt: string;
};

export type RecentUser = Pick<AuthUser, "id" | "email" | "firstName" | "lastName" | "role" | "isActive"> & {
  createdAt: string;
};

export type RecentPayment = {
  id: string;
  amountPaid: number;
  paymentDate: string;
  status: string;
  fee?: { name: string; amount: number };
  student?: { user?: { firstName: string; lastName: string } };
};

export type DashboardData = {
  user: AuthUser;
  stats: DashboardStats;
  recentPayments: RecentPayment[];
  recentUsers: RecentUser[];
  notices: DashboardNotice[];
};

export async function fetchDashboardData(token = getAuthToken()) {
  if (!token) throw new Error("Please sign in to load dashboard data.");

  const response = await apiRequest<DashboardData>("/dashboard", { token });
  if (!response.data) throw new Error("The server did not return dashboard data.");

  return response.data;
}

