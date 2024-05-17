import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5013/api/Appointment/";

const getByIdAppointmentService = {
  getByIdAppointment: async (id) => {
    return axios.get(`${API_BASE_URL}/GetByIdAppointments/${id}`);
  }
};

export default getByIdAppointmentService;



