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
