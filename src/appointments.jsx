import React from 'react';

const AppointmentsList = ({ appointments }) => {
  return (
    <div>
      <h1>Appointments List</h1>
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
              <td>{appointment.appointmentTime}</td>
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
