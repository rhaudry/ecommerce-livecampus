import React, { useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import "../styles/loginCompo.css"

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
            cookies.set('user', result.data.user, { path: '/' });
            window.location.reload(false);


        }

    }
    return (
        <div>
            <a href="/" className='btn'>Retour</a>
            <div className='loginBox'>
                <h1>Connexion</h1>
                <div className='loginItem'>
                    <label>Email</label>
                    <input ref={email} type="mail" />
                </div>
                <div className='loginItem'>
                    <label>Mot de passe</label>
                    <input ref={password} type={"password"} />
                </div>
                <div className='loginItem'>
                    <button onClick={handleSubmit} className="btn">Valider</button>
                </div>
                <div className='loginItem'>
                    <a href="/register">Première connexion ? S'enregistrer ici !</a>
                </div>
            </div>
        </div>
    );
};

export default LoginCompo;