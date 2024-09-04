import { useFormik } from "formik";
import { DynamicFields } from "../utils/Fields";
import { validationSchema } from "../utils/Validations";
import PropTypes from 'prop-types';

const DynamicForm = ({ formJson, buttonClick, children }) => {
    const initialValues = formJson?.form_data?.reduce((acc, field) => {
        acc[field.key] = field.defaultValue || "";
        return acc;
    }, {});

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema(formJson),
        onSubmit: buttonClick,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {formJson.form_data.map((field) => (
                <DynamicFields key={field.key} formik={formik} field={field} />
            ))}
            {children}
        </form>
    );
};

DynamicForm.propTypes = {
    formJson: PropTypes.any,
    children: PropTypes.any,
    buttonClick: PropTypes.func
};

export default DynamicForm;
