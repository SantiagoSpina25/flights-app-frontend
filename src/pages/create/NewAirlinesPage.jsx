import { useNavigate } from "react-router-dom";
import { createAirline } from "../../services/AppService";
import { useState } from "react";

export const NewAirlinesPage = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // validación sencilla
    if (!form.name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    try {
      setLoading(true);
      const result = await createAirline(form);
      setLoading(false);

      if (!result) {
        setError("Error al crear la aerolínea. Intenta de nuevo.");
        return;
      }

      navigate("/airlines");
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError("Ocurrió un error al conectar con el servidor.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear nueva aerolínea</h2>

      <div className="col-md-8 col-lg-6 mx-auto">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label required">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej. Iberia"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción corta de la aerolínea (opcional)"
            />
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
              onClick={() => navigate("/airlines")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
