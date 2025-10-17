import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para añadir Authorization si hay token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

//capturar 401/403 y redirigir al login (Sirve para cuando expira el token)
apiClient.interceptors.response.use(
  res => res,
  err => {
    const status = err?.response?.status;
    if (status === 403) {
      // limpiar sesión
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // redirigir al login (sin hooks)
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default apiClient;
