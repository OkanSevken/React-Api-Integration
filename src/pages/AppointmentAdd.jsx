import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Field, Form,Formik } from "formik";
import * as Yup from "Yup";
import { FormField, Button, Checkbox } from 'semantic-ui-react'

export default function AppointmentAdd() {
  const initialValues = {
    appointmentDate: "",
    appointmentTime: "",
    doctorId: "",
    patientId: "",
    description: "",
  };

  const schema = Yup.object({
    appointmentDate: Yup.string().required("Randevu tarihi zorunlu"),
    appointmentTime: Yup.string().required("Randevu saati zorunlu"),
    doctorId: Yup.number().required("Doktor id zorunlu"),
    patientId: Yup.number().required("Hasta id zorunlu"),
    description: Yup.string().required("Randevu açıklaması zorunlu"),
  });

  const handleSubmit = (values) => {
    
    axios.post("http://localhost:5000/api/Appointment/CreateAppointments", values)
      .then(response => {
        console.log("API Response:", response.data);
        
      alert("Randevu başarıyla oluşturuldu!");
      
      
    })
    .catch(error => {
      console.error("API Error:", error);
     
      alert("Randevu oluşturulurken bir hata oluştu.");
      
      })   
  };

  return ( 
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className="ui form">
          <FormField>
            <Field name="appointmentDate" placeholder="Randevu Tarihi" ></Field>
          </FormField>
          <FormField>
            <Field name="appointmentTime" placeholder="Randevu Saati"></Field>
          </FormField>
          <FormField>
            <Field name="doctorId" placeholder="Doktor Id"></Field>
          </FormField>
          <FormField>
            <Field name="patientId" placeholder="Hasta Id "></Field>
          </FormField>
          <FormField>
            <Field name="description" placeholder="Randevu Açıklaması"></Field>
          </FormField>
          <Button color="green" type="submit">Randevu Oluştur</Button>
        </Form>
      </Formik>
  );
}