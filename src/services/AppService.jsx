import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

//GET
export const findAll = async (table) => {
  try {
    const response = await axios.get(BASE_URL + "/" + table);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

//POST
export const createUser = async ({ username, password }) => {
  try {
    const response = await axios.post(BASE_URL + "/users/register", {
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
    const response = await axios.post(BASE_URL + "/airlines", {
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
  origin,
  destination,
  date,
  hour,
  airlineId,
}) => {
  console.log(id, origin, destination, date, hour, airlineId);
  try {
    const response = await axios.post(BASE_URL + "/flights", {
      id,
      origin,
      destination,
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
    const response = await axios.post(BASE_URL + "/seats", {
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

//TODO CONTROLAR CONSTRAINTS

//DELETE
export const deleteById = async (table, id) => {
  try {
    const response = await axios.delete(BASE_URL + "/" + table + "/" + id);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};
