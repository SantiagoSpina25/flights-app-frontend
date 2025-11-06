import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookSeat, findAll } from "../services/AppService";
import Swal from "sweetalert2";

export const BookSeatUserPage = () => {
  const { userIdParam } = useParams();
  const [form, setForm] = useState({ userId: userIdParam, seatId: "" });
  const [seatsIds, setSeatsIds] = useState([]);
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

  useEffect(() => {
    getSeatsIds();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Reservar un asiento</h2>

      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <div className="mb-3">
          <h4>Id del usuario: {userIdParam}</h4>
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
          onClick={() => navigate(`/users/${userIdParam}`)}
          disabled={loadingSubmit}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
