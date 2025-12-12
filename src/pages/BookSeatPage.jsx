import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookSeat, findAll } from "../services/AppService";
import Swal from "sweetalert2";

export const BookSeatPage = () => {
  const [form, setForm] = useState({ userId: "", seatId: "" });
  const [seats, setSeats] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoadingSubmit(true);

    try {
      const data = await bookSeat(form);

      await Swal.fire({
        icon: "success",
        title: "Asiento reservado",
        text: "La reserva se realizó correctamente.",
        confirmButtonColor: "#198754",
      });

      navigate("/users");
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        "Ocurrió un error al reservar el asiento.";

      Swal.fire({
        icon: "error",
        title: "No se pudo reservar",
        text: backendMessage,
        confirmButtonColor: "#d33",
      });

      setErrorMessage(backendMessage);
      console.error("Error al reservar:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const getSeats = async () => {
    try {
      const result = await findAll("seats");
      const availableSeats = result.data.filter((s) => s.status == "AVAILABLE");
      setSeats(availableSeats);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      const result = await findAll("users");
      setUsers(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSeats();
    getUsers();
  }, []);

  return (
    <div className="container mt-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div
              className="card-header text-white text-center py-4"
              style={{
                background: "linear-gradient(135deg, #064093 0%, #0077FF 100%)",
              }}
            >
              <h2 className="mb-0 fw-bold">
                <i className="bi bi-calendar-check-fill me-2"></i>
                Reservar para Usuario
              </h2>
            </div>
            <div className="card-body p-5 bg-light-subtle">
              {errorMessage && (
                <div className="alert alert-danger mb-4 shadow-sm rounded-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="userId" className="form-label fw-bold text-secondary">
                    Seleccionar Usuario
                  </label>
                  <select
                    id="userId"
                    name="userId"
                    className="form-select form-select-lg shadow-sm border-0"
                    onChange={handleChange}
                    value={form.userId}
                    required
                    style={{ backgroundColor: "#fff" }}
                  >
                    <option value="">-- Buscar usuario --</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username} (ID: {user.id}) - Balance: ${user.balance}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="seatId" className="form-label fw-bold text-secondary">
                    Seleccionar Asiento
                  </label>
                  <select
                    id="seatId"
                    name="seatId"
                    className="form-select form-select-lg shadow-sm border-0"
                    onChange={handleChange}
                    value={form.seatId}
                    required
                    style={{ backgroundColor: "#fff" }}
                  >
                    <option value="">-- Elige un asiento disponible --</option>
                    {seats.map((seat) => (
                      <option key={seat.id} value={seat.id}>
                        {seat.number} - {seat.classType} - ${seat.price} (Vuelo #{seat.flightId})
                      </option>
                    ))}
                  </select>
                  <div className="form-text mt-2 ms-1">
                    Solo se muestran los asientos con estado "AVAILABLE".
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-lg fw-bold text-white shadow-sm"
                    disabled={loadingSubmit}
                    style={{
                      background: "linear-gradient(to right, #961484, #DA498C)",
                      border: "none",
                    }}
                  >
                    {loadingSubmit ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        Confirmar Reserva <i className="bi bi-check-lg ms-2"></i>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg border-0"
                    onClick={() => navigate("/users")}
                    disabled={loadingSubmit}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
