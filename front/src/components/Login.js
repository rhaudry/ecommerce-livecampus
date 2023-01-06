import React, { useRef } from 'react';
import { useState } from 'react';

const Login = () => {
    const email = useRef();
    const password = useRef();

    function handleSubmit() {
        //console.log("email : " + email.current.value + " password : " + password.current.value);
    }
    return (
        <div>
            {console.log(email)}
            <input  ref={email} type="mail"/>
            <input  ref={password} type={"password"} />
            <button onClick={handleSubmit}>Valider</button>
        </div>
    );
};

export default Login;