// import React, { useState } from "react";
// import axios from "axios";
// import { Form, Button, Input } from "semantic-ui-react";

// export default function DoctorCheckAdd() {
//   const [formData, setFormData] = useState({
//     appointmentId: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:5000/api/DoctorCheck/CreateDoctorCheck",
//         formData
//       );
//       console.log("Doctor check added successfully!");
//       // Ek bir işlem yapmak isterseniz burada yönlendirme gibi
//     } catch (error) {
//       console.error("Error:", error);
//       // Hata durumunda kullanıcıya bir bildirim gösterebilirsiniz
//     }
//   };

//   return (
//     <div>
//       <h2>Doktor Kontrol Ekle</h2>
//     <Form onSubmit={handleSubmit}>
//       <Form.Field>
//         <label>Randevu Id</label>
//         <Input
//           type="number"
//           name="appointmentId"
//           placeholder="Randevu Id"
//           value={formData.appointmentId}
//           onChange={handleChange}
//         />
//       </Form.Field>
//       <Form.Field>
//         <label>Randevu Açıklaması</label>
//         <Input
//           type="text"
//           name="description"
//           placeholder="Randevu Açıklaması"
//           value={formData.description}
//           onChange={handleChange}
//         />
//       </Form.Field>
//       <Button color="green" type="submit">
//         Oluştur
//       </Button>
//     </Form>
//     </div>
//   );
// }
