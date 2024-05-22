import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormField, Button } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';

export default function AppointmentAdd() {
  const initialValues = {
    appointmentDate: "",
    appointmentTime: "",
    doctorId: "",
    patientId: "",
    description: "",
  };

  const validationSchema = Yup.object({
    appointmentDate: Yup.string().required("Randevu tarihi zorunlu"),
    appointmentTime: Yup.string().required("Randevu saati zorunlu"),
    doctorId: Yup.string().required("Doktor seçimi zorunlu"),
    patientId: Yup.string().required("Hasta seçimi zorunlu"),
    description: Yup.string().required("Randevu açıklaması zorunlu"),
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    console.log("userId:", userId); 
  }, []); 

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5013/api/PatientForDoctorContoller/GetAllListDoctor"
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Doctors Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDoctorChange = async (selectedDoctorId, setFieldValue) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5013/api/PatientForDoctorContoller/GetAllListPatient",
        { doctorId: selectedDoctorId }
      );
      setPatients(response.data);
      console.log("Selected Doctor ID:", selectedDoctorId);
      // Sadece doktorun id'sini setFieldValue ile doctorId alanına atadım
      setFieldValue("doctorId", selectedDoctorId);
    } catch (error) {
      console.error("Patients Fetch Error:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Form Values:", values);
      const formattedValues = {
        ...values,
        appointmentDate: new Date(values.appointmentDate).toISOString().split('T')[0]
      };
      const response = await axios.post(
        "http://127.0.0.1:5013/api/Appointment/CreateAppointments",
        formattedValues
      );
      console.log("API Response:", response.data);
      alert("Randevu başarıyla oluşturuldu!");
    } catch (error) {
      console.error("API Error:", error);
      alert("Randevu oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div>
      <br/>
      <h2>Randevu Ekle</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            console.log("Form Values:", values);
            await handleSubmit(values);
            actions.setSubmitting(false);
          } catch (error) {
            console.error("Submit Error:", error);
            alert("Randevu oluşturulurken bir hata oluştu.");
            actions.setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="ui form">
            <FormField>
              <label>Randevu Tarihi</label>
              <Field name="appointmentDate" placeholder="Randevu Tarihi" type="date" />
            </FormField>
            <FormField>
              <label>Randevu Saati</label>
              <Field name="appointmentTime" placeholder="Randevu Saati" type="time" />
            </FormField>
            <FormField>
              <label>Doktor</label>
              <Field
                as="select"
                name="doctorId"
                onChange={(e) =>
                  handleDoctorChange(e.target.value, setFieldValue)
                }
              >
                <option value="">Doktor Seçin</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.usernameSurname}
                  </option>
                ))}
              </Field>
            </FormField>
            <FormField>
              <label>Hasta</label>
              <Field as="select" name="patientId">
                <option value="">Hasta Seçin</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.patientName}
                  </option>
                ))}
              </Field>
            </FormField>
            <FormField>
              <label>Randevu Açıklaması</label>
              <Field
                name="description"
                placeholder="Randevu Açıklaması"
                as="textarea"
              />
            </FormField>
            <Button as="a" href="/appointments" basic color="green" type="submit">
              Randevu Oluştur
            </Button>
            <Button as="a" href="/appointments" basic color="blue" type="submit">
              Randevu Listesi
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
