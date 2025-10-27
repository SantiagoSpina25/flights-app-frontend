export const TicketCard = ({ ticket, onClick }) => {
  return (
    <div
      className="card h-100 shadow-sm"
      role="button"
      onClick={onClick}
      style={{ cursor: "pointer", transition: "transform .12s ease" }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="card-title mb-0">{ticket.flightId}</h5>
            <small className="text-muted">{ticket.airline}</small>
          </div>
          <div className="text-end">
            <div className="fw-bold">{ticket.seatNumber}</div>
            <small className="text-muted">{ticket.classType}</small>
          </div>
        </div>

        <p className="mb-2">
          <strong>{ticket.origin}</strong> → <strong>{ticket.destination}</strong>
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted d-block">{ticket.date}</small>
            <small className="text-muted">{ticket.hour}</small>
          </div>
        </div>
      </div>
    </div>
  );
};
