import React from 'react';
import Cookies from 'universal-cookie';
import { useState } from 'react';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const cookies = new Cookies();
    useState(() => {
        setCart(cookies.get('cart'));
    }, [cookies.get('cart')]);
    return (
        <div>
            {cart.map((item, index) => {
                console.log(item);
                return (
                    <div className='cartItem' key={index}>
                        <p>{item[1].name}</p>
                        <p>{item[1].price}</p>
                        <p>Quantité : {item[0]}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default Cart;