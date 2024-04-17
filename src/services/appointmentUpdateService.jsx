import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/Appointment";

const appointmentUpdateService = {
  updateAppointment: async (data) => {
    return axios.post(`${API_BASE_URL}/UpdateAppointments`, data);
  }
};

export default appointmentUpdateService;
