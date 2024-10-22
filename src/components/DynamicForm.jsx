import React from 'react';
import { useFormik } from "formik";
import { DynamicFields } from "../utils/Fields";
import { validationSchema } from "../utils/Validations";
import PropTypes from 'prop-types';
import { Grid2 } from "@mui/material";



const DynamicForm = ({ formJson, buttonClick, children, breakpoints, formValues }) => {

    // Set initial form values based on formJson or use provided formValues
    const initialValues = formValues || formJson?.form_data?.reduce((acc, field) => {
        // Checkbox fields default to false, other fields to an empty string
        if (field.type === "checkbox") {
            acc[field.key] = field.defaultValue || false;
        } else {
            acc[field.key] = field.defaultValue || "";
        }
        return acc;
    }, {});


    // useFormik to manage form state, validation, and submission
    const formik = useFormik({
        initialValues, // Set initial values
        validationSchema: validationSchema(formJson), // Apply validation schema generated from formJson
        onSubmit: buttonClick, // Handle form submission
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid2 container spacing={2}>
                {formJson?.form_data?.map((field) => (
                    <DynamicFields key={field.key} formik={formik} field={field} breakpoints={breakpoints} />
                ))}
            </Grid2>
            {children}
        </form>
    );
};

// Prop types to ensure correct types are passed to the component
DynamicForm.propTypes = {
    formJson: PropTypes.any,
    buttonClick: PropTypes.func,
    breakpoints: PropTypes.object,
    formValues: PropTypes.object,
    children: PropTypes.any
};

export default DynamicForm;
