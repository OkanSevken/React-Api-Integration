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
  },

  getAuthorizedData: async (endpoint) => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      throw new Error("User is not authenticated");
    }

    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${userId}` // Örnek olarak Bearer token olarak userId kullanılıyor.
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default loginService;
