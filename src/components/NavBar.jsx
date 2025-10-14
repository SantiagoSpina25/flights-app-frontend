import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#6A1B2A" }}
      >
        <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
          {/* Izquierda: título */}
          <Link className="navbar-brand fw-bold text-white" to="/">
            Flights-App
          </Link>

          {/* Botón responsive */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú principal (centrado) */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Usuarios
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/airlines">
                  Aerolíneas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/flights">
                  Vuelos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/seats">
                  Asientos
                </Link>
              </li>
            </ul>
          </div>

          {/* Derecha: login */}
          <div className="d-none d-lg-block">
            <Link className="nav-link text-white fw-semibold" to="/login">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
