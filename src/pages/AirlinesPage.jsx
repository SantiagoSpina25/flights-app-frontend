import { useEffect, useState } from "react";
import { RemoveButton } from "../components/tables/RemoveButton";
import { TableHead } from "../components/tables/TableHead";
import { findAll } from "../services/AppService";

export const AirlinesPage = () => {
  const [airlines, setAirlines] = useState([]);

  //Obtiene las aerolineas del backend
  const getAirlines = async () => {
    const result = await findAll("airlines");
    setAirlines(result.data);
  };

  //Cuando cambie, obtiene las aerolineas
  useEffect(() => {
    getAirlines();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 display-6 fw-bold text-dark">
        Tabla de aerolineas
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
          <TableHead table={"airlines"} />
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
                <td className="text-center">
                  <RemoveButton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
