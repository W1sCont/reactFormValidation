import React, { useState, forwardRef, useImperativeHandle } from "react";

type Props = { list: Record<number, string>, title: string, name: string };
type CheckState = {
    value: number[],
    valid: boolean,
    error: string,
    touched: boolean
}
export interface CheckFieldHandle {
    getValue: () => string[];
    getValidity: () => boolean;
}
const validate = (v: number[]) => v.length !== 0;

const CheckField = forwardRef<CheckFieldHandle, Props>(({ list, title, name }, ref) => {
    const initialValid = validate([]);
    const [state, setState] = useState<CheckState>({
        value: [],
        valid: initialValid,
        error: initialValid ? '' : "Оберіть значення",
        touched: false
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = Number(e.target.value);
        let nextValue: number[];
        if(e.target.checked){
            nextValue = [...state.value, id];
        }
        else {
            nextValue = state.value.filter(item => item !== id)
        }
        const ok = validate(nextValue);
        setState({
            value: nextValue,
            valid: ok,
            error: ok ? '' : "Оберіть значення",
            touched: true
        });
    };

    useImperativeHandle(ref, () => ({
        getValue: () => state.value.map(id => list[id]),
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
                        <label>
                            <input
                                type="checkbox"
                                name={name}
                                value={k}
                                checked={state.value.includes(Number(k))}
                                onChange={onChange}
                                className={state.touched ? (state.valid ? 'valid' : 'invalid') : ""}
                            />
                            {v}
                        </label>
                    </div>
                )}
                {(state.touched && !state.valid) && <div className="error">{state.error}</div>}
            </fieldset>
        </div>
    );
});

export default CheckField;