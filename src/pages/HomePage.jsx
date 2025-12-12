import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <div
        className="text-white text-center d-flex flex-column align-items-center justify-content-center"
        style={{
          minHeight: "65vh",
          background: "linear-gradient(135deg, #064093 0%, #0077FF 50%, #3a88e8ff 100%)",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
          borderBottomLeftRadius: "50% 20px",
          borderBottomRightRadius: "50% 20px",
        }}
      >
        <div className="container position-relative z-1">
          <div className="mb-4">
            <img
              src="/app-logo.svg"
              alt="Flights App Logo"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 15px rgba(255,255,255,0.4))",
              }}
            />
          </div>

          <h1 className="display-4 fw-bold mb-3">
            Bienvenido{user?.username ? `, ${user.username}` : ""} a{" "}
            <span
              style={{
                background: "linear-gradient(to right, #8d1a7eff, #b24192ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)", // Reduced shadow opacity as it can interfere with text-clip
              }}
            >
              Flights App
            </span>
          </h1>
          <p
            className="lead mb-5 mx-auto text-light"
            style={{ maxWidth: "700px", opacity: 0.95, textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
          >
            La plataforma integral para la gestión de tráfico aéreo. Controla
            vuelos, aerolíneas y pasajeros con una experiencia fluida, moderna y
            segura.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link
              to="/flights"
              className="btn btn-primary btn-lg px-5 fw-bold shadow-lg rounded-pill"
              style={{
                background: "linear-gradient(to right, #961484, #DA498C)",
                border: "none",
              }}
            >
              <i className="bi bi-airplane me-2"></i> Ver Vuelos
            </Link>
            {!user?.username && (
              <Link
                to="/login"
                className="btn btn-outline-light btn-lg px-5 fw-bold rounded-pill"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5 mt-5" style={{ marginTop: "-3rem" }}>
        <div className="row g-4 justify-content-center">
          <FeatureCard
            icon="bi-airplane-engines"
            title="Vuelos"
            desc="Consulta y programa vuelos nacionales e internacionales en tiempo real."
            color="primary"
            link="/flights"
          />
          <FeatureCard
            icon="bi-building"
            title="Aerolíneas"
            desc="Gestiona las compañías asociadas y sus flotas disponibles."
            color="success"
            link="/airlines"
          />
          <FeatureCard
            icon="bi-person-badge"
            title="Usuarios"
            desc="Administra perfiles de pasajeros, historial y preferencias."
            color="warning"
            link="/users"
          />
          <FeatureCard
            icon="bi-ui-checks-grid"
            title="Asientos"
            desc="Visualiza el mapa de asientos y gestiona la ocupación."
            color="danger"
            link="/seats"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="py-5 bg-light mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold text-dark mb-3">
                Gestión inteligente para tu aerolínea
              </h2>
              <p className="text-muted mb-4">
                Optimiza cada aspecto de tu operación. Desde la programación de
                vuelos hasta la asignación de asientos, nuestra plataforma te da
                el control total con herramientas analíticas y de gestión en
                tiempo real.
              </p>
              <ul className="list-unstyled text-muted">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Monitoreo en tiempo real
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Gestión de roles y permisos
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Interfaz intuitiva y rápida
                </li>
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <div className="p-5 rounded-4 bg-white shadow-sm border">
                <i className="bi bi-bar-chart-line-fill text-primary display-1"></i>
                <h4 className="mt-3 fw-bold">Estadísticas en vivo</h4>
                <p className="text-muted">
                  Próximamente: Dashboard con métricas detalladas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color, link }) => (
  <div className="col-md-6 col-lg-3">
    <Link to={link} className="text-decoration-none">
      <div
        className="card h-100 border-0 shadow-sm feature-card"
        style={{
          transition: "all 0.3s ease",
          cursor: "pointer",
          background: "white",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px)";
          e.currentTarget.style.boxShadow = "0 1rem 3rem rgba(0,0,0,.175)";
          // Change background to a subtle gradient based on color prop
          const gradients = {
            primary: "linear-gradient(135deg, #ffffff 0%, #e6f2ff 100%)",
            success: "linear-gradient(135deg, #ffffff 0%, #e6fffa 100%)",
            warning: "linear-gradient(135deg, #ffffff 0%, #fff9e6 100%)",
            danger: "linear-gradient(135deg, #ffffff 0%, #ffe6e6 100%)",
          };
          e.currentTarget.style.background = gradients[color] || "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
          e.currentTarget.style.background = "white";
        }}
      >
        <div className="card-body text-center p-4">
          <div
            className={`d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow-sm`}
            style={{
              width: "80px",
              height: "80px",
              background: `var(--bs-${color}-bg-subtle)`,
              color: `var(--bs-${color})`,
              transition: "transform 0.3s ease",
            }}
          >
            <i className={`bi ${icon} fs-1`}></i>
          </div>
          <h4 className="card-title fw-bold text-dark mb-3">{title}</h4>
          <p className="card-text text-muted">{desc}</p>
        </div>
      </div>
    </Link>
  </div>
);
