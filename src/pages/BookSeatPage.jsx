import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookSeat, findAll } from "../services/AppService";
import Swal from "sweetalert2";

export const BookSeatPage = () => {
  const [form, setForm] = useState({ userId: "", seatId: "" });
  const [seatsIds, setSeatsIds] = useState([]);
  const [usersIds, setUsersIds] = useState([]);
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

  const getSeatsIds = async () => {
    try {
      const result = await findAll("seats");
      const availableSeats = result.data.filter((s) => s.status == "AVAILABLE");
      const availableSeatsIds = availableSeats.map((s) => s.id);
      setSeatsIds(availableSeatsIds);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsersIds = async () => {
    try {
      const result = await findAll("users");
      const usersIdsFound = result.data.map((u) => u.id);
      setUsersIds(usersIdsFound);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSeatsIds();
    getUsersIds();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Reservar un asiento para un usuario</h2>

      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <div className="mb-3">
          <label htmlFor="userId" className="form-label required">
            Id del usuario
          </label>
          <select
            id="userId"
            name="userId"
            className="form-select"
            onChange={handleChange}
            value={form.userId}
            required
          >
            <option value="">Selecciona el id del usuario</option>
            {usersIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="seatId" className="form-label required">
            Id del asiento
          </label>
          <select
            id="seatId"
            name="seatId"
            className="form-select"
            onChange={handleChange}
            value={form.seatId}
            required
          >
            <option value="">Selecciona el id del asiento</option>
            {seatsIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-success me-3"
          disabled={loadingSubmit}
        >
          {loadingSubmit ? "Reservando..." : "Reservar"}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => navigate("/users")}
          disabled={loadingSubmit}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
