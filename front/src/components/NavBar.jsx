import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/navBar.css';
import Logout from './Logout';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var token;

const NavBar = () => {
    token = cookies.get('token') !== undefined;
    return (
        <div className='navBox'>
            <div className='namePack'>
                <img src={logo} alt="watch logo" />
                <h2>Watch store</h2>
            </div>
            <div className='btnBox'>
                {!token ? <a href="/register" className='btn'>S'enregistrer</a> : null}
                {!token ? <a href="/login" className='btn'>Se connecter</a> : null}
                {token ? <Logout /> : null}
            </div>
        </div>
    );
};

export default NavBar;