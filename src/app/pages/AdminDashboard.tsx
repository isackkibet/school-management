import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  AlertCircle,
  Award,
  Bell,
  BookOpen,
  ClipboardCheck,
  DollarSign,
  RefreshCw,
  School,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { ApiError } from "../lib/api";
import { fetchDashboardData, type DashboardData } from "../lib/dashboard";
import { clearAuthSession, getStoredUser, roleToPortalRole } from "../lib/auth";
import { getRoleTheme } from "../lib/roleTheme";

const formatKes = (value: number) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(value);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const storedUser = getStoredUser();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const role = roleToPortalRole(data?.user.role || storedUser?.role);
  const theme = getRoleTheme(role);

  const loadDashboard = async () => {
    setIsLoading(true);
    setError("");

    try {
      setData(await fetchDashboardData());
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : err instanceof TypeError
          ? "Cannot reach the server. Confirm the backend is running on port 5000."
          : err instanceof Error
            ? err.message
            : "Dashboard data could not be loaded.";

      setError(message);
      if (err instanceof ApiError && err.status === 401) {
        clearAuthSession();
        window.setTimeout(() => navigate("/login"), 900);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const visibleStats = useMemo(() => {
    const stats = data?.stats;
    if (!stats) return [];

    const base = [
      { label: "Students", value: stats.totalStudents, icon: Users, color: "text-blue-700", bg: "bg-blue-50" },
      { label: "Teachers", value: stats.totalTeachers, icon: UserCheck, color: "text-indigo-700", bg: "bg-indigo-50" },
      { label: "Classes", value: stats.totalClasses, icon: School, color: "text-emerald-700", bg: "bg-emerald-50" },
      { label: "Exams", value: stats.totalExams, icon: Award, color: "text-amber-700", bg: "bg-amber-50" },
    ];

    if (role === "student" || role === "parent") {
      return [
        { label: "Subjects", value: stats.totalSubjects, icon: BookOpen, color: "text-cyan-700", bg: "bg-cyan-50" },
        { label: "Classes", value: stats.totalClasses, icon: School, color: "text-emerald-700", bg: "bg-emerald-50" },
        { label: "Exams", value: stats.totalExams, icon: Award, color: "text-amber-700", bg: "bg-amber-50" },
        { label: "School Users", value: stats.totalUsers, icon: Users, color: "text-blue-700", bg: "bg-blue-50" },
      ];
    }

    if (role === "accountant") {
      return [
        { label: "Fee Target", value: formatKes(stats.totalFeeAmount), icon: DollarSign, color: "text-emerald-700", bg: "bg-emerald-50" },
        { label: "Collected", value: formatKes(stats.totalPaidAmount), icon: TrendingUp, color: "text-blue-700", bg: "bg-blue-50" },
        { label: "Outstanding", value: formatKes(stats.outstandingAmount), icon: AlertCircle, color: "text-orange-700", bg: "bg-orange-50" },
        { label: "Students", value: stats.totalStudents, icon: Users, color: "text-indigo-700", bg: "bg-indigo-50" },
      ];
    }

    return base;
  }, [data, role]);

  const quickActions = [
    { label: "Attendance", path: "/dashboard/attendance", icon: ClipboardCheck, roles: ["admin", "teacher"] },
    { label: "Students", path: "/dashboard/students", icon: Users, roles: ["admin", "teacher"] },
    { label: "Fees", path: "/dashboard/fees", icon: DollarSign, roles: ["admin", "accountant", "student", "parent"] },
    { label: "Exams", path: "/dashboard/exams", icon: Award, roles: ["admin", "teacher", "student", "parent"] },
  ].filter((action) => action.roles.includes(role));

  if (isLoading) {
    return (
      <div className="min-h-[55vh] flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border bg-white px-6 py-4 shadow-sm">
          <RefreshCw className={`h-5 w-5 animate-spin ${theme.accent}`} />
          <span className="font-bold text-slate-700">Loading dashboard from server...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-rose-100 bg-rose-50 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-rose-700">
            <AlertCircle className="h-5 w-5" />
            <p className="font-bold">{error}</p>
          </div>
          <Button onClick={loadDashboard} variant="outline" className="border-rose-200 text-rose-700 hover:bg-white">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const user = data?.user || storedUser;

  return (
    <div className="space-y-6 pb-8">
      <section className={`rounded-2xl bg-gradient-to-br ${theme.header} p-6 text-white shadow-lg`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Badge className="w-fit border-white/20 bg-white/15 text-white hover:bg-white/15">
              <ShieldCheck className="mr-2 h-3.5 w-3.5" />
              Live Server Dashboard
            </Badge>
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                {user ? `Welcome, ${user.firstName} ${user.lastName}` : "Welcome"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-medium text-white/80">
                {theme.label} data is loaded from the backend API using your authenticated session.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-white/60">Signed in as</p>
            <p className="mt-1 text-xl font-black">{user?.email}</p>
            <p className="text-sm font-bold text-white/75">{user?.role}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visibleStats.map((stat) => (
          <Card key={stat.label} className="border-slate-100 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                  <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
                <div className={`rounded-2xl p-3 ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className={`h-5 w-5 ${theme.accent}`} />
              Server Notices
            </CardTitle>
            <Button onClick={loadDashboard} variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {data?.notices.map((notice) => (
              <div key={`${notice.title}-${notice.createdAt}`} className="border-b border-slate-100 p-5 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 h-2.5 w-2.5 rounded-full ${notice.type === "success" ? "bg-emerald-500" : "bg-blue-500"}`} />
                  <div>
                    <p className="font-black text-slate-800">{notice.title}</p>
                    <p className="mt-1 text-sm font-medium text-slate-500">{notice.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 p-5">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                onClick={() => navigate(action.path)}
                className={`h-12 justify-start gap-3 text-white ${theme.button}`}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg">Recently Created Accounts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {data?.recentUsers.map((account) => (
              <div key={account.id} className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 last:border-b-0">
                <div>
                  <p className="font-black text-slate-800">{account.firstName} {account.lastName}</p>
                  <p className="text-sm font-medium text-slate-500">{account.email}</p>
                </div>
                <Badge variant="outline" className={getRoleTheme(roleToPortalRole(account.role)).badge}>
                  {account.role}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {data?.recentPayments.length ? data.recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 last:border-b-0">
                <div>
                  <p className="font-black text-slate-800">
                    {payment.student?.user ? `${payment.student.user.firstName} ${payment.student.user.lastName}` : "Student payment"}
                  </p>
                  <p className="text-sm font-medium text-slate-500">{payment.fee?.name || "Fee payment"}</p>
                </div>
                <p className="font-black text-slate-900">{formatKes(payment.amountPaid)}</p>
              </div>
            )) : (
              <div className="p-5 text-sm font-bold text-slate-500">No payments recorded yet.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

