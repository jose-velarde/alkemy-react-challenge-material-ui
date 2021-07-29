import React, { useEffect, useRef } from "react";
import { TextField, IconButton, CircularProgress } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

// vheight get messed up when helper text shows up
// can't perform a React state update on an unmounted component error.
function SearchBar(props) {
    const reference = useRef();

    useEffect(() => {
        if (reference.current) {
            props.setSearchBarHeight(reference.current.offsetHeight);
        }
    }, [props]);

    const LoginSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, "Search must be 1 characters at minimum")
            .required("Hero's name is required"),
    });

    const getRequest = async (values) => {
        try {
            const response = await axios.get(
                "https://superheroapi.com/api.php/10226669230223430/search/" +
                    values.name
            );
            const searchResults = response.data.results;
            props.setResults(searchResults);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Formik
            initialValues={{ name: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
                const timeOut = setTimeout(() => {
                    setSubmitting(false);
                    clearTimeout(timeOut);
                }, 1000);
                getRequest(values);
            }}
        >
            {({ touched, errors, isSubmitting, handleChange }) => (
                <Form ref={reference}>
                    <TextField
                        fullWidth={true}
                        margin="normal"
                        type="text"
                        name="name"
                        label="Hero's name"
                        variant="standard"
                        autoComplete="off"
                        onChange={handleChange}
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    position="end"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        <Search />
                                    )}
                                </IconButton>
                            ),
                        }}
                    />
                </Form>
            )}
        </Formik>
    );
}

export default SearchBar;
