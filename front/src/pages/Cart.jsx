import React from 'react';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import cat from '../assets/cat.jpeg';
import NavBar from '../components/NavBar';
import axios from 'axios';
import '../styles/cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const cookies = new Cookies();
    const user = cookies.get('user');
    const token = cookies.get('token');
    useState(() => {
        setCart(cookies.get('cart'));
    }, [cookies.get('cart')]);

    function handleClick(index) {
        let temp = cart;
        let newArray = [];
        delete temp[index];
        cookies.remove('cart', { path: '/' });
        temp.forEach(element => {
            if (element !== null && element !== undefined && element !== []) {
                console.log("element true: ", element)
                newArray.push(element);
            } else {
                console.log("element false: ", element)
            }
        });
        setCart(newArray);
        cookies.set('cart', newArray, { path: '/' });
        //window.location.reload(false);

    }

    function handleBuy() {
        console.log("commande de : ", user);
        console.log("token : ", token);
        cart.forEach(element => {
            axios.post('http://localhost:8080/api/orders', {
                token: token,
                product_id: element[1].id,
                qty: element[0],
                status: "en cours",
                user_id: user.id
            });
        });
        cookies.remove('cart', { path: '/' });
        setCart([]);
        window.location.reload(false);

    }


    let total = 0;
    if (cart !== undefined) {
        cart.map((item) => {
            if (item === null) {
                return null;
            } else {
                total = total + item[1].price * item[0]
            }
        });
    }
    return (
        <div className='cart'>
            <NavBar></NavBar>
            <a className='btn' href="/">Retour</a>
            <div className='cartListBox'>
                <h1>Panier</h1>
                <div>
                    <table>
                        {console.log(typeof (cart))}
                        {cart !== undefined && cart.map((item, index) => {
                            if (item === null) {
                                return null;
                            } else {
                                console.log(item[1].photo)
                                return (
                                    <tr className='cartItem' key={index}>
                                        <th className='thItem'><img src={item[1].photo ? item[1].photo : cat} alt={item[1].name} /></th>
                                        <th className='thItem'>  Produit :{item[1].name}  </th>
                                        <th className='thItem'>  Quantité : {item[0]}  </th>
                                        <th className='thItem'>  Prix unitaire : {item[1].price} €  </th>
                                        <th className='thItem'>  Prix total : {item[1].price * item[0]} € </th>
                                        <th><button className='btn' onClick={() => { handleClick(index) }}>X</button></th>
                                    </tr>
                                )
                            }
                        })}
                    </table>
                    <div>
                        <p>Total : {total} €</p>
                    </div>
                    {!token && <p>Connectez-vous pour commander</p>}
                    {token && <button className='btn' onClick={handleBuy}>Commander</button>}
                </div>
            </div>
        </div>
    );
};

export default Cart;