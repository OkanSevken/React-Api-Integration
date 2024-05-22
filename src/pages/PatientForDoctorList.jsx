import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell, Button } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom'; 

function PatientForDoctorList() {
  const [doctorPatients, setDoctorPatients] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    console.log("userId:", userId); 

    if (!['1', '3'].includes(userId)) {
      navigate('/patientForDoctor/add');
    } else {
      fetchDoctorPatientList(userId);
    }
  }, [navigate]);

  const fetchDoctorPatientList = async (doctorId) => {
    try {
      const response = await axios.get("http://127.0.0.1:5013/api/PatientForDoctorContoller/GetListPatientForDoctor");
      const filteredPatients = response.data.filter(patient => patient.doctorId.toString() === doctorId);
      const groupedPatients = groupPatientsByDoctor(filteredPatients);
      setDoctorPatients(groupedPatients);
    } catch (error) {
      console.error("Error fetching doctor-patient list:", error);
    }
  };

  const groupPatientsByDoctor = (patients) => {
    const groupedPatients = {};
    patients.forEach((patient) => {
      if (!groupedPatients[patient.doctorId]) {
        groupedPatients[patient.doctorId] = {
          doctorName: patient.doctorName,
          patients: []
        };
      }
      groupedPatients[patient.doctorId].patients.push({
        name: patient.patientName,
        description: patient.description
      });
    });
    return Object.values(groupedPatients);
  };

  return (
    <div>
      <br/>
      <h2>Doktor - Hasta Listesi</h2>
      {doctorPatients.length === 0 ? (
        <p>Veri bulunamadı.</p>
      ) : (
        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Doktor Adı</TableHeaderCell>
              <TableHeaderCell>Hasta Adı</TableHeaderCell>
              <TableHeaderCell>Açıklama</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorPatients.map((entry, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell rowSpan={entry.patients.length}>{entry.doctorName}</TableCell>
                  <TableCell>{entry.patients[0].name}</TableCell>
                  <TableCell>{entry.patients[0].description}</TableCell>
                </TableRow>
                {entry.patients.slice(1).map((patient, patientIndex) => (
                  <TableRow key={patientIndex}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.description}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
      <div style={{ marginTop: "20px", display: "flex", gap: "400px" }}>
        <Button basic color="green" as="a" href="/MyAppointmentsDoctor">Randevularım</Button>
      </div> 
      {/* <div style={{ marginTop: "20px", display: "flex", gap: "400px" }}>
        <Button basic color="green" as="a" href="/patientForDoctor/add">Doktor-Hasta Ataması Ekle</Button>
        <Button basic color="green" as="a" href="/patientToDoctor/add">Hasta-Doktor Ataması Ekle</Button>
        <Button color="red" as="a" href="/patientForDoctor/delete">Atama Sil</Button> 
      </div> */}
    </div>
  );
}

export default PatientForDoctorList;
