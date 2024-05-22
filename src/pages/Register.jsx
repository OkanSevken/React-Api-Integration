import React from "react";
import { Formik, Form, Field } from "formik";
import { FormField, Button, Grid } from 'semantic-ui-react';
import registerService from "../services/registerService"; 
import { useNavigate ,Link} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {

            const response = await registerService.register(
                values.name,
                values.surname,
                values.usernameSurname,
                values.password,
            );
            console.log(response);
            alert("Kayıt başarıyla tamamlandı. Şimdi giriş yapabilirsiniz.");
            navigate('/giris');
    };

    return (
        <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <h2>Kayıt Ol</h2> <br/><br/>
                <Formik
                    initialValues={{ name: '', surname: '', usernameSurname: '', password: '' }}
                    onSubmit={handleSubmit}
                >
                    <Form className="ui form">
                        <FormField>
                            <label>Ad</label>
                            <Field name="name" type="text" />
                        </FormField>
                        <FormField>
                            <label>Soyad</label>
                            <Field name="surname" type="text" />
                        </FormField>
                        <FormField>
                            <label>Ad-Soyad</label>
                            <Field name="usernameSurname" type="text" />
                        </FormField>
                        <FormField>
                            <label>Şifre</label>
                            <Field name="password" type="password" />
                        </FormField>
                        <Button type="submit" color="teal" fluid size="large">
                            Kayıt Ol
                        </Button>
                        <p> Hesabınız var mı? <Link to="/giris">Giriş Yap</Link></p>
                    </Form>
                </Formik>
            </Grid.Column>
        </Grid>
    );
}
