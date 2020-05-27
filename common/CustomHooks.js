import { useState, useEffect } from 'react'
const useSubmitForm = (initialValues, callback) => {
    const [inputs, setInputs] = useState(initialValues);
    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
        // setInputs(initialValues)
    }
    const handleInputChange = (event) => {
        // event.persist();
        if (event.target.checked) {
            setInputs({ ...inputs, [event.target.name]: event.target.checked })
        } else {
            setInputs({ ...inputs, [event.target.name]: event.target.value })
        }
        // setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }
    return {
        handleSubmit,
        handleInputChange,
        inputs,
        setInputs
    };
}
export { useSubmitForm }