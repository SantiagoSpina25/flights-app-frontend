import { useContext, useEffect, useState } from "react";
import { RemoveButton } from "../../components/tables/RemoveButton";
import { TableHead } from "../../components/tables/TableHead";
import { deleteById, findAll } from "../../services/AppService";
import { CreateButton } from "../../components/tables/CreateButton";
import { BookSeatButton } from "../../components/tables/BookSeatbutton";
import { AuthContext } from "../../context/AuthContext";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  //Obtiene los usuarios del backend
  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await findAll("users");
      setUsers(result.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ??
        err?.response?.data ??
        err?.message ??
        "Error al cargar los usuarios"
      );
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status"></div>
        <p className="mt-3">Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{String(error)}</div>
        <div className="text-center">
          <button className="btn btn-secondary" onClick={getUsers}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 display-6 fw-bold text-dark">
        Tabla de usuarios
      </h2>
      <CreateButton table={"users"} />
      <BookSeatButton />
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
          <TableHead table={"users"} admin={user.admin} />
          <tbody>
            {users.map((us) => (
              <tr key={us.id} style={{ height: "65px" }}>
                <td className="text-center fw-semibold">{us.id}</td>
                <td>{us.username}</td>
                <td>{`$${us.balance}`}</td>
                <td>{us.admin ? "✅" : "❌"}</td>
                <td>
                  {us.tickets.length > 0 ? (
                    us.tickets
                      .map(
                        (ticket) =>
                          ticket.flightId + " (" + ticket.seatNumber + ") "
                      )
                      .join(", ")
                  ) : (
                    <span className="text-muted">Sin tickets</span>
                  )}
                </td>
                {(user.admin && (user.id != us.id)) ? (
                  <td className="text-center">
                    <RemoveButton
                      handlerRemove={handlerRemoveUser}
                      id={us.id}
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
