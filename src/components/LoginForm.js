import React, { useState } from "react";

import {
    Grid,
    InputAdornment,
    TextField,
    Button,
    Typography,
    Alert,
    ListItem,
    ListItemText,
    ListItemIcon,
} from "@material-ui/core";
import { AccountCircle, LockRounded, GitHub } from "@material-ui/icons";
import { Redirect } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Learn how to arrange things vertically
// Remove webkit autofill background color

function LoginForm(props) {
    const [redirect, setRedirect] = useState(false);
    const [loginError, setLoginError] = useState(false);
    // move to services.js
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Required"),
        password: Yup.string().required("Required"),
    });

    const sendPostRequest = async (values) => {
        try {
            const response = await axios.post(
                "http://challenge-react.alkemy.org/",
                {
                    email: values.email,
                    password: values.password,
                }
            );
            const token = await response.data.token;
            localStorage.setItem("token", token);
            setLoginError(false);
            setRedirect(true);
            props.setUser("admin");
        } catch (err) {
            console.error(err);
            setLoginError(true);
        }
    };

    if (redirect) {
		props.setUser("admin");
        return <Redirect to="/" />;
    }

	const bypassLogin = () => {
		localStorage.setItem("token", "login bypassed");
		setLoginError(false);
		setRedirect(true);
		
	}
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
                const timeOut = setTimeout(() => {
                    setSubmitting(false);
                    clearTimeout(timeOut);
                }, 1000);
                sendPostRequest(values);
            }}
        >
            {({ touched, errors, isSubmitting, handleChange }) => (
                <Form>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="space-between"
                        height={`calc(100vh - ${props.navHeight}px)`}
                    >
                        <Grid container />
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="h6" textAlign="center">
                                    Log in to start building your super team!
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    id="email"
                                    type="email"
                                    label="Email"
                                    variant="standard"
                                    margin="normal"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    id="password"
                                    type="password"
                                    label="Password"
                                    variant="standard"
                                    margin="normal"
                                    autoComplete="current-password"
                                    error={touched.password && errors.password}
                                    helperText={
                                        touched.password && errors.password
                                    }
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockRounded />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Loading..." : "Submit"}
                                </Button>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
								mt={1}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    color="error"
                                    variant="contained"
									onClick={bypassLogin}
								>
                                    Bypass Login
                                </Button>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={12}
                                pt={1}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {loginError ? (
                                    <Alert severity="error">Login Failed</Alert>
                                ) : (
                                    <></>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ListItem
                                    button
                                    alignItems="center"
                                    component="a"
                                    sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        width: "auto",
                                    }}
                                    href="https://jose-velarde.github.io/one-page-resume/"
                                >
                                    <ListItemText sx={{ textAlign: "center" }}>
                                        Made by Jose
                                    </ListItemText>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: "24px",
                                            paddingLeft: "5px",
                                        }}
                                    >
                                        <GitHub />
                                    </ListItemIcon>
                                </ListItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;
