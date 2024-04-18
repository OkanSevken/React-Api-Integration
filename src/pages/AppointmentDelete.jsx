import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FormField, Button } from "semantic-ui-react";
import appointmentDeleteService from "../services/appointmentDeleteService";

export default function AppointmentDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Axios kullanarak silme isteği gönderin
      await appointmentDeleteService.deleteAppointment(values); 
      
      // Başarı mesajını gösterin ve yönlendirme yapın
      alert(`Randevu ID: ${values} başarıyla silindi!`);
      navigate(`/appointments`);
    } catch (error) {
      console.error("API Error:", error);
      alert("Randevu silinirken bir hata oluştu.");
    }
  };

  return (
    <Formik
      initialValues={{ id: id }}
      onSubmit={handleSubmit}
    >
      <Form className="ui form">
        <FormField>
          <label>Randevu ID</label>
          <Field name="id" type="number" readOnly />
        </FormField>
        <Button type="submit" basic color="red">Sil</Button>
      </Form>
    </Formik>
  );
}
