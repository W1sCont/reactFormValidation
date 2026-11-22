import React, { useState, forwardRef, useImperativeHandle } from "react";

type Props = { pass: string, passConfirm: string };

export interface PassFieldHandle {
    getValue: () => string;
    getValidity: () => boolean;
}
const validateLength = (p: string) => p.trim().length >= 3 && p.trim().length <= 10;
const validateConfirm = (p: string, pC: string) => p === pC;

const PassField = forwardRef<PassFieldHandle, Props>(({ pass, passConfirm }, ref) => {
    const initialValidLength = validateLength(pass);
    const initialValidConfirm = validateConfirm(pass, passConfirm);
    const [state, setState] = useState({
        pass,
        passConfirm,
        valid: initialValidLength,
        error: initialValidLength ? '' : "Пароль має містити від 3 до 10 символи",
        validConfirm: initialValidConfirm,
        errorConfirm: initialValidConfirm ? '' : "Пароль не співпадає",
        touched: false
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const targetName = target.name;
        const targetValue = target.value;
        
        let pass1: string, pass2: string;

        if(targetName === "pass"){
            pass1 = targetValue;
            pass2 = state.passConfirm;
        }
        else {
            pass1 = state.pass;
            pass2 = targetValue;
        }

        const validLength = validateLength(pass1);
        const validConf = validateConfirm(pass1, pass2);
        setState({
            pass: pass1,
            passConfirm: pass2,
            valid: validLength,
            error: validLength ? '' : "Пароль має містити від 3 до 10 символи",
            validConfirm: validConf,
            errorConfirm: validConf ? '' : "Пароль не співпадає",
            touched: true
        });
    };

    useImperativeHandle(ref, () => ({
        getValue: () => state.pass,
        getValidity: () => {
            if(!state.touched){
                setState(prev => ({...prev, touched: true}));
            };
            return state.valid && state.validConfirm;
        }
    }));

    return (
        <div>
            <div className="field">
                <label>Пароль: </label>
                <input
                    type="password"
                    name="pass"
                    value={state.pass}
                    onChange={onChange}
                    className={state.touched ? (state.valid ? 'valid' : 'invalid') : ""}
                />
                {(!state.valid && state.touched) && <div className="error">{state.error}</div>}
            </div>
            <div className="field">
                <label>Підтвердження: </label>
                <input
                    type="password"
                    name="passConfirm"
                    value={state.passConfirm}
                    onChange={onChange}
                    className={state.touched ? (state.validConfirm ? 'valid' : 'invalid') : ""}
                />
                {(!state.validConfirm && state.touched) && <div className="error">{state.errorConfirm}</div>}
            </div>
        </div>

    );
});

export default PassField;