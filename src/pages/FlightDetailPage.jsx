import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../services/AppService";

export const FlightDetailPage = () => {
  const { id } = useParams(); // /flights/{id}
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFlight = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await findById("flights", id);
      setFlight(result.data);
    } catch (error) {
      console.error(error);
      setError(
        error?.response?.data?.message ??
          err?.response?.data ??
          "Error al obtener los detalles del vuelo"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlight();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-light" role="status" />
          <p className="mt-3">Cargando vuelo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{String(error)}</div>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/flights")}
        >
          Volver a vuelos
        </button>
      </div>
    );
  }

  if (!flight) {
    return null;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-1">Vuelo {flight.id}</h2>
          <div className="text-muted">
            {flight.airlineName}
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/flights")}
          >
            Volver
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Principal */}
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Ruta</h5>
              <p className="mb-1">
                <strong>Origen:</strong> {flight.origin}
              </p>
              <p className="mb-1">
                <strong>Destino:</strong> {flight.destination}
              </p>

              <hr />

              <div className="d-flex flex-wrap gap-3">
                <div>
                  <strong>Fecha:</strong>{" "}
                  <span>{flight.date}</span>
                </div>
                <div>
                  <strong>Hora:</strong> <span>{flight.hour}</span>
                </div>
              </div>

            </div>
          </div>

          {/* lista de asientos */}
          {/* {Array.isArray(flight.seats) && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Asientos</h5>
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead>
                      <tr>
                        <th>Número</th>
                        <th>Clase</th>
                        <th>Estado</th>
                        <th>Pasajero</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flight.seats.map((s) => (
                        <tr key={s.id ?? s.number}>
                          <td>{s.number}</td>
                          <td>{s.classType}</td>
                          <td>
                            <span
                              className={
                                s.status === "SOLD" || s.status === "OCCUPIED"
                                  ? "badge bg-danger"
                                  : s.status === "RESERVED"
                                  ? "badge bg-warning text-dark"
                                  : "badge bg-success"
                              }
                            >
                              {s.status ?? "N/A"}
                            </span>
                          </td>
                          <td>{s.passengerName ?? s.owner ?? "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )} */}
        </div>

        {/* Panel derecho con estadísticas */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm mb-4">
            <div className="card-body">
              <h6 className="card-title">Estado de asientos</h6>

              <div className="my-3">
                <div className="fs-1 fw-bold">{flight.seats.total}</div>
                <div className="text-muted">Total</div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold fs-4">{flight.seats.sold}</div>
                  <small className="text-muted">Ocupados</small>
                </div>
                <div>
                  <div className="fw-bold fs-4">{flight.seats.available}</div>
                  <small className="text-muted">Disponibles</small>
                </div>
              </div>

              <div className="progress mt-3" style={{ height: 10 }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${
                      flight.seats.total > 0 ? Math.round((flight.seats.sold / flight.seats.total) * 100) : 0
                    }%`,
                  }}
                  aria-valuenow={
                    flight.seats.total > 0 ? Math.round((flight.seats.sold / flight.seats.total) * 100) : 0
                  }
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          </div>

          {/* Acciones rápidas */}
          {/* <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Acciones</h6>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/flights/${id}/edit`)}
                >
                  Editar vuelo
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => window.print()}
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
