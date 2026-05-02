import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import UserDashboard from "../pages/User/UserDashboard";

import ReportWaste from "../pages/User/ReportWaste";
import ComplaintDetail from "../pages/User/ComplaintDetail";
import MyComplaints from "../pages/User/MyComplaints";

import Profile from "../pages/Profile/Profile";
import HelpDesk from "../pages/shared/HelpDesk";
import About from "../pages/shared/About";

import Layout from "../components/Layout";

import CleaningRequests from "../pages/Admin/CleaningRequests";
import CleaningRequestDetail from "../pages/Admin/CleaningRequestDetail";

import StaffList from "../pages/Admin/StaffList";
import StaffDetail from "../pages/Admin/StaffDetail";

import UserList from "../pages/Admin/UserList";
import UserDetail from "../pages/Admin/UserDetail";

import AdminComplaints from "../pages/Admin/AdminComplaints";
import AdminComplaintDetail from "../pages/Admin/AdminComplaintDetail";

import StaffDashboard from "../pages/Staff/StaffDashboard";
import StaffTasks from "../pages/Staff/StaffTasks";
import StaffTaskDetail from "../pages/Staff/StaffTaskDetail";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING */}
        <Route path="/" element={<Layout><LandingPage /></Layout>} />

        {/* AUTH */}
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />

        {/* COMMON */}
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/help" element={<Layout><HelpDesk /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />

        {/* USER */}
        <Route path="/user" element={<Layout><UserDashboard /></Layout>} />
        <Route path="/report-waste" element={<Layout><ReportWaste /></Layout>} />
        <Route path="/complaints" element={<Layout><MyComplaints /></Layout>} />
        <Route path="/complaint/:id" element={<Layout><ComplaintDetail /></Layout>} />

        {/* ADMIN */}
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />

        <Route path="/request" element={<Layout><CleaningRequests /></Layout>} />
        <Route path="/request/:id" element={<Layout><CleaningRequestDetail /></Layout>} />

        <Route path="/staff-list" element={<Layout><StaffList /></Layout>} />
        <Route path="/staff-list/:id" element={<Layout><StaffDetail /></Layout>} />

        <Route path="/user-list" element={<Layout><UserList /></Layout>} />
        <Route path="/user-list/:id" element={<Layout><UserDetail /></Layout>} />

        <Route path="/admin/complaints" element={<Layout><AdminComplaints /></Layout>} />
        <Route path="/admin/complaints/:id" element={<Layout><AdminComplaintDetail /></Layout>} />

        {/* STAFF */}
        <Route path="/staff" element={<Layout><StaffDashboard /></Layout>} />
        <Route path="/staff/tasks" element={<Layout><StaffTasks /></Layout>} />
        <Route path="/staff/task/:id" element={<Layout><StaffTaskDetail /></Layout>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes; 