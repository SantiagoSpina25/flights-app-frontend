import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../../services/AuthService";

export const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.username.trim() || !form.password) return setError("Rellena usuario y contraseña.");

    setLoading(true);
    const res = await registerRequest(form);
    setLoading(false);

    if (!res || res.error) {
      const msg = res?.data?.message ?? res?.data?.errors?.join(", ") ?? res?.message ?? "Error al registrarse";
      setError(msg);
      return;
    }

    // registro ok: redirigir al login (o auto-login si tu backend devuelve token)
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
            <input name="username" value={form.username} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success" type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear cuenta"}
            </button>
            <Link to="/login" className="btn btn-outline-secondary">Volver a login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
