export const TableHead = ({ table }) => {
  const headersByTable = {
    users: ["ID", "Usuario", "Contraseña (Encriptada)", "Tickets", "Eliminar"],
    airlines: ["ID", "Nombre", "Descripción", "Vuelos", "Eliminar"],
    flights: ["ID", "Origen", "Destino", "Fecha", "Hora", "Estado", "Eliminar"],
    seats: ["ID", "Número", "Clase", "Estado", "Vuelo", "Eliminar"]
  };

  const headers = headersByTable[table] || [];

  return (
    <thead
      className="table-dark sticky-top"
      style={{ backgroundColor: "#6A1B2A", top: 0, zIndex: 2 }}
    >
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="py-3 px-4 text-center">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};
