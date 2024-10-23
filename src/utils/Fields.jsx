import React from 'react';
import {
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    FormHelperText,
    Checkbox,
    Radio,
    RadioGroup,
    FormControlLabel,
    Autocomplete,
    Grid2,
} from '@mui/material';
import PropTypes from 'prop-types';

/*
  COMPONENT: DynamicFields (for rendering individual form fields)
  This component is responsible for rendering specific field types (input, select, checkbox, etc.) based on the configuration passed in `field` prop.

  Props:
    1. formik: Formik object for managing field state, values, and validation
    2. field: JSON object containing the field type, label, options, etc.
    3. breakpoints: Object to define the responsive layout for grid size

  STEPS:
    1. Determine the field type
        - Switch case based on `field.type` (e.g., input, select, checkbox, radio)
    2. Render the corresponding field component (e.g., TextField, Select, Checkbox, etc.)
        - Use `formik` to bind the field value, handle change, and handle validation
        - Apply `formik.errors` and `formik.touched` for field validation
    3. Apply breakpoints (for responsive grid layout)
    4. Handle special cases (like number validation, or custom input validation)
    5. Render validation messages (if any errors are present for the field)
*/

// Step 1: Check the type of the field (e.g., input, select, checkbox)
// Render corresponding MUI components (TextField, Select, Checkbox, etc.) based on `field.type`

// Step 2: Bind formik values and handle form field changes and validation
// Use `formik.values[field.key]` to get the current field value
// Use `formik.handleChange` to update the form state on change
// Use `formik.errors[field.key]` to display validation errors

// Step 3: Apply responsive layout using `breakpoints` for the grid size

// Step 4: Handle additional validation for specific field types (e.g., number fields)

// Step 5: Display error messages if there are validation errors for the field


export const DynamicFields = ({ formik, field, breakpoints }) => {

    // Default breakpoints if none provided
    const themeBreakpoints = breakpoints || { lg: 4, md: 4, xs: 12 };

    // Switch case to render different field types based on field.type
    switch (field.type) {
        case 'input': // Text input field
            return (
                <Grid2 size={themeBreakpoints}>
                    <TextField
                        key={field.key}
                        label={field.props.label}
                        type={field.props.type}
                        name={field.key}
                        variant={field.variant || 'outlined'}
                        placeholder={field.props.placeholder}
                        value={formik.values[field.key]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                        helperText={formik.touched[field.key] && formik.errors[field.key]}
                        fullWidth
                        margin="normal"
                    />
                </Grid2>
            );
        case 'select': // Select dropdown field
            return (
                <Grid2 size={themeBreakpoints}>
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
                            variant={field.variant || 'outlined'}
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
                </Grid2>
            );
        case 'tel': // Telephone number input field
            return (
                <Grid2 size={themeBreakpoints}>
                    <TextField
                        key={field.key}
                        label={field.props.label}
                        type="number"
                        name={field.key}
                        variant={field.variant || 'outlined'}
                        placeholder={field.props.placeholder}
                        value={formik.values[field.key]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                        helperText={formik.touched[field.key] && formik.errors[field.key]}
                        fullWidth
                        margin="normal"
                        onKeyDown={(evt) => {
                            validateNumber(evt)
                        }}
                    />
                </Grid2>
            );
        case 'autocomplete': // Autocomplete field
            return (
                <Grid2 size={themeBreakpoints}>
                    <Autocomplete
                        key={field.key}
                        options={field.props.options}
                        getOptionLabel={(option) => option}
                        value={formik.values[field.key] || null}
                        onChange={(e, value) => formik.setFieldValue(field.key, value)}
                        onBlur={formik.handleBlur}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={field.props.label}
                                variant={field.variant || 'outlined'}
                                placeholder={field.props.placeholder}
                                error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                                helperText={formik.touched[field.key] && formik.errors[field.key]}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                </Grid2>
            );
        case 'checkbox': // Checkbox field
            return (
                <Grid2 size={themeBreakpoints}>
                    <FormControl
                        component="fieldset"
                        fullWidth
                        error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                    >
                        <FormControlLabel
                            key={field.key}
                            control={
                                <Checkbox
                                    name={field.key}
                                    checked={Boolean(formik.values[field.key])}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            }
                            label={field.templateOptions.label}
                        />
                        {formik.touched[field.key] && formik.errors[field.key] && (
                            <FormHelperText>{formik.errors[field.key]}</FormHelperText>
                        )}
                    </FormControl>
                </Grid2>
            );

        case 'radio': // Radio button group field
            return (
                <Grid2 size={themeBreakpoints}>
                    <FormControl
                        key={field.key}
                        component="fieldset"
                        fullWidth
                        error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                    >
                        <RadioGroup
                            name={field.key}
                            value={formik.values[field.key]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {field.templateOptions.options.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                        {formik.touched[field.key] && formik.errors[field.key] && (
                            <FormHelperText>{formik.errors[field.key]}</FormHelperText>
                        )}
                    </FormControl>
                </Grid2>
            );
        case 'textarea': // Textarea field
            return (
                <Grid2 size={themeBreakpoints}>
                    <TextField
                        key={field.key}
                        label={field.templateOptions.label}
                        name={field.key}
                        multiline
                        variant={field.variant || 'outlined'}
                        rows={field.templateOptions.rows}
                        placeholder={field.templateOptions.placeholder}
                        value={formik.values[field.key]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                        helperText={formik.touched[field.key] && formik.errors[field.key]}
                        fullWidth
                        margin="normal"
                    />
                </Grid2>
            );
        case 'date': // Date field
            return (
                <Grid2 size={themeBreakpoints}>
                    <TextField
                        key={field.key}
                        label={field.templateOptions.label}
                        type="date"
                        name={field.key}
                        value={formik.values[field.key]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: field.templateOptions.minDate,
                            max: field.templateOptions.maxDate,
                        }}
                        error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                        helperText={formik.touched[field.key] && formik.errors[field.key]}
                        fullWidth
                        margin="normal"
                    />
                </Grid2>
            );
        default:
            return null;
    }
};

DynamicFields.propTypes = {
    formik: PropTypes.any,
    field: PropTypes.any,
    breakpoints: PropTypes.object,
};


//Function to validate number.
const validateNumber = (evt) => {
    const keys = ["-", "+", "ArrowUp", "ArrowDown", ".", "e"]
    if (
        !(evt.key === "Backspace" || evt.key === "Tab" || evt.key === "ArrowLeft" || evt.key === "ArrowRight" || /\d/.test(evt.key)) || keys.includes(evt.key)) {
        evt.preventDefault();
    }
}