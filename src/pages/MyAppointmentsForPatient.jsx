import React, { useState, useEffect } from "react";
import { TableRow, TableHeaderCell, TableHeader, TableFooter, TableCell, TableBody, MenuItem, Icon, Menu, Table } from "semantic-ui-react";
import AppointmentService from "../services/appointmentService";
import { useNavigate } from 'react-router-dom';

function MyAppointmentsForPatient() {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      navigate('/Giris');
    } else {
      fetchAppointments(userId);
    }
  }, [currentPage]);

  const fetchAppointments = async (userId) => {
    const offset = (currentPage - 1) * pageSize;
    const appointmentService = new AppointmentService();

    try {
      const response = await appointmentService.getAppointments();
      const filteredAppointments = filterAppointmentsByPatientId(response.data, userId);
      const paginatedAppointments = filteredAppointments.slice(offset, offset + pageSize);
      setAppointments(paginatedAppointments);
      setTotalPages(Math.ceil(filteredAppointments.length / pageSize));
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Error fetching appointments. Please try again.");
    }
  };

  const filterAppointmentsByPatientId = (appointments, userId) => {
    return appointments.filter(appointment => appointment.patientId === parseInt(userId));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <br />
      <h2>Randevu Listesi</h2>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Randevu Günü</TableHeaderCell>
            <TableHeaderCell>Randevu Saati</TableHeaderCell>
            <TableHeaderCell>Doktor Adı</TableHeaderCell>
            <TableHeaderCell>Açıklama</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div>{formatAppointmentDate(appointment.appointmentDate)}</div>
              </TableCell>
              <TableCell>
                <div>{appointment.appointmentTime}</div>
              </TableCell>
              <TableCell>
                <div>{appointment.doctorName}</div>
              </TableCell>
              <TableCell>
                <div>{appointment.description}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan="4">
              <Menu floated="right" pagination>
                <MenuItem onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <Icon name="chevron left" />
                </MenuItem>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                  <MenuItem key={pageNumber} as="a" active={pageNumber + 1 === currentPage} onClick={() => handlePageChange(pageNumber + 1)}>
                    {pageNumber + 1}
                  </MenuItem>
                ))}
                <MenuItem onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  <Icon name="chevron right" />
                </MenuItem>
              </Menu>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default MyAppointmentsForPatient;

function formatAppointmentDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR');
}
