import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FormField, Button } from "semantic-ui-react";
import patientForDoctorDeleteService from "../services/patientForDoctorDeleteService";

export default function PatientForDoctorDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await patientForDoctorDeleteService.deletePatientForDoctor(values);

      alert(`Doktor Hasta ID: ${values.id} başarıyla silindi!`);
      navigate(`/patientForDoctor/list`);
    } catch (error) {
      console.error("API Error:", error);
      alert("Randevu silinirken bir hata oluştu.");
    }
  };

  return (
    <Formik
    initialValues={{ id: '' }}
      onSubmit={handleSubmit}
    >
      <Form className="ui form">
        <FormField>
          <label>Randevu ID</label>
          <Field name="id" type="number" />
        </FormField>
        <Button type="submit" basic color="red">Sil</Button>
      </Form>
    </Formik>
  );
}
