import React, { useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const LoginCompo = () => {
    const email = useRef();
    const password = useRef();

    async function handleSubmit() {
        const result = await axios.post('http://localhost:8080/api/users/login', {
            email: email.current.value,
            password: password.current.value
        })
        console.log(result.data);
        if ((result.data.token !== undefined) && (result.data.user !== undefined)) {
            cookies.set('token', result.data.token, { path: '/' });
            cookies.set('user', result.data.user, { path: '/' })
            window.location.reload(false);


        }

    }
    return (
        <div>
            <input ref={email} type="mail" />
            <input ref={password} type={"password"} />
            <button onClick={handleSubmit}>Valider</button>
        </div>
    );
};

export default LoginCompo;