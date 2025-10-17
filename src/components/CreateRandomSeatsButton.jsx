import Swal from "sweetalert2";
import { createRandomSeats } from "../services/AppService";

export const CreateRandomSeatsButton = ({ flightId, onGenerated }) => {
  const handleClick = async () => {
    const { value: seatCount } = await Swal.fire({
      title: "Generar asientos",
      input: "number",
      inputLabel: "Ingrese la cantidad de asientos a generar",
      inputPlaceholder: "Ej: 10",
      inputAttributes: { min: 1, step: 1 },
      showCancelButton: true,
      confirmButtonText: "Generar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#f4c542",
      preConfirm: (value) => {
        if (!value || value <= 0) {
          Swal.showValidationMessage("Debe ingresar un número válido");
        }
      },
    });

    if (!seatCount) return;

    try {
      const result = await createRandomSeats({flightId: flightId, numberOfSeats:parseInt(seatCount, 10)});

      if (!result || result.error) {
        throw (
          result?.data ??
          result?.message ??
          new Error("Error al generar asientos")
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Asientos generados",
        text: `Se generaron ${seatCount} asientos correctamente.`,
        confirmButtonColor: "#f4c542",
      });

      // Llamar al callback para que el padre actualice los datos
      onGenerated();

    } catch (error) {
      console.error("createRandomSeats error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          (error?.data?.message ?? error?.message) ||
          "No se pudieron generar los asientos.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <button
      className="btn btn-warning text-dark fw-semibold"
      style={{ height: "45px", fontSize: "1rem" }}
      onClick={handleClick}
    >
      Generar asientos
    </button>
  );
};
