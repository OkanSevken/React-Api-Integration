import React from "react";
import { Grid } from "semantic-ui-react";
import { Routes, Route } from "react-router-dom";
import AppointmentList from "../pages/AppointmentList";
import AppointmentDetail from "../pages/AppointmentDetail";
import AppointmentAdd from "../pages/AppointmentAdd";
import Register from "../pages/Register";
import AppointmentUpdate from "../pages/AppointmentUpdate";
import AppointmentDelete from "../pages/AppointmentDelete";
import Giris from "../pages/Giris";
import PatientForDoctorAdd from "../pages/PatientForDoctorAdd";
import PatientForDoctorList from "../pages/PatientForDoctorList";
import PatientForDoctorDelete from "../pages/PatientForDoctorDelete";
import PatientToDoctorAdd from "../pages/PatientToDoctorAdd";
import AppointmentAddForPatient from "../pages/AppointmentAddForPatient";
import Home from "../pages/Home";
import MyAppointmentsForDoctor from "../pages/MyAppointmentsForDoctor";
import MyAppointmentsForPatient from "../pages/MyAppointmentsForPatient";

function Dashboard({ onSignIn }) {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
          </Grid.Column>
          <Grid.Column width={12}>
            <Routes>
              <Route path="/home" element={<Home />}/>
              <Route path="/" element={<Giris onSignIn={onSignIn} />} />
              <Route path="/giris" element={<Giris onSignIn={onSignIn} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/appointments" element={<AppointmentList />} />
              <Route path="/appointments/add" element={<AppointmentAdd />} />
              <Route path="/appointmentsForPatient/add" element={<AppointmentAddForPatient />} />
              <Route path="/patientForDoctor/add" element={<PatientForDoctorAdd />} />
              <Route path="/patientForDoctor/list" element={<PatientForDoctorList />} />
              <Route path="/patientForDoctor/delete" element={<PatientForDoctorDelete />} />
              <Route path="/patientToDoctor/add" element={<PatientToDoctorAdd />} />
              <Route path="/appointments/:id" element={<AppointmentDetail />} />
              <Route path="/appointments/update/:id" element={<AppointmentUpdate />} />
              <Route path="/appointments/delete/:id" element={<AppointmentDelete />} />
              <Route path="/MyAppointmentsDoctor" element={<MyAppointmentsForDoctor/>}/>
              <Route path="/MyAppointmentsPatient" element={<MyAppointmentsForPatient/>}/>
            </Routes>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Dashboard;
