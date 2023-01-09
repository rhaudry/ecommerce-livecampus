import React, { useRef } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const handleSubmit = () => {
    console.log('submit');
};

const User = () => {
    const email = useRef();
    const firstname = useRef();
    const lastname = useRef();

    const handleSubmit = () => {
        console.log(email.current.value, firstname.current.value, lastname.current.value);
    };

    async function getCookie() {
        const user = await cookies.get('user');
        email.current.value = user.email;
        firstname.current.value = user.firstname;
        lastname.current.value = user.lastname;
    }
    getCookie();

    return (
        <div>
            <h1>Mon compte</h1>
            <div className='accountItem'>
                <label>Prénom</label>
                <input ref={firstname} />
            </div>
            <div className='accountItem'>
                <label>Nom</label>
                <input ref={lastname} />
            </div>
            <div className='accountItem'>
                <label>Email</label>
                <input ref={email} />
            </div>

            <button onClick={handleSubmit}>Enregistrer</button>




        </div>
    );
};

export default User;