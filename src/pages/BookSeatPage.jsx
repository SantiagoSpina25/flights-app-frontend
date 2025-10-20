import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookSeat } from "../services/AppService";

export const BookSeatPage = () => {
  const [form, setForm] = useState({ userId: "", seatId: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await bookSeat(form);
    if (result) navigate("/users");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Reservar un asiento para un usuario</h2>

      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label className="form-label required">Id del usuario</label>
          <input
            type="text"
            name="userId"
            className="form-control"
            value={form.userId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label required">Id del asiento</label>
          <input
            type="text"
            name="seatId"
            className="form-control"
            value={form.seatId}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success me-3">
          Reservar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => navigate("/users")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
