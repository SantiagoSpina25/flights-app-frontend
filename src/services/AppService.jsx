import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const findAll = async (table) => {
  try {
    const response = await axios.get(BASE_URL + "/" + table);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};
