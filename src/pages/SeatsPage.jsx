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
          <thead
            className="table-dark sticky-top"
            style={{ backgroundColor: "#6A1B2A", top: 0, zIndex: 2 }}
          >
            <tr>
              <th className="py-3 px-4 text-center">ID</th>
              <th className="py-3 px-4">Número</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Clase</th>
              <th className="py-3 px-4">Vuelo</th>
              <th className="py-3 px-4 text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {initSeats.map((seat) => (
              <tr key={seat.id} style={{ height: "65px" }}>
                <td className="text-center fw-semibold">{seat.id}</td>
                <td>{seat.number}</td>
                <td>{seat.status}</td>
                <td>{seat.classType}</td>
                <td>{seat.flightId}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger"
                    style={{
                      width: "80%",
                      height: "45px",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      lineHeight: "1",
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
