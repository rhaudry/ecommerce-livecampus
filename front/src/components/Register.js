import {useState,useRef, React} from 'react';
const Register = () => {
    const lastname = useRef();
    const firstname = useRef();
    const email = useRef();
    const [password, setPassword] = useState('');


    function handleSubmit() {
        //
    }
    return (
        <div>
            <label>Firstname</label>
            <input ref={firstname} type="text"/>
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

export default Register;