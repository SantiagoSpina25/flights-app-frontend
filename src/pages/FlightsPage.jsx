import { useEffect, useState } from "react";
import { RemoveButton } from "../components/tables/RemoveButton";
import { TableHead } from "../components/tables/TableHead";
import { deleteById, findAll } from "../services/AppService";

export const FlightsPage = () => {
  const [flights, setFlights] = useState([]);

  //Obtiene los vuelos del backend
  const getFlights = async () => {
    const result = await findAll("flights");
    setFlights(result.data);
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

    //TODO agregar un popup en vez del console log
    console.log("Vuelo borrado");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 display-6 fw-bold text-dark">
        Tabla de vuelos
      </h2>

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
          <TableHead table={"flights"} />
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id} style={{ height: "65px" }}>
                <td className="text-center fw-semibold">{flight.id}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{flight.date}</td>
                <td>{flight.hour}</td>
                <td>{flight.airlineName}</td>
                <td className="text-center">
                  <RemoveButton
                    handlerRemove={handlerRemoveFlight}
                    id={flight.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
