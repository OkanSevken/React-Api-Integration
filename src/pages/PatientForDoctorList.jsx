import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell, Button } from "semantic-ui-react";

function PatientForDoctorList() {
  const [doctorPatients, setDoctorPatients] = useState({});

  useEffect(() => {
    fetchDoctorPatientList();
  }, []);

  const fetchDoctorPatientList = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5013/api/PatientForDoctorContoller/GetListPatientForDoctor");
      setDoctorPatients(groupPatientsByDoctor(response.data));
    } catch (error) {
      console.error("Error fetching doctor-patient list:", error);
    }
  };

  const groupPatientsByDoctor = (patients) => {
    const groupedPatients = {};
    patients.forEach((patient) => {
      if (!groupedPatients[patient.doctorName]) {
        groupedPatients[patient.doctorName] = [];
      }
      groupedPatients[patient.doctorName].push(patient.patientName);
    });
    return groupedPatients;
  };


  return (
    <div>
       <br/>
      <h2>Doktor - Hasta Listesi</h2>
      {Object.keys(doctorPatients).length === 0 ? (
        <p>Veri bulunamadı.</p>
      ) : (
        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Doktor Adı</TableHeaderCell>
              <TableHeaderCell>Hasta Adı</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(doctorPatients).map((doctorName, index) => (
              <TableRow key={index}>
                <TableCell>{doctorName}</TableCell>
                <TableCell>
                  {doctorPatients[doctorName].map((patientName, idx) => (
                    <div key={idx}>{patientName}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div style={{ marginTop: "20px",  display: "flex", gap: "400px"  }}>
        <Button basic color="green" as="a" href="/patientForDoctor/add">Doktor-Hasta Ataması Ekle</Button>
        <Button basic color="green" as="a" href="/patientToDoctor/add">Hasta-Doktor Ataması Ekle</Button>
        {/* <Button color="red" as="a" href="/patientForDoctor/delete">Atama Sil</Button> */}
      </div>
    </div>
  );
}

export default PatientForDoctorList;
