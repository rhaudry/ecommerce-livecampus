import React from 'react';
import Cookies from 'universal-cookie';
import cartLogo from '../assets/cart.svg';
import '../styles/cartCompo.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartCompo = () => {
    const navigate = useNavigate();
    const [cartLenght, setCartLenght] = useState(0);
    const cookies = new Cookies();
    const cart = cookies.get('cart')
    useState(() => {
        setCartLenght(cart.length);
    }, [cart.length])

    function goToCart() {
        navigate('/cart', { replace: true });
    }
    return (
        <div className='cartBox' onClick={goToCart}>
            <img src={cartLogo} alt="cart logo" className='cartLogo' />
            {cartLenght > 1 && <p className='cartNumber'>{cartLenght}</p>}
        </div>
    );
};

export default CartCompo;