import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BookOpen,
  DollarSign,
  LogOut,
  Settings,
  UserCircle,
  CalendarClock,
  BookMarked,
  MonitorPlay,
  HelpCircle
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("student");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (!savedRole) {
      navigate("/login");
    } else {
      setRole(savedRole);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/")
  };

  const getRoleName = () => {
    switch (role) {
      case 'admin': return 'Principal / Admin';
      case 'teacher': return 'Teacher';
      case 'accountant': return 'Accountant';
      case 'parent': return 'Parent/Guardian';
      case 'student': return 'Student';
      default: return 'User';
    }
  }

  // Define links so we can conditionally filter them by role
  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ["admin", "teacher", "accountant", "parent", "student"] },
    { name: "My Timetable", path: "#", icon: CalendarClock, roles: ["student"] },
    { name: "Homework & Tasks", path: "#", icon: BookMarked, roles: ["student", "parent"] },
    { name: "Learning Resources", path: "#", icon: MonitorPlay, roles: ["student"] },
    { name: "Students Directory", path: "/dashboard/students", icon: Users, roles: ["admin", "teacher"] },
    { name: "Attendance", path: "/dashboard/attendance", icon: ClipboardCheck, roles: ["admin", "teacher", "parent", "student"] },
    { name: "Exams & Grades", path: "/dashboard/exams", icon: BookOpen, roles: ["admin", "teacher", "parent", "student"] },
    { name: "Fee Management", path: "/dashboard/fees", icon: DollarSign, roles: ["admin", "accountant", "parent"] },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Header */}
      <header className="bg-gradient-to-r from-green-800 to-green-950 text-white p-4 shadow-xl z-10 relative">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 p-2 rounded-lg text-green-950 hidden sm:block">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Kipsirwo Primary</h1>
              <p className="text-green-200 text-xs font-semibold">P.O. Box 213, Kapsabet</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-green-900 px-3 py-1.5 rounded-full border border-green-700">
              <UserCircle className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold">{getRoleName()} Access</span>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-red-500 hover:text-white transition-colors border border-transparent hover:border-red-400">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Nav */}
        <nav className="w-64 bg-white shadow-[0_0_15px_rgba(0,0,0,0.05)] p-4 flex flex-col justify-between overflow-y-auto hidden md:flex">
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-3 mb-4 mt-2">Menu Portal</div>
            {navLinks.map((link) => {
              // Hide links that aren't allowed for the current logged in role
              if (!link.roles.includes(role)) return null;

              const isActive = location.pathname === link.path && link.path !== "#";
              return (
                <Link to={link.path} key={link.name} className="block">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start h-12 rounded-xl border ${isActive ? 'bg-green-50 text-green-700 border-green-200 font-bold shadow-sm' : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-green-700'}`}
                  >
                    <link.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-green-600' : 'text-slate-400'}`} />
                    {link.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col gap-1">
            <Button variant="ghost" className="w-full justify-start h-12 text-slate-500 hover:bg-slate-50">
              <HelpCircle className="w-5 h-5 mr-3" />
              Help & FAQ
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 text-slate-500 hover:bg-slate-50">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Button>
          </div>
        </nav>

        {/* Dynamic Outlet View Container */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-50 relative">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
