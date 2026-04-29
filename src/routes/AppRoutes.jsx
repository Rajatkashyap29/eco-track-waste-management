import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import UserDashboard from "../pages/User/UserDashboard";
import ReportWaste from "../pages/User/ReportWaste"
import ComplaintDetail from "../pages/User/ComplaintDetail"
import MyComplaints  from "../pages/User/MyComplaints"

import StaffDashboard from "../pages/Staff/StaffDashboard";
import Profile from "../pages/Profile/Profile";

import HelpDesk from "../pages/shared/HelpDesk"

import Layout from "../components/Layout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing (optional layout or separate) */}
        <Route path="/" element={<Layout><LandingPage /></Layout>} />

        {/* Auth */}
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />

        {/* USER FLOW (IMPORTANT 🔥) */}
        <Route path="/profile" element={<Layout><Profile /></Layout>} />

        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="/user" element={<Layout><UserDashboard /></Layout>} />
        <Route path="/staff" element={<Layout><StaffDashboard /></Layout>} />


        <Route path="/report-waste" element={<Layout><ReportWaste /></Layout>} />
        <Route path="/complaints" element={<Layout><MyComplaints /> </Layout>} />
        <Route path="/complaint/:id" element={<Layout><ComplaintDetail /> </Layout>} />



        <Route path="/help/" element={<Layout><HelpDesk /> </Layout>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;