import React, { useState, forwardRef, useImperativeHandle } from "react";

type Props = { list: Record<number, string>, title: string, name: string };
type RadioState = {
    value: number | null,
    valid: boolean,
    error: string,
    touched: boolean
}
export interface RadioFieldHandle {
    getValue: () => string;
    getValidity: () => boolean;
}
const validate = (v: number | null) => v !== null;

const RadioField = forwardRef<RadioFieldHandle, Props>(({ list, title, name }, ref) => {
    const initialValid = validate(null);
    const [state, setState] = useState<RadioState>({
        value: null,
        valid: initialValid,
        error: initialValid ? '' : "Виберіть значення зі списку",
        touched: false
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <fieldset>
                <legend>{title}: </legend>
                {Object.entries(list).map(([k, v]) =>
                    <div key={k}>
                        <label>{v}
                            <input
                                type="radio"
                                name={name}
                                value={k}
                                checked={state.value === Number(k)}
                                onChange={onChange}
                                className={state.touched ? (state.valid ? 'valid' : 'invalid') : ""}
                            />
                        </label>
                    </div>
                )}
                {(state.touched && !state.valid) && <div className="error">{state.error}</div>}
            </fieldset>
        </div>
    );
});

export default RadioField;