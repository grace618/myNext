import { useState, useEffect } from 'react'
import { gameList } from 'service/gameList'
const useGameList = (language) => {
    const [list, setList] = useState([])
    const getList = async (language) => {
        const res = await gameList(language)
        if (res.code === 0) {
            setList(res.data)
        }
    }
    useEffect(() => {
        if (language) {
            getList(language)
        }
    }, [language])
    return list
}
const useSubmitForm = (initialValues, callback) => {
    const [inputs, setInputs] = useState(initialValues);
    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
        // setInputs(initialValues)
    }
    const handleInputChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value })
        // setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }
    return {
        handleSubmit,
        handleInputChange,
        inputs,
        setInputs
    };
}
export { useGameList, useSubmitForm }