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
    console.log(err)
    if (status === 401) {
      // Token inválido/expirado → cerrar sesión y redirigir
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    if (status === 403) {
      // Usuario autenticado pero sin permisos → NO cerrar sesión
      console.warn("No tienes permisos para realizar esta acción.");
      window.location.href = "/forbidden"; // O mostrar mensaje
    }

    return Promise.reject(err);
  }
);


export default apiClient;
