import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CardMeta,
  CardHeader,
  CardGroup,
  CardDescription,
  CardContent,
  Button,
  Card,
  Image,
} from "semantic-ui-react";
import axios from "axios";

export default function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5013/api/Appointment/GetByIdAppointments?id=${id}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchAppointmentData();
  }, [id]);

  const handleUpdateClick = () => {
    navigate(`/appointments/update/${id}`);
  };

  const handleDeleteClick = async () => {
    navigate(`/appointments/delete/${id}`);
  };

  return (
    <div>
      <br/><br/>
      {appointments.map((appointment) => (
        <Card key={appointment.id} fluid>
          <Card.Content>
            <Card.Header>
              Randevu Açıklaması: {appointment.description}
            </Card.Header>
            <br />
            <Card.Description>
              <strong>Randevu Tarihi:</strong>{" "}
              {formatAppointmentDate(appointment.appointmentDate)} <br /> <br />
              <strong>Randevu Saati:</strong> {appointment.appointmentTime}
              <br />
              <br />
            </Card.Description>
            <Card.Description>
              <strong>Hasta Adı:</strong> {appointment.patientName} <br />
              <br />
              <strong>Doktor Adı:</strong> {appointment.doctorName}
            </Card.Description>
          </Card.Content>
          <Button as="a" href="/appointments" basic color="red">
            Geri Çık
          </Button>
        </Card>
      ))}
    </div>
  );
}

function formatAppointmentDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR");
}
