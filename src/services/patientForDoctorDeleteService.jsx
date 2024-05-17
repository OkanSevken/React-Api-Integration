import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5013/api/PatientForDoctorContoller";

const patientForDoctorDeleteService = {
  deletePatientForDoctor: async (data) => {
    return axios.post(`${API_BASE_URL}/DeletePatientForDoctor`,data);
  }
};

export default patientForDoctorDeleteService;