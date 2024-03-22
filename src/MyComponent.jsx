import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Appointment/GetAllAppointments');
        setAppointments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching appointments: ', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Appointments List</h2>
      <table>
        <thead>
          <tr>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Description</th>
            <th>Is Approved</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td>{new Date(appointment.appointmentTime).toLocaleTimeString()}</td>
              <td>{appointment.patientId}</td>
              <td>{appointment.doctorId}</td>
              <td>{appointment.description}</td>
              <td>{appointment.isApproved ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsList;
