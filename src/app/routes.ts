import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Exams from "./pages/Exams";
import Fees from "./pages/Fees";
import StaffPortal from "./pages/StaffPortal";
import ParentPortal from "./pages/ParentPortal";
import TimetableGenerator from "./pages/TimetableGenerator";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "staff-portal", Component: StaffPortal },
      { path: "students", Component: Students },
      { path: "attendance", Component: Attendance },
      { path: "exams", Component: Exams },
      { path: "fees", Component: Fees },
      { path: "parent-portal", Component: ParentPortal },
      { path: "timetable-generator", Component: TimetableGenerator },
    ],
  },
]);
