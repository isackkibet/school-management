import { createBrowserRouter } from "react-router";
import Login from "./src/app/pages/Login";
import LandingPage from "./src/app/pages/LandingPage";
import AdminDashboard from "./src/app/pages/AdminDashboard";
import Students from "./src/app/pages/Students";
import Attendance from "./src/app/pages/Attendance";
import Exams from "./src/app/pages/Exams";
import Fees from "./src/app/pages/Fees";
import Layout from "./src/app/components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "students", Component: Students },
      { path: "attendance", Component: Attendance },
      { path: "exams", Component: Exams },
      { path: "fees", Component: Fees },
    ],
  },
]);
