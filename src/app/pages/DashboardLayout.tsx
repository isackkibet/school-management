import { Outlet, useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { GraduationCap, Users, ClipboardCheck, BookOpen, DollarSign, LogOut } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("userRole") || "admin";

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: GraduationCap },
    { path: "/dashboard/students", label: "Students", icon: Users },
    { path: "/dashboard/attendance", label: "Attendance", icon: ClipboardCheck },
    { path: "/dashboard/exams", label: "Exams", icon: BookOpen },
    { path: "/dashboard/fees", label: "Fees", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Kipsirwo Primary School</h1>
              <p className="text-sm text-green-100">P.O. Box 213, Kapsabet • "Education for Excellence"</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm font-medium capitalize">{role}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/20">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-88px)] p-4 shadow-sm">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={`w-full justify-start transition-all ${
                  location.pathname === item.path ? "bg-green-700 hover:bg-green-800" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
