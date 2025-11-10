import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSeat, findAll } from "../../services/AppService";

export const NewSeatsPage = () => {
  const [form, setForm] = useState({
    number: "",
    classType: "",
    status: "AVAILABLE",
    flightId: "",
  });
  const [error, setError] = useState(null);
  const [flightsIds, setFlightsIds] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const seat = {
      number: form.number.trim(),
      classType: form.class_type.trim().toUpperCase(),
      status: form.status.toUpperCase(),
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

  const getFlightsIds = async () => {
    try {
      const result = await findAll("flights");
      const flightsIdsFound = result.data.map((f) => {
        return f.id;
      });

      setFlightsIds(flightsIdsFound);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFlightsIds();
  }, []);

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
            <label htmlFor="number" className="form-label required">
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
            <select
              id="class_type"
              name="class_type"
              className="form-select"
              onChange={handleChange}
              value={form.class_type}
            >
              <option>Economy</option>
              <option>Business</option>
              <option>First_class</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Estado
            </label>
            <select
              id="status"
              name="status"
              className="form-select"
              onChange={handleChange}
              value={form.status}
            >
              <option>Available</option>
              <option>Sold</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="flightId" className="form-label required">
              Id del vuelo
            </label>
            <select
              id="flightId"
              name="flightId"
              className="form-select"
              onChange={handleChange}
              value={form.flightId}
            >
              <option value="">Selecciona el id del vuelo</option>
              {flightsIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
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
