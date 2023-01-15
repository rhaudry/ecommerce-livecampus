import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/navBar.css';
import Logout from './Logout';
import Cookies from 'universal-cookie';
import CartCompo from './CartCompo';
const cookies = new Cookies();
var token;

const NavBar = () => {
    token = cookies.get('token') !== undefined;
    return (
        <div className='navBox'>
            <a className='namePack' href='/'>
                <img src={logo} alt="watch logo" />
                <h2>LaMontreDuCoin.fr</h2>
            </a>
            <div className='btnBox'>
                {token && <a href="/user" className='btn'>Mon compte</a>}
                {!token && <a href="/register" className='btn'>S'enregistrer</a>}
                {!token && <a href="/login" className='btn'>Se connecter</a>}
                {token && <Logout />}
                <CartCompo></CartCompo>
            </div>

        </div>
    );
};

export default NavBar;