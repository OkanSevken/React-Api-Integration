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
import appointmentDeleteService from "../services/appointmentDeleteService";

export default function AppointmentDetail() {
  const { id } = useParams(); // Destructing
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/Appointment/GetByIdAppointments?id=${id}`
        );
        setAppointment(response.data);
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
      <CardGroup>
        <Card fluid>
          <CardContent>
            <Image
              floated="right"
              size="mini"
              src="/images/avatar/large/steve.jpg"
            />
            <CardHeader>{appointment.description}</CardHeader>
            <CardMeta>
              {appointment.appointmentDate} - {appointment.appointmentTime}{" "}
            </CardMeta>
            <CardDescription>
              <strong>Hasta Id: </strong> {appointment.patientId} -{" "}
              <strong>Doktor Id:</strong> {appointment.doctorId}
            </CardDescription>
          </CardContent>
          <CardContent extra>
            <div className="ui two buttons">
              <Button basic color="green" onClick={handleUpdateClick}>
                Güncelle
              </Button>
              <Button basic color="red" onClick={handleDeleteClick}>
                Sil
              </Button>
            </div>
          </CardContent>
        </Card>
      </CardGroup>
    </div>
  );
}
