import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TicketCard } from "../components/TicketCard";
import { addBalance, findById } from "../services/AppService";
import { BookSeatButton } from "../components/tables/BookSeatbutton";
import Swal from "sweetalert2";

export const TicketsPage = () => {
  const { userId } = useParams();
  const [tickets, setTickets] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await findById("users", userId);

      setTickets(user.data.tickets);
      setBalance(user.data.balance);
    } catch (err) {
      setError(
        err?.response?.data?.message ??
          err?.response?.data ??
          err?.message ??
          "Error al cargar los tickets"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddBalance = async () => {
    const { value: newBalance } = await Swal.fire({
      title: "Agregar dinero",
      input: "number",
      inputLabel: "Ingrese la cantidad de dinero para agregar",
      inputPlaceholder: "Ej: $1000",
      inputAttributes: { step: 100 },
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#f4c542",
      preConfirm: (value) => {
        if (!value || value <= 0) {
          Swal.showValidationMessage("Debe ingresar un número válido");
        }
      },
    });

    if (!newBalance) return;

    try {
      const result = await addBalance({
        id: userId,
        balance: parseInt(newBalance),
      });

      if (!result || result.error) {
        throw (
          result?.data ??
          result?.message ??
          new Error("Error al agregar dinero")
        );
      }

      await getUser();

      await Swal.fire({
        icon: "success",
        title: "Dinero agregado",
        text: `Se agregaron $${newBalance} a la cuenta.`,
        confirmButtonColor: "#f4c542",
      });
    } catch (error) {
      console.error("addBalance error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          (error?.data?.message ?? error?.message) ||
          "No se pudo añadir dinero a la cuenta.",
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status"></div>
        <p className="mt-3">Cargando tus tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{String(error)}</div>
        <div className="text-center">
          <button className="btn btn-secondary" onClick={load}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Mis tickets</h2>
        <BookSeatButton id={userId} />
      </div>

      <div
        className="alert alert-success d-flex justify-content-between align-items-center shadow-sm"
        role="alert"
      >
        <div className="d-flex align-items-center">
          <i className="bi bi-cash-coin fs-4 me-2"></i>
          <strong>Tu balance actual:</strong>
        </div>

        <div className="d-flex align-items-center">
          <span className="fs-4 fw-bold me-3">${balance.toLocaleString()}</span>
          <button
            className="btn btn-outline-light btn-sm"
            style={{ backgroundColor: "#198754", borderColor: "#198754" }}
            onClick={() => handleAddBalance()}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Agregar dinero
          </button>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="alert alert-info">No tienes tickets aún.</div>
      ) : (
        <div className="row g-3">
          {tickets.map((t, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <TicketCard ticket={t} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
