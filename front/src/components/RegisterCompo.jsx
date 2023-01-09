import { useState, useRef, React } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

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
            <label>Firstname</label>
            <input ref={firstname} type="text" />
            <label>Lastname</label>
            <input ref={lastname} type="text" />
            <label>Email</label>
            <input ref={email} type="email" />
            <label>Password</label>
            <input value={password.value} type={"password"} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Valider l'inscription</button>
        </div>
    );
};

export default RegisterCompo;