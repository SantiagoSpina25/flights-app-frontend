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
      <div className="container mt-5 text-center">
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
    <div className="container mt-5">
      <h2 className="text-center mb-5 display-6 fw-bold text-dark">
        Tabla de aerolineas
      </h2>
      {user.admin ? <CreateButton table={"airlines"} /> : <></>}
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
          <TableHead table={"airlines"} admin={user.admin} />
          <tbody>
            {airlines.map((airline) => (
              <tr key={airline.id} style={{ height: "65px" }}>
                <td className="text-center fw-semibold">{airline.id}</td>
                <td>{airline.name}</td>
                <td>{airline.description}</td>
                <td>
                  {airline.flights.length > 0 ? (
                    airline.flights.map((f) => f.id).join(", ")
                  ) : (
                    <span className="text-muted">Sin vuelos</span>
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
    </div>
  );
};
