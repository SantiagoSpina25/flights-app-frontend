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
      <div className="container mt-5 text-center">
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
    <div className="container mt-5">
      <h2 className="text-center mb-5 display-6 fw-bold text-dark">
        Tabla de vuelos
      </h2>

      {user.admin ? <CreateButton table={"flights"} /> : <></>}
      <div
        className="table-responsive"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
        }}
      >
        <table
          className="table table-bordered table-hover align-middle mb-0"
          style={{
            fontSize: "1.1rem",
            width: "100%",
            minWidth: "1200px",
          }}
        >
          <TableHead table={"flights"} admin={user.admin} />
          <tbody>
            {flights.map((flight) => (
              <tr
                key={flight.id}
                style={{ height: "65px", cursor: "pointer" }}
                onClick={() => navigate(`/flights/${flight.id}`)}
              >
                <td className="text-center fw-semibold">{flight.id}</td>
                <td>{flight.originCity}</td>
                <td>{flight.destinationCity}</td>
                <td>{flight.date}</td>
                <td>{flight.hour}</td>
                <td>{flight.airlineName}</td>
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
  );
};
