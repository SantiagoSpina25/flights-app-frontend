import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSeat } from "../../services/AppService";

export const NewSeatsPage = () => {
  const [form, setForm] = useState({
    number: "",
    class_type: "",
    status: "AVAILABLE",
    flightId: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const seat = {
      number: form.number.trim(),
      class_type: form.class_type.trim(),
      status: form.status,
      flightId: form.flightId.trim(),
    };

    try {
      const result = await createSeat(seat);
      console.log(result);
      if (!result) {
        setError("Error al crear el asiento. Intenta de nuevo.");
        return;
      }

      navigate("/seats");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al conectar con el servidor.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear nuevo asiento</h2>

      <div className="col-md-8 col-lg-6 mx-auto">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Numero
            </label>
            <input
              id="number"
              name="number"
              type="text"
              className="form-control"
              value={form.number}
              onChange={handleChange}
              placeholder="Numero del asiento"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="class_type" className="form-label">
              Clase
            </label>
            <input
              id="class_type"
              name="class_type"
              type="text"
              className="form-control"
              value={form.class_type}
              onChange={handleChange}
              placeholder="Clase del asiento"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Estado
            </label>
            <input
              id="status"
              name="status"
              type="text"
              className="form-control"
              value={form.status}
              onChange={handleChange}
              placeholder="Estado del asiento"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="flightId" className="form-label">
              Id del vuelo
            </label>
            <input
              id="flightId"
              name="flightId"
              type="text"
              className="form-control"
              value={form.flightId}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-start">
            <button type="submit" className="btn btn-success me-3">
              Crear
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/seats")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
