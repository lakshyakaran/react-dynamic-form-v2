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
  "form_data": [
    {
      "key": "name",
      "type": "input",
      "variant": "outlined",
      "props": {
        "placeholder": "Enter name",
        "pattern": "^[a-z A-Z 0-9\\s]{1,50}$",
        "type": "text",
        "required": true,
        "label": "Name",
        "minLength": 1,
        "maxLength": 50
      }
    },
    {
      "key": "address",
      "type": "select",
      "defaultValue": "",
      "variant": "filled",
      "props": {
        "label": "Location",
        "options": [
          {
            "value": "d98ae5ae-aa15-45f7-9e8c-ad772ef09fac",
            "label": "--"
          }
        ]
      }
    },
    {
      "key": "email",
      "type": "input",
      "variant": "standard",
      "props": {
        "placeholder": "Enter email",
        "type": "text",
        "required": true,
        "pattern": "^[A-Za-z0-9.]+@[A-Za-z0-9.]+\\.[A-Za-z]{2,}$",
        "label": "Support Email",
        "minLength": 5,
        "maxLength": 100
      }
    }
  ]
};

export default function App() {
  const onSubmit = (data) => {
    console.log("Form data: ", data);
  };

  return (
  <div className="App">
    <h1>Hello Dynamic Form</h1>
    <DynamicForm formJson={formJson} buttonClick={onSubmit}>
      <Button type="submit">Click</Button>
    </DynamicForm>
  </div>
  );
}
```


## JSON Schema
The `formJson` object structure is as follows:
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
