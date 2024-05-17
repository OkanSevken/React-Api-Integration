import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5013/api/Auth";

const loginService = {
  login: async (usernameSurname, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Login`, { usernameSurname, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default loginService;
