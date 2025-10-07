import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#6A1B2A" }}
    >
      <div className="container">
        <Link className="nav-link text-white" to="/">
          Flights-App
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/airlines">
                Aerolineas
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
      </div>
    </nav>
  );
};
