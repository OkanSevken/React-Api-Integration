import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FormField, Button } from 'semantic-ui-react';
import axios from 'axios'; 
import appointmentUpdateService from "../services/appointmentUpdateService";

export default function AppointmentUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    id: '',
    appointmentDate: '',
    appointmentTime: '',
    patientName: '',
    doctorName: '',
    description: '',
  });

  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("userId:", userId); 
  }, [userId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5013/api/Appointment/GetByIdAppointments?id=${id}`
      );
      console.log("Response:", response); 
      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        console.log("Fetched Data: ", data);
        setInitialValues({
          id: data.id,
          appointmentDate: new Date(data.appointmentDate).toISOString().split('T')[0],
          appointmentTime: data.appointmentTime,
          description: data.description,
          patientName: data.patientName,
          doctorName:data.doctorName,
        });
        const userIdFromSession = sessionStorage.getItem('userId');
        if (userIdFromSession) {
          setUserId(userIdFromSession);
        }
      } else {
        console.error("No data found for this ID");
      }
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching data for ID:", id); 
    fetchData();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        appointmentDate: new Date(values.appointmentDate).toISOString().split('T')[0]
      };
      await appointmentUpdateService.updateAppointment(formattedValues);
      alert("Randevu başarıyla güncellendi!");
      navigate(`/appointments`);
    } catch (error) {
      console.error("API Error:", error);
      alert("Randevu güncellenirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <br />
      <h2>Randevu Güncelle</h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className="ui form">
          {/* <FormField>
            <label>Id</label>
            <Field name="id" type="id" readOnly />
          </FormField>  */}
          <FormField>
            <label>Randevu Tarihi</label>
            <Field name="appointmentDate" type="date"   />
          </FormField>
          <FormField>
            <label>Randevu Saati</label>
            <Field name="appointmentTime" type="time" />
          </FormField>
             <FormField>
            <label>Hasta Ad</label>
            <Field name="patientName" type="text" readOnly />
          </FormField>  
             <FormField>
            <label>Doctor Ad</label>
            <Field name="doctorName" type="text" readOnly />
          </FormField>  
          <FormField>
            <label>Randevu Açıklaması</label>
            <Field name="description" as="textarea" />
          </FormField>
          <Button type="submit" basic color="green">Güncelle</Button>
          <Button href="/appointments" basic color="red">
            Geri Çık
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
