import { useFormik } from "formik";
import { DynamicFields } from "../utils/Fields";
import { validationSchema } from "../utils/Validations";
import PropTypes from 'prop-types';
import { Grid2 } from "@mui/material";

const DynamicForm = ({ formJson, buttonClick, children, breakpoints, formValues }) => {
    const initialValues = formValues || formJson?.form_data?.reduce((acc, field) => {
        if (field.type === "checkbox") {
            acc[field.key] = field.defaultValue || false;
        } else {
            acc[field.key] = field.defaultValue || "";
        }
        return acc;
    }, {});


    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema(formJson),
        onSubmit: buttonClick,
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

DynamicForm.propTypes = {
    formJson: PropTypes.any,
    buttonClick: PropTypes.func,
    breakpoints: PropTypes.object,
    formValues: PropTypes.object,
    children: PropTypes.any
};

export default DynamicForm;
