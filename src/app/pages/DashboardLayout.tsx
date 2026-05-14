import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { AlertCircle, Award, BookOpen, ClipboardCheck, DollarSign, GraduationCap, Heart, LogOut, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { AuthUser, clearAuthSession, fetchCurrentUser, getAuthToken, getStoredUser, roleToPortalRole } from "../lib/auth";
import { getRoleTheme } from "../lib/roleTheme";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [role, setRole] = useState(() => localStorage.getItem("userRole") || roleToPortalRole(getStoredUser()?.role));
  const [authStatus, setAuthStatus] = useState<"checking" | "ready" | "error">("checking");
  const [authMessage, setAuthMessage] = useState("Checking your session...");

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      const token = getAuthToken();
      if (!token) {
        clearAuthSession();
        navigate("/login");
        return;
      }

      try {
        const currentUser = await fetchCurrentUser(token);
        if (!active) return;
        setUser(currentUser);
        setRole(roleToPortalRole(currentUser.role));
        setAuthStatus("ready");
        setAuthMessage("");
      } catch (error) {
        if (!active) return;
        clearAuthSession();
        setAuthStatus("error");
        setAuthMessage(error instanceof Error ? error.message : "Your session could not be verified.");
        window.setTimeout(() => navigate("/login"), 1200);
      }
    };

    verifySession();

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login");
  };

  const theme = getRoleTheme(role);
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: GraduationCap, roles: ["admin", "teacher", "student", "parent", "accountant"] },
    { path: "/dashboard/parent-portal", label: "Parent Portal", icon: Heart, roles: ["admin", "parent"] },
    { path: "/dashboard/staff-portal", label: "Staff Portal", icon: BookOpen, roles: ["admin", "teacher"] },
    { path: "/dashboard/students", label: "Students", icon: Users, roles: ["admin", "teacher"] },
    { path: "/dashboard/attendance", label: "Attendance", icon: ClipboardCheck, roles: ["admin", "teacher"] },
    { path: "/dashboard/exams", label: "Exams & Results", icon: Award, roles: ["admin", "teacher", "student", "parent"] },
    { path: "/dashboard/fees", label: "Fees", icon: DollarSign, roles: ["admin", "accountant", "student", "parent"] },
  ].filter((item) => item.roles.includes(role));

  if (authStatus !== "ready") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-800">
            {authStatus === "checking" ? (
              <div className="h-5 w-5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-600" />
            )}
            <p className="font-bold">{authMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className={`bg-gradient-to-r ${theme.header} text-white px-4 py-4 shadow-lg sm:px-6`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-12 h-12 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Kipsirwo Primary School</h1>
              <p className="text-sm text-white/75">P.O. Box 213, Kapsabet - Education for Excellence</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3">
              <p className="text-xs font-black uppercase tracking-widest text-white/60">{theme.label}</p>
              <p className="text-sm font-black">{user ? `${user.firstName} ${user.lastName}` : role}</p>
              {user && <p className="text-xs font-medium text-white/70">{user.email}</p>}
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/20">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        <aside className="bg-white border-r border-slate-200 p-4 shadow-sm lg:min-h-[calc(100vh-104px)] lg:w-64">
          <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={`w-full justify-start transition-all ${
                  location.pathname === item.path ? `${theme.button} text-white` : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

