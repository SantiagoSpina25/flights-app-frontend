import { useContext, useEffect, useState } from "react";
import { RemoveButton } from "../../components/tables/RemoveButton";
import { TableHead } from "../../components/tables/TableHead";
import { deleteById, findAll } from "../../services/AppService";
import { CreateButton } from "../../components/tables/CreateButton";
import { AuthContext } from "../../context/AuthContext";

export const SeatsPage = () => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  //Obtiene los asientos del backend
  const getSeats = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await findAll("seats");
      setSeats(result.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ??
        err?.response?.data ??
        err?.message ??
        "Error al cargar los asientos"
      );
    } finally {
      setLoading(false);
    }
  };

  //Cuando cambie, obtiene los asientos
  useEffect(() => {
    getSeats();
  }, []);

  const handlerRemoveSeat = async (id) => {
    const result = await deleteById("seats", id);

    if (result == null) {
      console.log("Error al borrar");
      return;
    }

    //Filtra todos los asientos que no tengan el mismo id que el que fue eliminado
    setSeats(seats.filter((seat) => seat.id != id));
  };

  if (loading) {
    return (
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border" role="status"></div>
        <p className="mt-3">Cargando asientos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{String(error)}</div>
        <div className="text-center">
          <button className="btn btn-secondary" onClick={getSeats}>
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
          <i className="bi bi-ui-checks-grid me-3"></i>
          Tabla de asientos
        </h2>
        {user.admin && <CreateButton table={"seats"} />}
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
              <TableHead table={"seats"} admin={user.admin} />
              <tbody>
                {seats.map((seat) => (
                  <tr key={seat.id} style={{ height: "60px" }}>
                    <td className="text-center fw-bold text-secondary">
                      #{seat.id}
                    </td>
                    <td className="fw-semibold text-center">{seat.number}</td>
                    <td>
                      {seat.classType === "BUSINESS" ||
                        seat.classType === "FIRST_CLASS" ? (
                        <span className="badge bg-warning text-dark">
                          {seat.classType}
                        </span>
                      ) : (
                        <span className="badge bg-light text-dark border">
                          {seat.classType}
                        </span>
                      )}
                    </td>
                    <td>
                      {seat.status === "AVAILABLE" ? (
                        <span className="badge bg-success">Disponible</span>
                      ) : (
                        <span className="badge bg-danger">Ocupado</span>
                      )}
                    </td>
                    <td className="fw-bold">{`$${seat.price}`}</td>
                    <td className="text-muted">Vuelo #{seat.flightId}</td>
                    {user.admin ? (
                      <td className="text-center">
                        <RemoveButton
                          handlerRemove={handlerRemoveSeat}
                          id={seat.id}
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
