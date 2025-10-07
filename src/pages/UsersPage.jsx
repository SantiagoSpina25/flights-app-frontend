const initUsers = [
  {
    id: 1,
    username: "admin",
    password: "$2a$10$fWO6ysl71PcE2DY6zUDapukhDTiO4lniooENwJw4VcCK1bTgN7rWa",
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
  {
    id: 2,
    username: "user",
    password: "$2a$10$tZXN.mix91Xd02OewCBgoOljhG7IXxZrjjA7TjimAwvlbLZM8RQPi",
    tickets: [],
  },
  {
    id: 3,
    username: "pepe123",
    password: "$2a$10$W7oED2l1PFpXi.261YIu3.smJCkUxL4d9FICGhrBfEC/QycSAsaES",
    tickets: [],
  },
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
              <th className="py-3 px-4">Contraseña (Encriptada)</th>
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
                    user.tickets
                      .map(
                        (ticket) =>
                          ticket.flightId + " (" + ticket.seatNumber + ") "
                      )
                      .join(", ")
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
