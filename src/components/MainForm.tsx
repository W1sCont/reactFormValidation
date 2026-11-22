import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import TextField from "./TextField";
import Password from "./Password";
import List from "./List";
import Radio from "./Radio";
import Check from "./Check";

const list = {
    0: "----- Оберіть -----",
    1: "Директор",
    2: "Заступник директора",
    3: "Керівник проекту",
    4: "Начальник відділу",
    5: "Програміст",
    6: "Дизайнер",
    7: "Консультант",
    8: "Службовець"
}

const checkList = {
    0: "Дизайнер",
    1: "Програмування",
    2: "Адміністрування"
}

const genderList = {
    0: "М",
    1: "Ж"
}

export default function MainForm() {
    const loginRef = useRef<any>(null);
    const passRef = useRef<any>(null);
    const fullNameRef = useRef<any>(null);
    const genderRef = useRef<any>(null);
    const specRef = useRef<any>(null);
    const positionRef = useRef<any>(null);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const login = loginRef.current?.getValue();
        const pass = passRef.current?.getValue();
        const fullName = fullNameRef.current?.getValue();
        const gender = genderRef.current?.getValue();
        const spec = specRef.current?.getValue();
        const position = positionRef.current?.getValue();

        const loginValid = loginRef.current?.getValidity();
        const passValid = passRef.current?.getValidity();
        const nameValid = fullNameRef.current?.getValidity();
        const genderValid = genderRef.current?.getValidity();
        const specValid = specRef.current?.getValidity();
        const positionValid = positionRef.current?.getValidity();

        const valid =
            loginValid &&
            passValid &&
            nameValid &&
            genderValid &&
            specValid &&
            positionValid;

        if (!valid) {
            Swal.fire({
                icon: 'error',
                title: 'Помилка',
                text: 'Будь ласка, виправте помилки у формі',
            });
            return;
        }

        Swal.fire({
            title: 'Дані форми',
            html: `
        <div style="text-align: left; font-size: 16px;">
          <b>Логін:</b> ${login}<br/>
          <b>Пароль:</b> ${pass}<br/>
          <b>Повне і'мя:</b> ${fullName}<br/>
          <b>Стать:</b> ${gender}<br/>
          <b>Стать:</b> ${spec}<br/>
          <b>Посада:</b> ${position}<br/>
        </div>
      `,
            icon: 'info',
            confirmButtonColor: '#4b9ce2'
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField ref={loginRef} value="" label="Логін" />
            <Password ref={passRef} pass="" passConfirm="" />
            <TextField ref={fullNameRef} value="" label="Повне і'мя" />
            <Radio ref={genderRef} list={genderList} title="Стать" name="radioButton" />
            <Check ref={specRef} list={checkList} title='Спеціалізація' name='spec' />
            <List ref={positionRef} list={list} title='Посада: ' />
            <div style={{ marginTop: 16 }}>
                <button type="submit">Надіслати</button>
            </div>
        </form>
    );
}