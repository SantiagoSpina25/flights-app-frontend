import { useNavigate } from "react-router-dom";

export const CreateButton = ({ table }) => {
  const navigate = useNavigate();

  const path = "/" + table + "/new";

  return (
    <button
      type="button"
      className={`btn btn-success btn-lg shadow-sm mb-2`}
      style={{ minWidth: "170px" }}
      onClick={() => navigate(path)}
    >
      <i className="bi bi-plus-lg me-2" />
      Nuevo registro
    </button>
  );
};
