import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest, registerRequest } from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";

export const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    admin: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

    setLoading(true);
    const res = await registerRequest(form);
    setLoading(false);

    if (!res || res.error) {
      const msg =
        res?.data?.message ??
        res?.data?.errors?.join(", ") ??
        res?.message ??
        "Error al registrarse";
      setError(msg);
      return;
    }

    //Loguea automaticamente
    const resLogin = await loginRequest(form);

    if (!resLogin || resLogin.error) {
      const msg =
        resLogin?.data?.message ??
        resLogin?.data?.errors?.join(", ") ??
        resLogin?.message ??
        "Error al iniciar sesión";
      setError(msg);
      return;
    }

    const { token, username } = resLogin.data;
    if (!token) {
      setError("No se recibió token del servidor");
      return;
    }

    login({ token, username });
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear cuenta</h2>
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

          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear cuenta"}
            </button>
            <Link to="/login" className="btn btn-outline-secondary">
              Volver a login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
