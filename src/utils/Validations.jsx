import * as Yup from "yup";

export const validationSchema = (formJson) =>
    Yup.object().shape(
        formJson?.form_data?.reduce((acc, field) => {
            let schema = Yup.string();
            if (field.props?.required) {
                schema = schema.required("This field is required");
            }
            if (field.props?.minLength) {
                schema = schema.min(
                    field.props.minLength,
                    `Minimum ${field.props.minLength} characters required`
                );
            }
            if (field.props?.maxLength) {
                schema = schema.max(
                    field.props.maxLength,
                    `Maximum ${field.props.maxLength} characters allowed`
                );
            }
            if (field.props?.pattern) {
                schema = schema.matches(
                    new RegExp(field.props.pattern),
                    "Invalid format"
                );
            }
            acc[field.key] = schema;
            return acc;
        }, {})
    );
