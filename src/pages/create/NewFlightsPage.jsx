import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFlight } from "../../services/AppService";

export const NewFlightsPage = () => {
  const [form, setForm] = useState({
    id: "",
    origin: "",
    destination: "",
    date: "2025-10-20",
    hour: "13:20:22",
    airlineId: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const flight = {
      id: form.id.trim(),
      origin: form.origin.trim(),
      destination: form.destination.trim(),
      date: form.date,
      hour: form.hour,
      airlineId: Number(form.airlineId),
    };

    try {
      const result = await createFlight(flight);
      console.log(result);
      if (!result) {
        setError("Error al crear el vuelo. Intenta de nuevo.");
        return;
      }

      navigate("/flights");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al conectar con el servidor.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear nuevo vuelo</h2>

      <div className="col-md-8 col-lg-6 mx-auto">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <input
              id="id"
              name="id"
              type="text"
              className="form-control"
              value={form.id}
              onChange={handleChange}
              placeholder="Ej. ABC123"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="origin" className="form-label">
              Origen
            </label>
            <input
              id="origin"
              name="origin"
              type="text"
              className="form-control"
              value={form.origin}
              onChange={handleChange}
              placeholder="Origen del vuelo"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="destination" className="form-label">
              Destino
            </label>
            <input
              id="destination"
              name="destination"
              type="text"
              className="form-control"
              value={form.destination}
              onChange={handleChange}
              placeholder="Destino del vuelo"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Fecha
            </label>
            <input
              id="date"
              name="date"
              type="text"
              className="form-control"
              value={form.date}
              onChange={handleChange}
              placeholder="Fecha del vuelo (AAAA/MM/DD)"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="hour" className="form-label">
              Hora
            </label>
            <input
              id="hour"
              name="hour"
              type="text"
              className="form-control"
              value={form.hour}
              onChange={handleChange}
              placeholder="Hora del vuelo"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="airlineId" className="form-label">
              ID Aerolinea
            </label>
            <input
              id="airlineId"
              name="airlineId"
              type="text"
              className="form-control"
              value={form.airlineId}
              onChange={handleChange}
              placeholder="ID de la aerolinea"
              required
            />
          </div>

          <div className="d-flex justify-content-start">
            <button type="submit" className="btn btn-success me-3">
              Crear
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/flights")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
