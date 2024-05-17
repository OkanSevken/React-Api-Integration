import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5013/api/Auth";

const registerService = {
  register: async (name,surname,usernameSurname, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Register`, {name,surname, usernameSurname, password});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default registerService;
