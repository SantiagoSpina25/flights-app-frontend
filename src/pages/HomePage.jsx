import { href } from "react-router-dom";

export const HomePage = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        minHeight: "80vh",
        background: "linear-gradient(135deg, #000000, #6A1B2A)",
        color: "white",
        padding: "2rem",
      }}
    >
      {/* Logo */}
      <img
        src="/app-logo.svg"
        alt="Flights App Logo"
        style={{
          width: "120px",
          height: "120px",
          objectFit: "contain",
          filter: "drop-shadow(0 0 5px rgba(255,255,255,0.2))",
        }}
      />

      {/* Título */}
      <h1 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>
        Bienvenido a <span style={{ color: "#FF6B81" }}>Flights-App</span>
      </h1>

      {/* Descripción */}
      <p className="lead" style={{ maxWidth: "600px", lineHeight: "1.8" }}>
        Administra de forma sencilla <strong>usuarios</strong>,{" "}
        <strong>aerolíneas</strong>, <strong>vuelos</strong> y{" "}
        <strong>asientos</strong> desde una sola plataforma moderna e intuitiva.
        Flights-App te ofrece control total y una interfaz adaptada a tus
        necesidades.
      </p>

      {/* Botón principal */}
      <a
        href="/flights"
        className="btn btn-light mt-4 px-4 py-2 fw-semibold"
        style={{
          borderRadius: "25px",
          boxShadow: "0 0 10px rgba(255,255,255,0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#FF6B81")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
      >
        Explorar vuelos
      </a>
    </div>
  );
};
