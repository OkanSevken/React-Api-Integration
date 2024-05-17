import React from "react";
import Categories from "./Categories";
import { GridRow, GridColumn, Grid } from "semantic-ui-react";
import { Routes, Route } from "react-router-dom";
import AppointmentList from "../pages/AppointmentList";
import AppointmentDetail from "../pages/AppointmentDetail";
import AppointmentAdd from "../pages/AppointmentAdd";
import Home from "../pages/Home";
import Register from "../pages/Register";
// import DoctorCheckAdd from "../pages/DoctorCheckAdd";
import AppointmentUpdate from "../pages/AppointmentUpdate";
import AppointmentDelete from "../pages/AppointmentDelete";
import Giris from "../pages/Giris";
import PatientForDoctorAdd from "../pages/PatientForDoctorAdd";
import PatientForDoctorList from "../pages/PatientForDoctorList";
import PatientForDoctorDelete from "../pages/PatientForDoctorDelete";
import PatientToDoctorAdd from "../pages/PatientToDoctorAdd";



function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Categories />
          </Grid.Column>
          <Grid.Column width={12}>
            <Routes>
            <Route path="/" element={<Giris/>}/>
               <Route path="/giris" element={<Giris />} />           
              <Route path="/register" element={<Register />} />
              <Route path="/appointments" element={<AppointmentList />} />
              <Route path="/appointments/add" element={<AppointmentAdd />} />
              <Route path="/patientForDoctor/add" element={<PatientForDoctorAdd />} />
              <Route path="/patientForDoctor/list" element={<PatientForDoctorList/>}/>
              <Route path="/patientForDoctor/delete" element={<PatientForDoctorDelete/>}/>
              <Route path="/patientToDoctor/add" element={<PatientToDoctorAdd/>}/> 
              {/* <Route path="/doctorCheck/add" element={<DoctorCheckAdd />} /> */}
              <Route path="/appointments/:id" element={<AppointmentDetail />} />
              <Route path="/appointments/update/:id" element={<AppointmentUpdate />} />
              <Route path="/appointments/delete/:id" element={<AppointmentDelete />} />     
            </Routes>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Dashboard;
