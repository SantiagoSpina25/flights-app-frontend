import { RemoveButton } from "../components/tables/RemoveButton";
import { TableHead } from "../components/tables/TableHead";

const initFlights = [
  {
    id: "AER001",
    date: "2025-10-20",
    hour: "13:20:22",
    origin: "Madrid",
    destination: "París",
    airlineName: "Air Europa",
  },
  {
    id: "AER002",
    date: "2025-11-05",
    hour: "13:20:28",
    origin: "Palma de Mallorca",
    destination: "Madrid",
    airlineName: "Air Europa",
  },
  {
    id: "IBE003",
    date: "2025-11-10",
    hour: "13:20:10",
    origin: "Sevilla",
    destination: "Valencia",
    airlineName: "Iberia",
  },
];

export const FlightsPage = () => {
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
          <TableHead table={"flights"}/>
          <tbody>
            {initFlights.map((flight) => (
              <tr key={flight.id} style={{ height: "65px" }}>
                <td className="text-center fw-semibold">{flight.id}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{flight.date}</td>
                <td>{flight.hour}</td>
                <td>{flight.airlineName}</td>
                <td className="text-center">
                  <RemoveButton/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
