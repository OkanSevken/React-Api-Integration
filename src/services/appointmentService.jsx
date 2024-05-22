import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5013/api/Appointment";

export default class AppointmentService {
  getAuthHeaders() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      throw new Error("User is not authenticated");
    }
    return {
      headers: {
        'Authorization': `Bearer ${userId}`
      }
    };
  }

  async getAppointments() {
    try {
      const response = await axios.get(`${API_BASE_URL}/GetAllAppointments`, this.getAuthHeaders());
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateAppointment(id, data) {
    try {
      const response = await axios.put(`${API_BASE_URL}/UpdateAppointments/${id}`, data, this.getAuthHeaders());
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteAppointment(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/DeleteAppointments/${id}`, this.getAuthHeaders());
      return response;
    } catch (error) {
      throw error;
    }
  }
}
