import { Navigate, Route, Routes } from "react-router-dom";
import { AuthStatus } from ".";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
  const authStatus: AuthStatus = AuthStatus.authenticated;
  return (
    <Routes>
      {authStatus === AuthStatus.notAuthenticated ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
