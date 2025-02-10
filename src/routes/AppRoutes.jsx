import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UsersList from "../pages/UsersList"; // Formerly Dashboard, now /users/
import UserDetails from "../pages/UserDetails";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="/users/" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
      <Route path="/users/:id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
