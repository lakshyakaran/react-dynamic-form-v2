# React Dynamic Form v2

`react-dynamic-form-v2` is a React library for dynamically generating forms using JSON configurations. It leverages Material-UI (MUI) components and Formik for form handling and validation.

## Features

- **Dynamic Form Generation:** Create forms on the fly using a JSON configuration.
- **Material-UI Integration:** Utilizes MUI components for a consistent and modern UI.
- **Formik Integration:** Built-in form handling, validation, and error management.
- **Custom Validation:** Supports custom validation rules using Yup.

## Installation

You can install the library via npm:

```bash
npm install react-dynamic-form-v2
```

## Usage

Here's a basic example of how to use the react-dynamic-form-v2 library:

```jsx 
import React from 'react'; 
import DynamicForm from 'react-dynamic-form-v2'; 

const formJson = {
  "form_data":[
   {
      "key":"legal_name",
      "type":"input",
      "props":{
         "placeholder":"Enter name",
         "pattern":"^[a-z A-Z 0-9\\s]{1,50}$",
         "type":"text",
         "required":true,
         "label":"Name",
         "minLength":1,
         "maxLength":50
      }
   },
   {
      "key":"address",
      "type":"select",
      "defaultValue":"",
      "props":{
         "label":"Location",
         "options":[
            {
               "value":"d98ae5ae-aa15-45f7-9e8c-ad772ef09fac",
               "label":"Location Delhi"
            }
         ]
      }
   },
   {
      "key":"telephone",
      "type":"tel",
      "defaultValue":"",
      "props":{
         "placeholder":"Enter mobile number",
         "label":"Mobile"
      }
   },
   {
      "key":"states",
      "type":"autocomplete",
      "props":{
         "label":"States",
         "placeholder":"Type to search",
         "required":true,
         "options":[
            "Alabama",
            "Alaska",
            "American Samoa",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware"
         ]
      }
   },
   {
      "key":"description",
      "type":"textarea",
      "templateOptions":{
         "label":"Description",
         "placeholder":"Enter your comments",
         "required":true,
         "rows":4,
         "cols":50
      }
   },
   {
      "key":"dob",
      "type":"date",
      "templateOptions":{
         "label":"Date of Birth",
         "placeholder":"Select your date of birth",
         "required":true,
         "minDate":"1900-01-01",
         "maxDate":"2023-12-31"
      }
   },
   {
      "key":"gender",
      "type":"radio",
      "templateOptions":{
         "label":"Gender",
         "required":true,
         "options":[
            {
               "label":"Male",
               "value":"male"
            },
            {
               "label":"Female",
               "value":"female"
            },
            
         ]
      }
   },
   {
      "key":"agreeTerms",
      "type":"checkbox",
      "templateOptions":{
         "label":"I agree to the terms and conditions",
         "required":true
      }
   }
 ]
};

export default function App() {
  const onSubmit = (data) => {
    console.log("Form data: ", data);
  };

  const breakpoints = {
    xs: 12,
    md: 6,
    lg: 6
  };

  return (
  <div className="App">
    <h1>Hello Dynamic Form</h1>
    <DynamicForm formJson={formJson} buttonClick={onSubmit} breakpoints={breakpoints}>
      <Button type="submit">Submit</Button>
    </DynamicForm>
  </div>
  );
}
```
## Breakpoints
`breakpoints` The breakpoints prop allows you to control how each field is displayed on different screen sizes (xs, md, lg, xl).

## JSON Schema
The `formJson` object structure is as follows:

### Common Field Properties:

Each field object in the form_data array should contain:
- variant: The variant of input (e.g., outlined, filled, standard) by default is outlined.
- key: A unique identifier for the form field.
- type: The type of input (e.g., input, select, tel).
- props: An object containing the properties for the form field.
- label: The label for the field.
- placeholder: The placeholder text.
- type: The input type (e.g., text, tel).
- required: Boolean indicating whether the field is required.
- minLength: Minimum length for input.
- maxLength: Maximum length for input.
- pattern: A regex pattern for validation.
- options: (For select fields) An array of option objects, each with a value and label.

### Template Options (for Radio, Checkbox, Textarea, Date)

For certain types like `radio`, `checkbox`, `textarea`, and `date`, the templateOptions are used:

- label: The label for the field.
- required: Boolean indicating whether the field is required.
- options: (For `radio` and `checkbox`) Array of options, each with a `label` and `value`.
- rows: (For `textarea`) Number of rows for the textarea.
- cols: (For `textarea`) Number of columns for the textarea.
- minDate: (For `date`) The minimum allowed date.
- maxDate: (For `date`) The maximum allowed date.