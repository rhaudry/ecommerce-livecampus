import React from 'react';
import Cookies from 'universal-cookie';
import '../styles/btn.css'

function btnLogout() {
    const cookies = new Cookies();
    cookies.remove('token');
    window.location.reload(false);
}


const Logout = () => {
    return (
        <div>
            <button className='btn' onClick={btnLogout}>Se déconnecter</button>
        </div>
    );
};

export default Logout;