import * as Yup from "yup";

export const validationSchema = (formJson) =>
    Yup.object().shape(
        formJson?.form_data?.reduce((acc, field) => {
            let schema;

            // Special case for checkboxes (Boolean type)
            if (field.type === "checkbox") {
                schema = Yup.boolean().oneOf([true], "This field is required");
            } else {
                // For other field types (e.g., input, select)
                schema = Yup.string();

                const isRequired =
                    field.props?.required || field.templateOptions?.required;

                if (isRequired) {
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
            }

            // Assign the schema to the corresponding key
            acc[field.key] = schema;
            return acc;
        }, {})
    );
