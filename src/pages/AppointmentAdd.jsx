import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Field, Form,Formik } from "formik";
import * as Yup from "Yup";
import { FormField, Button, Checkbox } from 'semantic-ui-react'

export default function AppointmentAdd() {
  const initialValues = {
    AppointmentDate: "",
    AppointmentTime: "",
    DoctorId: "",
    PatientId: "",
    CreaterUserId:"",
    Description: "",

  };

  const schema = Yup.object({
    AppointmentDate: Yup.string().required("Randevu tarihi zorunlu"),
    AppointmentTime: Yup.string().required("Randevu saati zorunlu"),
    DoctorId: Yup.number().required("Doktor id zorunlu"),
    PatientId: Yup.number().required("Hasta id zorunlu"),
    CreaterUserId: Yup.number().required("Hasta id zorunlu"),
    Description: Yup.string().required("Randevu açıklaması zorunlu"),
  });

  const handleSubmit = (values) => {
    
    axios.post("http://localhost:5000/api/Appointment/CreateAppointments", values)
      .then(response => {
        console.log("API Response:", response.data);
        
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
            <Field name="AppointmentDate" placeholder="Randevu Tarihi"></Field>
          </FormField>
          <FormField>
            <Field name="AppointmentTime" placeholder="Randevu Saati"></Field>
          </FormField>
          <FormField>
            <Field name="DoctorId" placeholder="Doktor Id"></Field>
          </FormField>
          <FormField>
            <Field name="PatientId" placeholder="Hasta Id "></Field>
          </FormField>
          <FormField>
            <Field name="Description" placeholder="Randevu Açıklaması"></Field>
          </FormField>
          <Button color="green" type="submit">Randevu Oluştur</Button>
        </Form>
      </Formik>
  );
}
