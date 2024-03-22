import React from "react";
import axios from "axios";

export default class AppointmentService {
  getApponitments() {
    return axios.get(
      "http://localhost:5000/api/Appointment/GetAllAppointments"
    );
  }

  getByIdApponitments(id) {
    return axios.get(
      "http://localhost:5000/api/Appointment/GetByIdAppointments?id=" + id
    );
  }

  postApponitments(data) {
    return axios.post(
      "http://localhost:5000/api/Appointment/CreateAppointments",
      data,
      {
        headers: {
          "Content-Type": "application/json", // İstek içeriğinin JSON formatında olduğunu belirtin
        },
      }
    );
  }
}
