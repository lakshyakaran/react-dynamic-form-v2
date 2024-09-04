import { TextField, FormControl, Select, MenuItem, InputLabel, FormHelperText } from "@mui/material";
import PropTypes from 'prop-types';

export const DynamicFields = ({ formik, field }) => {
    switch (field.type) {
        case "input":
            return (
                <TextField
                    key={field.key}
                    label={field.props.label}
                    type={field.props.type}
                    name={field.key}
                    placeholder={field.props.placeholder}
                    value={formik.values[field.key]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched[field.key] && Boolean(formik.errors[field.key])
                    }
                    helperText={formik.touched[field.key] && formik.errors[field.key]}
                    fullWidth
                    margin="normal"
                />
            );
        case "select":
            return (
                <FormControl
                    key={field.key}
                    fullWidth
                    margin="normal"
                    error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                >
                    <InputLabel htmlFor={field.key}>{field.props.label}</InputLabel>
                    <Select
                        id={field.key}
                        name={field.key}
                        value={formik.values[field.key]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label={field.props.label}
                    >
                        <MenuItem disabled value="">
                            <em>Select {field.props.label}</em>
                        </MenuItem>
                        {field.props.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched[field.key] && formik.errors[field.key] && (
                        <FormHelperText>{formik.errors[field.key]}</FormHelperText>
                    )}
                </FormControl>
            );
        case "tel":
            return (
                <TextField
                    key={field.key}
                    label={field.props.label}
                    type="tel"
                    name={field.key}
                    placeholder={field.props.placeholder}
                    value={formik.values[field.key]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                    helperText={formik.touched[field.key] && formik.errors[field.key]}
                    fullWidth
                    margin="normal"
                />
            );
        default:
            return null;
    }
};


DynamicFields.propTypes = {
    formik: PropTypes.any,
    field: PropTypes.any
};
