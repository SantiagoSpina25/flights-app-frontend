const initUsers = [
  {
    id: 1,
    username: "santiago",
    password: "test",
    tickets: [
      {
        flightId: "IBE001",
        airline: "Iberia",
        date: "2025-10-15",
        hour: "13:19:50",
        origin: "Málaga",
        destination: "Madrid",
        classType: "FIRST_CLASS",
        seatNumber: "1A",
      },
    ],
  },
  { id: 2, username: "pepe", password: "test", tickets: [] },
  { id: 3, username: "guardabarro", password: "test", tickets: [] },
  { id: 4, username: "maria", password: "test", tickets: [] },
  { id: 5, username: "juan", password: "test", tickets: [] },
  { id: 6, username: "ana", password: "test", tickets: [] },
  { id: 7, username: "carlos", password: "test", tickets: [] },
  { id: 8, username: "sofia", password: "test", tickets: [] },
  { id: 9, username: "pablo", password: "test", tickets: [] },
  { id: 10, username: "lucas", password: "test", tickets: [] },
];

export const UsersPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 display-6 fw-bold text-dark">
        Tabla de usuarios
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
              <th className="py-3 px-4">Usuario</th>
              <th className="py-3 px-4">Contraseña</th>
              <th className="py-3 px-4">Tickets</th>
              <th className="py-3 px-4 text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {initUsers.map((user) => (
              <tr key={user.id} style={{ height: "65px" }}>
                <td className="text-center fw-semibold">{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                  {user.tickets.length > 0 ? (
                    user.tickets.map(ticket=> ticket.flightId + " (" + ticket.seatNumber + ") ").join(", ")
                  ) : (
                    <span className="text-muted">Sin tickets</span>
                  )}
                </td>
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
