import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    CardMeta,
    CardHeader,
    CardGroup,
    CardDescription,
    CardContent,
    Button,
    Card,
    Image,
  } from 'semantic-ui-react'
import AppointmentService from "../services/appointmentService";

export default function AppointmentDetail() {
  let { id } = useParams(); // Destructing

  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    let appointmentService = new AppointmentService(); //Sayfa yüklendiğinde yapılması istenen kodu useEffect içine yaz.
    appointmentService
      .getByIdApponitments(id)
      .then((result) => setAppointment(result.data));
  },[]);

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
            <CardMeta>{appointment.appointmentDate} - {appointment.appointmentTime} </CardMeta>
            <CardDescription>
              <strong>Hasta Id: </strong> {appointment.patientId} - <strong>Doktor Id:</strong> {appointment.doctorId} 
            </CardDescription>
          </CardContent>
          <CardContent extra>
            <div className="ui two buttons">
              <Button basic color="green">
                Onayla
              </Button>
              <Button basic color="red">
                Reddet
              </Button>
            </div>
          </CardContent>
        </Card>            
      </CardGroup>
    </div>
  );
}
