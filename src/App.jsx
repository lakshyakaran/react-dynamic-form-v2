import './App.css'
import DynamicForm from './components/DynamicForm';

function App() {

  const onSubmit = (data) => {
    console.log("Form data =>", data);
  };

  const breakpoints = {
    xs: 12,
    md: 6,
    lg: 6
  }

  return (
    <>
      <h2>Dynamic Form</h2>
      <DynamicForm
        formJson={formJson}
        buttonClick={onSubmit}
        breakpoints={breakpoints}
        formValues={apiData}
      >
        <button type='submit'>Submit</button>
      </DynamicForm>
    </>
  )
}


const formJson = {
  form_data: [
    {
      key: "legal_name",
      type: "input",
      props: {
        placeholder: "Enter name",
        pattern: "^[a-z A-Z 0-9\\s]{1,50}$",
        type: "text",
        required: true,
        label: "Name",
        minLength: 1,
        maxLength: 50,
      },
    },
    {
      key: "address",
      type: "select",
      defaultValue: "",
      props: {
        label: "Location",
        options: [
          {
            value: "d98ae5ae-aa15-45f7-9e8c-ad772ef09fac",
            label: "Location Delhi",
          },
        ],
      },
    },
    {
      key: "telephone",
      type: "tel",
      defaultValue: "",
      props: {
        placeholder: "Enter mobile number",
        label: "Mobile",
      },
    },
    {
      key: "states",
      type: "autocomplete",
      props: {
        label: "States",
        placeholder: "Type to search",
        required: true,
        options: [
          "Alabama",
          "Alaska",
          "American Samoa",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
          "Delaware",
        ],
      },
    },
    {
      key: "description",
      type: "textarea",
      templateOptions: {
        label: "Description",
        placeholder: "Enter your comments",
        required: true,
        rows: 4,
        cols: 50,
      },
    },
    {
      key: "dob",
      type: "date",
      templateOptions: {
        label: "Date of Birth",
        placeholder: "Select your date of birth",
        required: true,
        minDate: "1900-01-01",
        maxDate: "2023-12-31",
      },
    },
    {
      key: "gender",
      type: "radio",
      templateOptions: {
        label: "Gender",
        required: true,
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
    },
  ],
};

const apiData = {
  legal_name: "lakshya",
  address: "d98ae5ae-aa15-45f7-9e8c-ad772ef09fac",
  telephone: "+915363738383",
  states: "American Samoa",
  description: "Test description",
  dob: "1995-03-03",
  gender: "male",
};


export default App
