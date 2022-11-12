import { useState } from "react";

export const useForm = (initialState = {}) => {

    const [form, setForm] = useState(initialState);
    
    const onChange = (value, field) => {
        
        console.log("value", value, "field", field);

        setForm({
        ...form,
        [field]: value,
        });

    };

    const onReset = (initialState) => {
        setForm(initialState);
    }
    
    return {
        ...form,
        form,
        onChange,
        onReset
    };
}