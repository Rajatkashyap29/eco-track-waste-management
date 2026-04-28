import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import UserDashboard from "../pages/User/UserDashboard";
import StaffDashboard from "../pages/Staff/StaffDashboard";

import Layout from "../components/Layout"; // ✅ add this

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing (no layout) */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Pages with Layout */}
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <Layout>
              <ForgotPassword />
            </Layout>
          }
        />

        {/* Dashboards (optional: layout later) */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;