import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../services/AuthService";

export const NewUsersPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    admin: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "radio" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.username.trim() || !form.password)
      return setError("Rellena usuario y contraseña.");
    const res = await registerRequest(form);

    if (!res || res.error) {
      const status = res.data.status;
      const msg = res.data.message;
      status == 409
        ? setError("Ya existe un usuario con ese nombre")
        : setError(msg);
      return;
    }

    navigate("/users");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear nuevo usuario</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label className="form-label required">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label required">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">¿Es admin?</label>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="admin"
                value="false"
                checked={form.admin === false}
                onChange={handleChange}
              />
              <label className="form-check-label">No</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="admin"
                value="true"
                checked={form.admin === true}
                onChange={handleChange}
              />
              <label className="form-check-label">Sí</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success me-3">
          Crear
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
