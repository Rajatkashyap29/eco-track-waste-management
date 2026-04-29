import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import UserDashboard from "../pages/User/UserDashboard";
import StaffDashboard from "../pages/Staff/StaffDashboard";
import Profile from "../pages/Profile/Profile";

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

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;