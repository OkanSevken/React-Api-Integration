import axios from "axios";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormField, Button } from "semantic-ui-react";

export default function PatientForDoctorAdd() {
  const initialValues = {
    doctorId: "",
    patientName: "", 
  };

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const validationSchema = Yup.object({
    doctorId: Yup.string().required("Doktor seçimi zorunlu"),
    patientName: Yup.string().required("Hasta adı zorunlu"),
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

  const getPatientIdByName = (patientName) => {
    const patient = patients.find((patient) => patient.usernameSurname === patientName);
    return patient ? patient.id : null;
  };

  const handleSubmit = async (values) => {
    try {
      // Hasta adına karşılık gelen patientId değerini al
      const patientId = getPatientIdByName(values.patientName);
      if (!patientId) {
        throw new Error("Hasta adına karşılık gelen id bulunamadı.");
      }

      const data = {
        doctorId: values.doctorId,
        patientId: patientId, 
      };

      console.log("Form Values:", data);
      const response = await axios.post(
        "http://127.0.0.1:5013/api/PatientForDoctorContoller/CreatePatientForDoctor",
        data
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
      <h2>Hasta - Doktor  Atama</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
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
              <label>Hasta Adı</label>
              <Field type="text" name="patientName" placeholder="Hasta adı ve soyadı" />
            </FormField>
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
