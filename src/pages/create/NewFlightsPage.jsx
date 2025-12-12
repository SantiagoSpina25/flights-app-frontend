import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFlight, findAll } from "../../services/AppService";

export const NewFlightsPage = () => {
  const fechaActual = new Date().toISOString().slice(0, 10); //Fecha predeterminada
  const horaActual = new Date().toTimeString().slice(0, 8); //Hora predeterminada

  const [form, setForm] = useState({
    id: "",
    origin: "",
    destination: "",
    date: fechaActual,
    hour: horaActual,
    airlineId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [airlinesIds, setAirlinesIds] = useState([]);
  const [airports, setAirports] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.id.trim()) return setError("El id del vuelo es requerido");
    if (!form.origin) return setError("Selecciona un aeropuerto de origen");
    if (!form.destination)
      return setError("Selecciona un aeropuerto de destino");
    if (!form.airlineId) return setError("Selecciona una aerolínea");

    const flight = {
      id: form.id.trim(),
      originAirportId: Number(form.origin),
      destinationAirportId: Number(form.destination),
      date: form.date,
      hour: form.hour,
      airlineId: Number(form.airlineId),
    };

    try {
      setLoading(true);
      const result = await createFlight(flight);
      setLoading(false);
      console.log(result);
      if (!result) {
        setError("Error al crear el vuelo. Intenta de nuevo.");
        return;
      }

      navigate("/flights");
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError("Ocurrió un error al conectar con el servidor.");
    }
  };

  const getAirports = async () => {
    try {
      const result = await findAll("airports");
      setAirports(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAirlinesIds = async () => {
    try {
      const result = await findAll("airlines");
      const airlinesIdsFound = result.data.map((a) => {
        return a.id;
      });

      setAirlinesIds(airlinesIdsFound);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAirlinesIds();
    getAirports();
  }, []);

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
            <label htmlFor="id" className="form-label required">
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
            <label htmlFor="origin" className="form-label required">
              Origen del vuelo
            </label>
            <select
              id="origin"
              name="origin"
              className="form-select"
              onChange={handleChange}
              value={form.origin}
              required
            >
              <option value="">Selecciona el origen del vuelo</option>
              {airports.map((a) => (
                <option key={a.id} value={a.id}>
                  {`${a.countryName} (${a.iataCode}) — ${a.city}`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="destination" className="form-label required">
              Destino
            </label>
            <select
              id="destination"
              name="destination"
              className="form-select"
              onChange={handleChange}
              value={form.destination}
              required
            >
              <option value="">Selecciona el destino del vuelo</option>
              {airports.map((a) => (
                <option key={a.id} value={a.id}>
                  {`${a.countryName} (${a.iataCode}) — ${a.city}`}
                </option>
              ))}
            </select>
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
            <label htmlFor="airlineId" className="form-label required">
              Id de la aerolinea
            </label>
            <select
              id="airlineId"
              name="airlineId"
              className="form-select"
              onChange={handleChange}
              value={form.airlineId}
            >
              <option value="">Selecciona el id de la aerolinea</option>
              {airlinesIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-start">
            <button
              type="submit"
              className="btn btn-success me-3"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear"}
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
