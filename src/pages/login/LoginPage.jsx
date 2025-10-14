import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest } from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";

export const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.username.trim() || !form.password)
      return setError("Rellena usuario y contraseña.");

    setLoading(true);
    const res = await loginRequest(form);
    setLoading(false);

    if (!res || res.error) {
      const msg =
        res?.data?.message ??
        res?.data?.errors?.join(", ") ??
        res?.message ??
        "Error al iniciar sesión";
      setError(msg);
      return;
    }

    const { token, username } = res.data;
    if (!token) {
      setError("No se recibió token del servidor");
      return;
    }

    login({ token, username });
    navigate("/users");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Iniciar sesión</h2>
      <div className="col-md-6 col-lg-4 mx-auto">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <Link to="/register" className="btn btn-outline-secondary">
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
