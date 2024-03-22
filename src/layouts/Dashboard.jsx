import React from "react";
import Categories from "./Categories";
import { GridRow, GridColumn, Grid } from "semantic-ui-react";
import {Routes,Route} from "react-router-dom";
import AppointmentList from "../pages/AppointmentList";
import AppointmentDetail from "../pages/AppointmentDetail";
import AppointmentAdd from "../pages/AppointmentAdd";

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
              <Route exact path="/" Component={AppointmentList} />
              <Route exact path="/appointments" Component={AppointmentList} />
              <Route  path="/appointments/:id" Component={AppointmentDetail} />
              <Route  path="/appointments/add" Component={AppointmentAdd} />
            </Routes>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Dashboard;
