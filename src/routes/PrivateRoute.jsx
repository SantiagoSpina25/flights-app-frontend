import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // no autenticado -> enviar a login
    return <Navigate to="/login" replace />;
  }

  return children;
};
