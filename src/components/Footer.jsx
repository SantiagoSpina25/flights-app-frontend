import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Footer = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <footer className="bg-dark text-light py-4 mt-4 position-relative">
      <p className="mb-0 text-center">
        © {new Date().getFullYear()} Flights App
        ✈️
      </p>

      {isAuthenticated && user?.admin && (
        <span
          className="badge bg-warning text-dark"
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          🛡️ Administrador
        </span>
      )}
    </footer>
  );
};
