import axios from "axios";

export default class getByIdAppointmentService {
  getByIdAppointment (id, data) {
        return axios.get(
          `http://localhost:5000/api/Appointment/GetByIdAppointments/${id}`,
          data
        );
      }
}