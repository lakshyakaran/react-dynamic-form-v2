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

export const DynamicFields = ({ formik, field, breakpoints }) => {
    const themeBreakpoints = breakpoints || { lg: 4, md: 4, xs: 12 };

    switch (field.type) {
        case 'input':
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
        case 'select':
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
        case 'tel':
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
        case 'autocomplete':
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
        case 'checkbox':
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

        case 'radio':
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
        case 'textarea':
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
        case 'date':
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