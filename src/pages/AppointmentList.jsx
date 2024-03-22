import React, { useState, useEffect } from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  Label,
  Menu,
  Table,
} from "semantic-ui-react";
import AppointmentService from "../services/appointmentService";
import {Link} from 'react-router-dom';

function AppointmentList() {
  const [appointment, setAppointments] = useState([]);

  useEffect(() => {
    let appointmentService = new AppointmentService(); //Sayfa yüklendiğinde yapılması istenen kodu useEffect içine yaz.
    appointmentService
      .getApponitments()
      .then((result) => setAppointments(result.data));
  },[]);

  return (
    <div>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>Randevu Günü</TableHeaderCell>
            <TableHeaderCell>Randevu Saati</TableHeaderCell>
            <TableHeaderCell>Hasta Id</TableHeaderCell>
            <TableHeaderCell>Doktor Id</TableHeaderCell>
            <TableHeaderCell>Açıklama</TableHeaderCell>
            <TableHeaderCell>Onay ?</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appointment.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div><Link to={`/appointments/${appointment.id}`}>{appointment.id}</Link></div>
              </TableCell>
              <TableCell>
                <div>{appointment.appointmentDate}</div>
              </TableCell>
              <TableCell>
                <div>{appointment.appointmentTime}</div>
              </TableCell>
              <TableCell>
                <div>{appointment.patientId}</div>
              </TableCell>
              <TableCell>
                <div>{appointment.doctorId}</div>
              </TableCell>
              <TableCell>
                <div>{appointment.description}</div>
              </TableCell>
              <TableCell>
                <div>{appointment.isApproved ? "Onaylandı" : "Onaylanmadı"}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <MenuItem as="a" icon>
                  <Icon name="chevron left" />
                </MenuItem>
                <MenuItem as="a">1</MenuItem>
                <MenuItem as="a">2</MenuItem>
                <MenuItem as="a">3</MenuItem>
                <MenuItem as="a">4</MenuItem>
                <MenuItem as="a" icon>
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

export default AppointmentList;
