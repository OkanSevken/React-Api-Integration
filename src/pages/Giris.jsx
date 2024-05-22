import React from "react";
import { Formik, Form, Field } from "formik";
import { FormField, Button, Grid } from 'semantic-ui-react';
import loginService from "../services/loginService"; 
import { useNavigate, Link } from "react-router-dom"; 

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {     
        try {
            const response = await loginService.login(values.usernameSurname, values.password); 
            console.log(response); 
       
            sessionStorage.setItem('userId', response.userId);
            // sessionStorage.setItem('userRole', response.roleName);
             sessionStorage.setItem('usernameSurname', response.usernameSurname);

            navigate('/appointments');
        } catch (error) {
            console.error("Giriş hatası:", error);
            alert("Giriş hatası: Kullanıcı adı veya şifre yanlış olabilir.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <h2>Giriş Yap</h2> <br/><br/>
                <Formik
                    initialValues={{ usernameSurname: '', password: '' }}
                    onSubmit={handleSubmit}
                >
                    <Form className="ui form">
                        <FormField>
                            <label>Ad-Soyad</label>
                            <Field name="usernameSurname" type="text" />
                        </FormField>
                        <FormField>
                            <label>Şifre</label>
                            <Field name="password" type="password" />
                        </FormField>
                        <Button type="submit" color="teal" fluid size="large">
                            Giriş Yap
                        </Button>
                        <p>Henüz hesabınız yok mu? <Link to="/register">Kayıt Ol</Link></p>
                    </Form>
                </Formik>
            </Grid.Column>
        </Grid>
    );
}
