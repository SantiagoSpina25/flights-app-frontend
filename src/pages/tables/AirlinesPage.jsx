import { useContext, useEffect, useState } from "react";
import { RemoveButton } from "../../components/tables/RemoveButton";
import { TableHead } from "../../components/tables/TableHead";
import { deleteById, findAll } from "../../services/AppService";
import { CreateButton } from "../../components/tables/CreateButton";
import { AuthContext } from "../../context/AuthContext";

export const AirlinesPage = () => {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  //Obtiene las aerolineas del backend
  const getAirlines = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await findAll("airlines");
      setAirlines(result.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ??
        err?.response?.data ??
        err?.message ??
        "Error al cargar las aerolíneas"
      );
    } finally {
      setLoading(false);
    }
  };

  //Cuando cambie, obtiene las aerolineas
  useEffect(() => {
    getAirlines();
  }, []);

  const handlerRemoveAirline = async (id) => {
    const result = await deleteById("airlines", id);

    if (result == null) {
      console.log("Error al borrar");
      return;
    }

    //Filtra todos las aerolineas que no tengan el mismo id que el que fue eliminado
    setAirlines(airlines.filter((airline) => airline.id != id));
  };

  if (loading) {
    return (
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border" role="status"></div>
        <p className="mt-3">Cargando aerolíneas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{String(error)}</div>
        <div className="text-center">
          <button className="btn btn-secondary" onClick={getAirlines}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 fade-in">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h2 className="display-6 fw-bold mb-0" style={{ color: "#064093" }}>
          <i className="bi bi-building me-3"></i>
          Tabla de aerolíneas
        </h2>
        {user.admin && <CreateButton table={"airlines"} />}
      </div>

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div className="card-body p-0">
          {/* Desktop View */}
          <div
            className="table-responsive d-none d-lg-block"
            style={{
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            <table
              className="table table-hover align-middle mb-0"
              style={{
                fontSize: "1rem",
                width: "100%",
                minWidth: "1200px",
              }}
            >
              <TableHead table={"airlines"} admin={user.admin} />
              <tbody>
                {airlines.map((airline) => (
                  <tr key={airline.id} style={{ height: "60px" }}>
                    <td className="text-center fw-bold text-secondary">
                      #{airline.id}
                    </td>
                    <td className="fw-semibold">{airline.name}</td>
                    <td className="text-muted">{airline.description}</td>
                    <td>
                      {airline.flights.length > 0 ? (
                        <div className="d-flex flex-wrap gap-1">
                          {airline.flights.slice(0, 5).map((f) => (
                            <span
                              key={f.id}
                              className="badge bg-info text-dark rounded-pill"
                            >
                              {f.id}
                            </span>
                          ))}
                          {airline.flights.length > 5 && (
                            <span className="badge bg-secondary rounded-pill">
                              +{airline.flights.length - 5} más
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted small fst-italic">
                          Sin vuelos
                        </span>
                      )}
                    </td>
                    {user.admin ? (
                      <td className="text-center">
                        <RemoveButton
                          handlerRemove={handlerRemoveAirline}
                          id={airline.id}
                        />
                      </td>
                    ) : (
                      <></>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="d-lg-none p-3 bg-light">
            {airlines.map((airline) => (
              <div key={airline.id} className="card border-0 shadow-sm rounded-4 mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-light text-secondary border">#{airline.id}</span>
                  </div>

                  <h5 className="card-title fw-bold mb-2">{airline.name}</h5>
                  <p className="text-muted small mb-3">{airline.description}</p>

                  <div className="mb-3">
                    <small className="text-muted d-block mb-2 text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Vuelos</small>
                    {airline.flights.length > 0 ? (
                      <div className="d-flex flex-wrap gap-1">
                        {airline.flights.slice(0, 10).map((f) => (
                          <span
                            key={f.id}
                            className="badge bg-info text-dark rounded-pill"
                          >
                            {f.id}
                          </span>
                        ))}
                        {airline.flights.length > 10 && (
                          <span className="badge bg-secondary rounded-pill">
                            +{airline.flights.length - 10} más
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted small fst-italic">
                        Sin vuelos
                      </span>
                    )}
                  </div>

                  {user.admin && (
                    <div className="d-flex justify-content-center mt-3 pt-3 border-top">
                      <RemoveButton
                        handlerRemove={handlerRemoveAirline}
                        id={airline.id}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
