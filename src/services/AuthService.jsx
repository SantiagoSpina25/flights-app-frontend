import axios from "axios";
const BASE_URL = "https://flights-app-backend.onrender.com";

export const loginRequest = async ({ username, password }) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, { username, password });
    return res;
  } catch (err) {
    if (err.response)
      return {
        error: true,
        status: err.response.status,
        data: err.response.data,
      };
    return { error: true, message: err.message };
  }
};

export const registerRequest = async ({ username, password, admin }) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/users/register`, {
      username,
      password,
      admin,
    });
    return res;
  } catch (err) {
    if (err.response)
      return {
        error: true,
        status: err.response.status,
        data: err.response.data,
      };
    return { error: true, message: err.message };
  }
};
