import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/AppService";

export const NewUsersPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createUser(form);
    if (result) navigate("/users");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear nuevo usuario</h2>

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
