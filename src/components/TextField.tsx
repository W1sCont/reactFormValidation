import React, { useState, forwardRef, useImperativeHandle } from "react";

type Props = { value: string, label: string };

export interface TextFieldHandle {
    getValue: () => string;
    getValidity: () => boolean;
}
const validate = (v: string) => v.trim().length >= 3;

const NameField = forwardRef<TextFieldHandle, Props>(({ value, label }, ref) => {
    const initialValid = validate(value);
    const [state, setState] = useState({
        value,
        valid: initialValid,
        error: initialValid ? '' : `${label} має містити щонайменше 3 символи`,
        touched: false
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        const ok = validate(v);
        setState({
            value: v,
            valid: ok,
            error: ok ? '' : `${label} має містити щонайменше 3 символи`,
            touched: true
        });
    };

    useImperativeHandle(ref, () => ({
        getValue: () => state.value,
        getValidity: () => {
            if(!state.touched){
                setState(prev => ({...prev, touched: true}));
            }
            return state.valid
        }
    }));

    return (
        <div className="field">
            <label>{label}: </label>
            <input
                type="text"
                value={state.value}
                onChange={onChange}
                className={state.valid ? 'valid' : 'invalid'}
            />
            {(state.touched && !state.valid) && <div className="error">{state.error}</div>}
        </div>
    );
});

export default NameField;