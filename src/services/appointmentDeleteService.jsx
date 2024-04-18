import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/Appointment";

const appointmentDeleteService = {
  deleteAppointment: async (data) => {
    return axios.post(`${API_BASE_URL}/DeleteAppointments`,data);
  }
};

export default appointmentDeleteService;