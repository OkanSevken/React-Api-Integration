import axios from "axios";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormField, Button } from "semantic-ui-react";

export default function PatientForDoctorAdd() {
  const initialValues = {
    doctorId: "",
    patientId: "",
  };

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const validationSchema = Yup.object({
    doctorId: Yup.string().required("Doktor seçimi zorunlu"),
    patientId: Yup.string().required("Hasta seçimi zorunlu"),
  });

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
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

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5013/api/PatientForDoctorContoller/GetAllListPatientWithoutDoctor"
      );
      setPatients(response.data);
    } catch (error) {
      console.error("Patients Fetch Error:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Form Values:", values);
      const response = await axios.post(
        "http://127.0.0.1:5013/api/PatientForDoctorContoller/CreatePatientForDoctor",
        values
      );
      console.log("API Response:", response.data);
      alert("Atama başarıyla yapıldı!");
    } catch (error) {
      console.error("API Error:", error);
      alert("Atama yapılırken bir hata oluştu.");
    }
  };

  return (
    <div>
       <br/>
      <h2>Doktor - Hasta Atama</h2>
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
            alert("Atama yapılırken bir hata oluştu.");
            actions.setSubmitting(false);
          }
        }}
      >
        {({ values }) => (
          <Form className="ui form">
            <FormField>
              <label>Doktor</label>
              <Field as="select" name="doctorId">
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
                    {patient.usernameSurname}
                  </option>
                ))}
              </Field>
            </FormField>
            <div style={{ marginTop: "20px",  display: "flex" }}>
            <Button basic color="green" type="submit">
              Atama Yap
            </Button>
            <Button as="a" href="/patientForDoctor/list" basic color="red">
              Geri Çık
            </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
