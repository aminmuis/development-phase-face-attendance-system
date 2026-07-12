import { Navigate, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AttendancePage from "./pages/AttendancePage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import HrdDashboard from "./pages/HrdDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/hr" element={<HrdDashboard />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}