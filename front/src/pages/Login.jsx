import React from 'react';
import LoginCompo from '../components/LoginCompo';
import NavBar from '../components/NavBar';
import "../styles/login.css"

const Login = () => {
    return (
        <div className='loginBody'>
            <NavBar></NavBar>
            <LoginCompo></LoginCompo>
        </div>
    );
};

export default Login;