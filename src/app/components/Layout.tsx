import { Outlet, Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BookOpen,
  DollarSign,
  LogOut
} from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl">Kipsirwo Primary School</h1>
            <p className="text-sm opacity-90">P.O. Box 213, Kapsabet, Kenya</p>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-green-800">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        <nav className="w-64 bg-white min-h-[calc(100vh-80px)] shadow-md p-4">
          <Link to="/dashboard">
            <Button variant="ghost" className="w-full justify-start mb-2">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/dashboard/students">
            <Button variant="ghost" className="w-full justify-start mb-2">
              <Users className="w-4 h-4 mr-2" />
              Students
            </Button>
          </Link>
          <Link to="/dashboard/attendance">
            <Button variant="ghost" className="w-full justify-start mb-2">
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Attendance
            </Button>
          </Link>
          <Link to="/dashboard/exams">
            <Button variant="ghost" className="w-full justify-start mb-2">
              <BookOpen className="w-4 h-4 mr-2" />
              Exams
            </Button>
          </Link>
          <Link to="/dashboard/fees">
            <Button variant="ghost" className="w-full justify-start mb-2">
              <DollarSign className="w-4 h-4 mr-2" />
              Fees
            </Button>
          </Link>
        </nav>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
