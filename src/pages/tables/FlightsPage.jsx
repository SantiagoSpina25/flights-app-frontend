import { useContext, useEffect, useState } from "react";
import { RemoveButton } from "../../components/tables/RemoveButton";
import { TableHead } from "../../components/tables/TableHead";
import { deleteById, findAll } from "../../services/AppService";
import { CreateButton } from "../../components/tables/CreateButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //Obtiene los vuelos del backend
  const getFlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await findAll("flights");
      setFlights(result.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ??
        err?.response?.data ??
        err?.message ??
        "Error al cargar los vuelos"
      );
    } finally {
      setLoading(false);
    }
  };

  //Cuando cambie, obtiene los vuelos
  useEffect(() => {
    getFlights();
  }, []);

  const handlerRemoveFlight = async (id) => {
    const result = await deleteById("flights", id);

    if (result == null) {
      console.log("Error al borrar");
      return;
    }

    //Filtra todos los vuelos que no tengan el mismo id que el que fue eliminado
    setFlights(flights.filter((flight) => flight.id != id));
  };

  if (loading) {
    return (
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border" role="status"></div>
        <p className="mt-3">Cargando vuelos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{String(error)}</div>
        <div className="text-center">
          <button className="btn btn-secondary" onClick={getFlights}>
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
          <i className="bi bi-airplane-engines-fill me-3"></i>
          Tabla de vuelos
        </h2>
        {user.admin && <CreateButton table={"flights"} />}
      </div>

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div className="card-body p-0">
          <div
            className="table-responsive"
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
              <TableHead table={"flights"} admin={user.admin} />
              <tbody>
                {flights.map((flight) => (
                  <tr
                    key={flight.id}
                    style={{ height: "60px", cursor: "pointer" }}
                    onClick={() => navigate(`/flights/${flight.id}`)}
                    className="cursor-pointer"
                  >
                    <td className="text-center fw-bold text-secondary">
                      #{flight.id}
                    </td>
                    <td className="fw-semibold">
                      <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                      {flight.originCity}
                    </td>
                    <td className="fw-semibold">
                      <i className="bi bi-geo-alt-fill text-success me-1"></i>
                      {flight.destinationCity}
                    </td>
                    <td>
                      <i className="bi bi-calendar-event me-2 text-muted"></i>
                      {flight.date}
                    </td>
                    <td>
                      <i className="bi bi-clock me-2 text-muted"></i>
                      {flight.hour}
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {flight.airlineName}
                      </span>
                    </td>
                    {user.admin ? (
                      <td className="text-center">
                        <RemoveButton
                          handlerRemove={handlerRemoveFlight}
                          id={flight.id}
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
        </div>
      </div>
    </div>
  );
};
