import { useNavigate } from "react-router-dom";

export const CreateButton = ({ table }) => {
  const navigate = useNavigate();

  const path = "/" + table + "/new";

  return (
    <button
      type="button"
      className={`btn btn-lg shadow-sm mb-2 text-white fw-bold`}
      style={{
        minWidth: "170px",
        background: "linear-gradient(to right, #961484, #DA498C)",
        border: "none",
        borderRadius: "50px",
        transition: "all 0.3s ease",
      }}
      onClick={() => navigate(path)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 5px 15px rgba(218, 73, 140, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <i className="bi bi-plus-lg me-2" />
      Nuevo registro
    </button>
  );
};
