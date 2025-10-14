import Swal from 'sweetalert2';

export const RemoveButton = ({ handlerRemove, id }) => {

  //Muestra un dialog para confirmar si quiere borrar el registro
  const handleClick = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      handlerRemove(id); // elimina el registro
      Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
    }
  }

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
      onClick={handleClick}
    >
      X
    </button>
  );
};
