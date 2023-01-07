import React, { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const email = useRef();
    const password = useRef();

    async function handleSubmit() {
        const result = await axios.post('http://localhost:8080/api/users/login', {
            email: email.current.value,
            password: password.current.value
        })
        console.log(result);
    }
    return (
        <div>
            {console.log(email)}
            <input ref={email} type="mail" />
            <input ref={password} type={"password"} />
            <button onClick={handleSubmit}>Valider</button>
        </div>
    );
};

export default Login;