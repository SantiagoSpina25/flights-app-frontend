import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookSeat, findAll, findById } from "../services/AppService";
import Swal from "sweetalert2";

export const BookSeatUserPage = () => {
  const { userIdParam } = useParams();
  const [form, setForm] = useState({ userId: userIdParam, seatId: "" });
  const [seats, setSeats] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      // Assuming findById or a similar method exists to get user details
      // Since findById wasn't imported, let's use findAll and find locally for now strictly following instructions to stay safe,
      // OR import findById if it exists in AppService (it was seen in TicketPage).
      // Let's import findById from service.
      const result = await findById("users", userIdParam);
      setUser(result.data);
    } catch (error) {
      console.error("Error al cargar usuario:", error);
    }
  };

  const getSeats = async () => {
    try {
      const result = await findAll("seats");
      const availableSeats = result.data.filter(
        (s) => s.status === "AVAILABLE"
      );
      setSeats(availableSeats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getSeats();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoadingSubmit(true);

    try {
      await bookSeat(form);

      await Swal.fire({
        icon: "success",
        title: "Asiento reservado",
        text: "La reserva se realizó correctamente.",
        confirmButtonColor: "#198754",
      });

      navigate(`/users/${userIdParam}`);
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Ocurrió un error al reservar el asiento.";

      Swal.fire({
        icon: "error",
        title: "No se pudo reservar",
        text: backendMessage,
        confirmButtonColor: "#d33",
      });

      setErrorMessage(backendMessage);
      console.error("bookSeat error (handled):", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

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
                <i className="bi bi-ticket-perforated-fill me-2"></i>
                Reservar Asiento
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
                {/* User Info Card */}
                <div className="card mb-4 border-0 shadow-sm bg-white">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="text-muted mb-1">Usuario</h6>
                      <h5 className="fw-bold mb-0 text-primary">
                        {user ? user.username : userIdParam}
                      </h5>
                    </div>
                    <div className="text-end">
                      <h6 className="text-muted mb-1">Balance Actual</h6>
                      <h4 className="fw-bold mb-0 text-success">
                        {user ? `$${user.balance}` : "Cargando..."}
                      </h4>
                    </div>
                  </div>
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
                    onClick={() => navigate(`/users/${userIdParam}`)}
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
