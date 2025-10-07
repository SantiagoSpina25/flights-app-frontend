import { RemoveButton } from "../components/tables/RemoveButton";
import { TableHead } from "../components/tables/TableHead";

const initAirlines = [
  {
    id: 1,
    name: "Iberia",
    description: "Aerolineas iberia",
    flights: [
      {
        id: "IBE001",
        date: "2025-10-15",
        hour: "13:19:50",
        origin: "Málaga",
        destination: "Madrid",
        airlineName: "Iberia",
      },
      {
        id: "IBE002",
        date: "2025-11-02",
        hour: "13:20:04",
        origin: "Madrid",
        destination: "Barcelona",
        airlineName: "Iberia",
      },
      {
        id: "IBE003",
        date: "2025-11-10",
        hour: "13:20:10",
        origin: "Sevilla",
        destination: "Valencia",
        airlineName: "Iberia",
      },
    ],
  },
  {
    id: 2,
    name: "Air Europa",
    description: "Aerolínea española con vuelos nacionales e internacionales",
    flights: [
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
        id: "AER003",
        date: "2025-11-18",
        hour: "13:20:35",
        origin: "Barcelona",
        destination: "Roma",
        airlineName: "Air Europa",
      },
    ],
  },
  {
    id: 3,
    name: "Vueling",
    description: "Aerolínea de bajo coste con sede en Barcelona",
    flights: [],
  },
  {
    id: 4,
    name: "Ryanair",
    description:
      "Aerolínea irlandesa de bajo coste con amplia cobertura en Europa",
    flights: [],
  },
  {
    id: 5,
    name: "Lufthansa",
    description:
      "Principal aerolínea alemana con vuelos a destinos internacionales",
    flights: [],
  },
  {
    id: 6,
    name: "Air France",
    description:
      "Aerolínea nacional de Francia, reconocida por su servicio y red global",
    flights: [],
  },
];

export const AirlinesPage = () => {
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
            {initAirlines.map((airline) => (
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
