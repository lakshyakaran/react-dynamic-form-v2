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
      key: "keywords",
      type: "input",
      props: {
        placeholder: "Enter keyword",
        pattern: "^[a-z A-Z 0-9]{1,10}$",
        type: "text",
        label: "Keyword",
        minLength: 0,
        maxLength: 10,
      },
    },
    {
      key: "parent_organisation",
      type: "select",
      defaultValue: "company",
      props: {
        required: true,
        label: "Parent Department",
        options: [
          {
            value: "1244536c-ff21-4c78-afd9-b0b42ae7a42d",
            label: "company",
          },
        ],
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
      key: "email",
      type: "input",
      props: {
        placeholder: "Enter email",
        type: "text",
        required: true,
        label: "Support Email",
        minLength: 5,
        maxLength: 100,
      },
    },
    {
      key: "accounting_code",
      type: "input",
      props: {
        placeholder: "Enter cost center code",
        // pattern: "^\\w$",
        type: "text",
        required: true,
        label: "Cost Center Code",
        minLength: 1,
        maxLength: 10,
      },
    },
    {
      key: "profit_center_code",
      type: "input",
      props: {
        placeholder: "Enter locality",
        type: "text",
        required: true,
        label: "Profit Center Code",
        minLength: 1,
        maxLength: 10,
      },
    },
    {
      key: "description",
      type: "input",
      props: {
        placeholder: "Enter description",
        type: "text",
        label: "Description",
        minLength: 0,
        maxLength: 100,
      },
    },
  ],
};


export default App
