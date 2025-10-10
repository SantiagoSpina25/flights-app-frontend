export const RemoveButton = ({ handlerRemove, id }) => {
  return (
    <button
      className="btn btn-danger"
      style={{
        width: "80%",
        height: "45px",
        fontSize: "1.3rem",
        fontWeight: "bold",
        lineHeight: "1",
      }}
      onClick={() => handlerRemove(id)}
    >
      X
    </button>
  );
};
