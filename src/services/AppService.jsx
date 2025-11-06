import apiClient from "./ApiClient";

//GET
export const findAll = async (table) => {
  try {
    const response = await apiClient.get("/" + table);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const findById = async (table, id) => {
  try {
    const response = await apiClient.get("/" + table + "/" + id);
    return response;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error("Response body:", error.response.data);
    }
  }
  return null;
};

//POST
export const createUser = async ({ username, password }) => {
  try {
    const response = await apiClient.post("/users/register", {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createAirline = async ({ name, description }) => {
  try {
    const response = await apiClient.post("/airlines", {
      name,
      description,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createFlight = async ({
  id,
  originAirportId,
  destinationAirportId,
  date,
  hour,
  airlineId,
}) => {
  try {
    const response = await apiClient.post("/flights", {
      id,
      originAirportId,
      destinationAirportId,
      date,
      hour,
      airlineId,
    });

    return response;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error("Response body:", error.response.data);
    }
  }
  return null;
};

export const createSeat = async ({ number, class_type, status, flightId }) => {
  try {
    const response = await apiClient.post("/seats", {
      number,
      class_type,
      status,
      flightId,
    });

    return response;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error("Response body:", error.response.data);
    }
  }
  return null;
};

export const bookSeat = async ({ userId, seatId }) => {
  try {
    const response = await apiClient.post("/seats/book", { userId, seatId });
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Response body:", error.response.data);
    } else {
      console.error("Error inesperado en bookSeat:", error);
    }
    throw error;
  }
};

export const createRandomSeats = async ({ flightId, numberOfSeats }) => {
  try {
    const response = await apiClient.post("/flights/createSeats", {
      flightId,
      numberOfSeats,
    });

    return response;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error("Response body:", error.response.data);
    }
  }
  return null;
};

export const addBalance = async ({ id, balance }) => {
  try {
    const response = await apiClient.post("/users/addBalance", {
      id,
      balance,
    });

    return response;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error("Response body:", error.response.data);
    }
  }
  return null;
};

//TODO CONTROLAR CONSTRAINTS

//DELETE
export const deleteById = async (table, id) => {
  try {
    const response = await apiClient.delete("/" + table + "/" + id);
    return response;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error("Response body:", error.response.data);
    }
  }
  return null;
};
