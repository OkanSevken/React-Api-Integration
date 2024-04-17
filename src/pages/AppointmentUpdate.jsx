import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FormField, Button } from 'semantic-ui-react';
import appointmentUpdateService from "../services/appointmentUpdateService";

export default function AppointmentUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Tarih formatını ayarla: YYYY-MM-DD
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
    <Formik
      initialValues={{
        id:id,
        appointmentDate: "",
        appointmentTime: "",
        doctorId: "",
        patientId: "",
        description: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className="ui form">
      <FormField>
          <label>Id</label>
          <Field name="id" type="id" readOnly />
        </FormField>
        <FormField>
          <label>Randevu Tarihi</label>
          <Field name="appointmentDate" type="date" />
        </FormField>
        <FormField>
          <label>Randevu Saati</label>
          <Field name="appointmentTime" type="time" />
        </FormField>
        <FormField>
          <label>Doktor Id</label>
          <Field name="doctorId" type="number" />
        </FormField>
        <FormField>
          <label>Hasta Id</label>
          <Field name="patientId" type="number" />
        </FormField>
        <FormField>
          <label>Randevu Açıklaması</label>
          <Field name="description" as="textarea" />
        </FormField>
        <Button type="submit" basic color="green" >Güncelle</Button>
      </Form>
    </Formik>
  );
}
