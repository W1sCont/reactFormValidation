import React, { useState, forwardRef, useImperativeHandle } from "react";

type Props = { list: Record<number, string>, title: string };

export interface ListFieldHandle {
    getValue: () => string;
    getValidity: () => boolean;
}

const validate = (v: number) => v !== 0;

const ListField = forwardRef<ListFieldHandle, Props>(({ list, title }, ref) => {
    const initialValid = validate(0);
    const [state, setState] = useState({
        value: 0,
        valid: initialValid,
        error: initialValid ? '' : "Виберіть значення зі списку",
        touched: false
    });

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = Number(e.target.value);
        const ok = validate(v);
        setState({
            value: v,
            valid: ok,
            error: ok ? '' : "Виберіть значення зі списку",
            touched: true
        });
    };

    useImperativeHandle(ref, () => ({
        getValue: () => state.value !== null ? list[state.value] : "",
        getValidity: () => {
            if (!state.touched) {
                setState(prev => ({ ...prev, touched: true }));
            }
            return state.valid
        }
    }));

    return (
        <div className="field">
            <label>{title}: </label>
            <select
                value={state.value}
                onChange={onChange}
                className={state.touched ? (state.valid ? 'valid' : 'invalid') : ""}
            >
                {Object.entries(list).map(([k, v]) => 
                    <option key={k} value={k}>{v}</option>
                )}
            </select>
            {(state.touched && !state.valid) && <div className="error">{state.error}</div>}
        </div>
    );
});

export default ListField;