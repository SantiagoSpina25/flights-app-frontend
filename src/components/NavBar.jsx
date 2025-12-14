import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const NavBar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          background: "linear-gradient(135deg, #064093 0%, #0077FF 50%, #3a88e8ff 100%)",
        }}
      >
        <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold text-white" to="/">
            Flights-App
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú principal */}
          <div
            className={`collapse navbar-collapse justify-content-center ${!isNavCollapsed ? "show" : ""
              }`}
            id="navbarNav"
          >
            {isAuthenticated && (
              <ul className="navbar-nav gap-3 text-center">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/users/${user.id}`}
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    Mis tickets
                  </Link>
                </li>
                {user.admin && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/users"
                      onClick={() => setIsNavCollapsed(true)}
                    >
                      Usuarios
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/airlines"
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    Aerolíneas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/flights"
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    Vuelos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/seats"
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    Asientos
                  </Link>
                </li>
              </ul>
            )}
            {/* Botones para móvil (d-lg-none) */}
            <div className="d-lg-none text-center mt-3">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsNavCollapsed(true);
                  }}
                  className="btn btn-custom-logout fw-semibold"
                >
                  Logout
                </button>
              ) : (
                <Link
                  className="btn btn-custom-logout fw-semibold"
                  to="/login"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="d-none d-lg-block">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="btn btn-custom-logout fw-semibold"
              >
                Logout
              </button>
            ) : (
              <Link className="btn btn-custom-logout fw-semibold" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
