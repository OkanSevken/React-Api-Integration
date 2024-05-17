import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5013/api/Appointment";

const appointmentDeleteService = {
  deleteAppointment: async (data) => {
    return axios.post(`${API_BASE_URL}/DeleteAppointments`,data);
  }
};

export default appointmentDeleteService;