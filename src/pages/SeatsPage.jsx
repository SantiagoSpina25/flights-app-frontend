import { RemoveButton } from "../components/tables/RemoveButton";
import { TableHead } from "../components/tables/TableHead";

const initSeats = [
  {
    id: 1,
    number: "1A",
    status: "SOLD",
    classType: "FIRST_CLASS",
    flightId: "IBE001",
  },
];

export const SeatsPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 display-6 fw-bold text-dark">
        Tabla de asientos
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
          <TableHead table={"seats"}/>
          <tbody>
            {initSeats.map((seat) => (
              <tr key={seat.id} style={{ height: "65px" }}>
                <td className="text-center fw-semibold">{seat.id}</td>
                <td>{seat.number}</td>
                <td>{seat.status}</td>
                <td>{seat.classType}</td>
                <td>{seat.flightId}</td>
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
