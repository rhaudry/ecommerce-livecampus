import React from 'react';
import Cookies from 'universal-cookie';
import cartLogo from '../assets/cart.svg';
import '../styles/cartCompo.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CartCompo = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [cartLenght, setCartLenght] = useState(0);
    const [cart, setCart] = useState(cookies.get('cart'));
    useEffect(() => {
        setCart(cookies.get('cart'));
        console.log("cart", cart);
        if (cart !== undefined) {
            return () => {
                setCartLenght(cart.length);
            }
        }
    }, []);

    function goToCart() {
        navigate('/cart', { replace: true });
    }
    return (
        <div className='cartBox' onClick={goToCart}>
            <img src={cartLogo} alt="cart logo" className='cartLogo' />
            {cartLenght > 0 && <p className='cartNumber'>{cartLenght}</p>}
        </div>
    );
};

export default CartCompo;