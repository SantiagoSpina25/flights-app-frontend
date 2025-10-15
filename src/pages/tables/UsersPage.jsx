import { useEffect, useState } from "react";
import { RemoveButton } from "../../components/tables/RemoveButton";
import { TableHead } from "../../components/tables/TableHead";
import { deleteById, findAll } from "../../services/AppService";
import { CreateButton } from "../../components/tables/CreateButton";
import { BookSeatButton } from "../../components/tables/BookSeatbutton";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);

  //Obtiene los usuarios del backend
  const getUsers = async () => {
    const result = await findAll("users");
    setUsers(result.data);
  };

  //Cuando cambie, obtiene los usuarios
  useEffect(() => {
    getUsers();
  }, []);

  const handlerRemoveUser = async (id) => {
    const result = await deleteById("users", id);

    if (result == null) {
      console.log("Error al borrar");
      return;
    }
    //Filtra todos los usuarios que no tengan el mismo id que el que fue eliminado
    setUsers(users.filter((user) => user.id != id));

  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 display-6 fw-bold text-dark">
        Tabla de usuarios
      </h2>
      <CreateButton table={"users"}/>
      <BookSeatButton/>
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
          <TableHead table={"users"} />
          <tbody>
            {users.map((user) => (
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
                  <RemoveButton
                    handlerRemove={handlerRemoveUser}
                    id={user.id}
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
