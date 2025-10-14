import { useNavigate } from "react-router-dom";

export const BookSeatButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={`btn btn-warning btn-lg shadow-sm mb-2 ms-2`}
      style={{ minWidth: "130px" }}
      onClick={() => navigate("/users/bookSeat")}
    >
      <i className="bi bi-plus-lg me-2" />
      Reservar asiento
    </button>
  );
};
