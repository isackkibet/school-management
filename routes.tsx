import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Exams from "./pages/Exams";
import Fees from "./pages/Fees";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
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
