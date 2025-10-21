import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TicketCard } from "../components/TicketCard";
import { findById } from "../services/AppService";

export const TicketsPage = () => {
  const { userId } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await findById("users", userId);

      setTickets(user.data.tickets);
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
      <h2 className="mb-4">Mis tickets</h2>

      {tickets.length === 0 ? (
        <div className="alert alert-info">No tienes tickets aún.</div>
      ) : (
        <div className="row g-3">
          {tickets.map((t, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <TicketCard
                ticket={t}
                // onClick={() => {
                //   // ruta de detalle: /tickets/:id o /flights/:flightId/tickets/:id
                //   // aqui vamos a /tickets/:id si existe id, si no usamos flightId
                //   const ticketId = t.id ?? `${t.flightId}-${t.seatNumber}`;
                //   navigate(`/tickets/${ticketId}`);
                // }}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
