import axios from "axios";

const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/login", { email, password });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return { user, token };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default loginUser;
