import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormField, Button } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';

export default function AppointmentAddForPatient() {
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      fetchPatientAndDoctorInfo(userId);
    } else {
      console.error("User ID not found in session storage");
    }
  }, []);

  const fetchPatientAndDoctorInfo = async (userId) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5013/api/PatientForDoctorContoller/GetListPatientForDoctor"
      );

      const patientDoctorInfo = response.data.find(
        (info) => info.patientId === parseInt(userId)
      );

      if (patientDoctorInfo) {
        setPatient({ patientId: patientDoctorInfo.patientId, patientName: patientDoctorInfo.patientName });
        setDoctor({ doctorId: patientDoctorInfo.doctorId, doctorName: patientDoctorInfo.doctorName });
      } else {
        console.error("No matching patient found for the given userId");
      }
    } catch (error) {
      console.error("Error fetching patient and doctor info:", error);
    }
  };

  const initialValues = {
    appointmentDate: "",
    appointmentTime: "",
    description: "",
  };

  const validationSchema = Yup.object({
    appointmentDate: Yup.string().required("Randevu tarihi zorunlu"),
    appointmentTime: Yup.string().required("Randevu saati zorunlu"),
    description: Yup.string().required("Randevu açıklaması zorunlu"),
  });

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        appointmentDate: new Date(values.appointmentDate).toISOString().split('T')[0],
        doctorId: doctor.doctorId,
        patientId: patient.patientId,
      };
      const response = await axios.post(
        "http://127.0.0.1:5013/api/Appointment/CreateAppointments",
        formattedValues
      );
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
            {doctor && patient && (
              <>
                <FormField>
                  <label>Doktor</label>
                  <Field name="doctorName" value={doctor.doctorName} readOnly />
                </FormField>
                <FormField>
                  <label>Hasta</label>
                  <Field name="patientName" value={patient.patientName} readOnly />
                </FormField>
              </>
            )}
            <FormField>
              <label>Randevu Açıklaması</label>
              <Field
                name="description"
                placeholder="Randevu Açıklaması"
                as="textarea"
              />
            </FormField>
            <Button basic color="green" type="submit">
              Randevu Oluştur
            </Button>
            <Button as="a" href="/MyAppointmentsPatient" basic color="blue" type="submit">
              Randevularım
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
