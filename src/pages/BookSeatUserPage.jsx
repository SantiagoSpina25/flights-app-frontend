import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookSeat, findAll } from "../services/AppService";

export const BookSeatUserPage = () => {
  const { userIdParam } = useParams();
  const [form, setForm] = useState({ userId: userIdParam, seatId: "" });
  const [seatsIds, setSeatsIds] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await bookSeat(form);
    if (result) navigate(`/users/${userIdParam}`);
  };

  const getSeatsIds = async () => {
    try {
      const result = await findAll("seats");
      const availableSeats = result.data.filter((s) => s.status == "AVAILABLE");
      const availableSeatsIds = availableSeats.map((s) => {
        return s.id;
      });

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
          >
            <option value="">Selecciona el id del asiento</option>
            {seatsIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success me-3">
          Reservar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => navigate(`/users/${userIdParam}`)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
