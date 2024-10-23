import React from 'react';
import { useFormik } from "formik";
import { DynamicFields } from "../utils/Fields";
import { validationSchema } from "../utils/Validations";
import PropTypes from 'prop-types';
import { Grid2 } from "@mui/material";

/*
  COMPONENT: DynamicForm (for rendering dynamic form elements)
  This component dynamically renders form fields based on the provided `formJson`.

  Props:
    1. formJson: JSON object containing form field definitions and configurations
    2. buttonClick: Callback function triggered on form submission
    3. breakpoints: Object defining the breakpoints for responsive design
    4. formValues: Optional, predefined form values (used to pre-fill the form fields)
    5. children: Any additional components (like submit button) to render within the form

  STEPS:
    1. Initialize form state
        - Use `formJson` to dynamically set the initial values for the form fields
        - Handle checkbox field differently (default value to false)
        - Set other field types to an empty string or their default values
    2. Initialize form validation
        - Use `formik` to manage form state, validation, and submission
        - Apply validation schema based on `formJson` to handle form validations
    3. Render dynamic form fields
        - Use the `DynamicFields` component to render each field from `formJson`
        - Pass `formik` (for managing field values) and `breakpoints` (for responsiveness)
    4. Form submission
        - On form submission, trigger the `buttonClick` function
    5. Render children components (such as buttons or additional UI elements)
*/

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
