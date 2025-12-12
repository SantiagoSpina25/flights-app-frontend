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
      <div className="container mt-5 text-center">
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
    <div className="container mt-5">
      <h2 className="text-center mb-5 display-6 fw-bold text-dark">
        Tabla de asientos
      </h2>
      {user.admin ? <CreateButton table={"seats"} /> : <></>}
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
          <TableHead table={"seats"} admin={user.admin} />
          <tbody>
            {seats.map((seat) => (
              <tr key={seat.id} style={{ height: "65px" }}>
                <td className="text-center fw-semibold">{seat.id}</td>
                <td>{seat.number}</td>
                <td>{seat.status}</td>
                <td>{seat.classType}</td>
                <td>{`$${seat.price}`}</td>
                <td>{seat.flightId}</td>
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
  );
};
