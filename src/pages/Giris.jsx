import React from "react";
import { Formik, Form, Field } from "formik";
import { FormField, Button, Grid } from 'semantic-ui-react';
import loginService from "../services/loginService"; 
import { useNavigate, Link } from "react-router-dom"; 

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {     
        
            const response = await loginService.login(values.usernameSurname, values.password); 
            console.log(response); 
            localStorage.setItem('token', response.token);
            navigate('/appointments');    
    };



    return (
        <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
    >
        <Grid.Column style={{ maxWidth: 450 }}>
            <h2>Giriş Yap</h2>
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
