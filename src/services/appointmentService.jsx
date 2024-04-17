import React from "react";
import axios from "axios";

export default class AppointmentService {
  getAppointments() {
    return axios.get(
      "http://localhost:5000/api/Appointment/GetAllAppointments"
    );
  }

  
  updateAppointment(id, data) {
    return axios.put(
      `http://localhost:5000/api/Appointment/UpdateAppointments/${id}`,
      data
    );
  }

  deleteAppointment(id) {
    return axios.delete(
      `http://localhost:5000/api/Appointment/DeleteAppointments/${id}`
    );
  }
}
// getByIdAppointments(id) {
  //   return axios.get(
  //     `http://localhost:5000/api/Appointment/GetByIdAppointments?id=${id}`
  //   );
  // }