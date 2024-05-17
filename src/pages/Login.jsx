// import React, { useState } from "react";
// import { Formik, Form, Field } from "formik";
// import axios from "axios";
// import { FormField, Button } from 'semantic-ui-react';
// import { useNavigate } from "react-router-dom";


// export default function Giris() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (values, { setSubmitting }) => {
//         try {
//             await axios.post('http://localhost:5000/api/Auth/Login', { email, password });
//             handleClear();
//             navigate('/Home');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="login-form-container"> {/* Stil dosyasında tanımlanan class */}
//         <h2>Login</h2>
//         <Formik
//             initialValues={{ email: '', password: '' }}
//             onSubmit={handleSubmit}
//         >
//             <Form className="ui form">
//                 <FormField>
//                     <label>Email</label>
//                     <Field name="email" type="email" />
//                 </FormField>
//                 <FormField>
//                     <label>Password</label>
//                     <Field name="password" type="password" />
//                 </FormField>
//                 <Button type="submit" basic color="green">Giriş Yap</Button>
//             </Form>
//         </Formik>
//     </div>
//     );
// }
