import React from 'react';
import { render } from '@testing-library/react';
import DynamicForm from './DynamicForm';

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
        }
    ],
};

describe('DynamicForm Component', () => {
    test('should render form fields dynamically from JSON', () => {
        render(<DynamicForm formJson={formJson} buttonClick={null} ></DynamicForm>);

        // expect(screen.getByLabelText('Enter name')).toBeInTheDocument();
    });
});