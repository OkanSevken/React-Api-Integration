import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Field, Form,Formik } from "formik";
import * as Yup from "Yup";
import { FormField, Button, Checkbox } from 'semantic-ui-react'

export default function DoctorCheckAdd() {
  const initialValues = {
    appointmentId: "",
    description: "",
  };

  const schema = Yup.object({
    appointmentId: Yup.number().required("randevu id zorunlu"),
    description: Yup.string().required("Randevu açıklaması zorunlu"),
  });

  const handleSubmit = (values) => {
    
    axios.post("http://localhost:5000/api/DoctorCheck/CreateDoctorCheck", values)
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
            <Field name="appointmentId" placeholder="randevu Id "></Field>
          </FormField>
          <FormField>
            <Field name="description" placeholder="Randevu Açıklaması"></Field>
          </FormField>
          <Button color="green" type="submit"> Oluştur</Button>
        </Form>
      </Formik>
  );
}