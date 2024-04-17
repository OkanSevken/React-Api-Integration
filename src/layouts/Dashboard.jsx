import React from "react";
import Categories from "./Categories";
import { GridRow, GridColumn, Grid } from "semantic-ui-react";
import { Routes, Route } from "react-router-dom";
import AppointmentList from "../pages/AppointmentList";
import AppointmentDetail from "../pages/AppointmentDetail";
import AppointmentAdd from "../pages/AppointmentAdd";
import Home from "../pages/Home";
import Register from "../pages/Register";
import DoctorCheckAdd from "../pages/DoctorCheckAdd";
import AppointmentUpdate from "../pages/AppointmentUpdate";

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
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/appointments" element={<AppointmentList />} />
              <Route path="/appointments/add" element={<AppointmentAdd />} />
              <Route path="/doctorCheck/add" element={<DoctorCheckAdd />} />
              <Route path="/appointments/:id" element={<AppointmentDetail />} />
              <Route path="/appointments/update/:id" element={<AppointmentUpdate />} />
            </Routes>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Dashboard;
