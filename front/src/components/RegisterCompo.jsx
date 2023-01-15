import { useState, useRef, React } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import "../styles/registerCompo.css"

const cookies = new Cookies();

const RegisterCompo = () => {
    const lastname = useRef();
    const firstname = useRef();
    const email = useRef();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function handleSubmit() {
        try {
            await axios.post('http://localhost:8080/api/users/register', [{
                firstname: firstname.current.value,
                lastname: lastname.current.value,
                email: email.current.value,
                password: password
            }])
        } catch (error) {
            console.log(error);
        }
        if (email.current.value !== undefined && password !== undefined) {

            const result = await axios.post('http://localhost:8080/api/users/login', {
                email: email.current.value,
                password: password
            })
            console.log(result.data);
            if ((result.data.token !== undefined) && (result.data.user !== undefined)) {
                cookies.set('token', result.data.token, { path: '/' });
                cookies.set('user', result.data.user, { path: '/' })
                window.location.reload(false);
                navigate('/home');


            }
        }

    }
    return (
        <div>
            <a href="/" className='btn'>Retour</a>
            <div className='registerBox'>
                <h1>Enregistrement</h1>
                <div className='registerItem'>
                    <label>Prénom</label>
                    <input ref={firstname} type="text" />
                </div>
                <div className='registerItem'>
                    <label>Nom de famille</label>
                    <input ref={lastname} type="text" />
                </div>
                <div className='registerItem'>
                    <label>Email</label>
                    <input ref={email} type="email" />
                </div>
                <div className='registerItem'>
                    <label>Mot de passe</label>
                    <input value={password.value} type={"password"} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='registerItem'>
                    <button onClick={handleSubmit} className="btn">Valider l'inscription</button>
                </div>
                <div className='registerItem'>
                    <a href="/login">Déjà inscrit ? Se connecter ici !</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterCompo;