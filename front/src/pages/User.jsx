import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import NavBar from '../components/NavBar';
import '../styles/user.css';
import dateFormat from 'dateformat';
const cookies = new Cookies();
const user = cookies.get('user');


const User = () => {
    const email = useRef();
    const firstname = useRef();
    const lastname = useRef();
    const password = useRef();
    const [orderHistory, setOrderHistory] = useState([]);

    async function getCookie() {
        const user = await cookies.get('user');
        email.current = user.email;
        firstname.current = user.firstname;
        lastname.current = user.lastname;
    }
    getCookie();

    const handleSubmit = () => {
        axios.put('http://localhost:8080/api/users/' + user.id, {
            token: cookies.get('token'),
            firstname: firstname.current.value,
            lastname: lastname.current.value,
            email: email.current.value,
            password: password.current.value

        }).then(res => {
            if (res.status === 200) {
                cookies.set('user', { firstname: firstname.current.value, lastname: lastname.current.value, email: email.current.value }, { path: '/' });
                alert('Modifications enregistrées');
            };
        });

    }
    function getOrderHistory() {
        console.log(user.id, "token : ", cookies.get('token'));
        const token = cookies.get('token');
        if (token !== undefined) {
            axios.post('http://localhost:8080/api/orders/get/', {
                token,
                user_id: user.id
            }
            ).then(res => {
                setOrderHistory(res.data);
                console.log(res.data);
            });
        }
    }
    useEffect(() => {
        getOrderHistory();
    }, []);
    return (
        <div>
            <NavBar></NavBar>
            <a href="/" className='btn'>Retour</a>
            <div className='userBox'>
                <h1>Mon compte : </h1>
                <div className='accountItem'>
                    <label>Prénom : </label>
                    <input ref={firstname} />
                </div>
                <div className='accountItem'>
                    <label>Nom : </label>
                    <input ref={lastname} />
                </div>
                <div className='accountItem'>
                    <label>Email : </label>
                    <input ref={email} />
                </div>
                <div className='accountItem'>
                    <label>Mot de passe : </label>
                    <input type="password" ref={password} />
                </div>

                <button onClick={handleSubmit} className="btn">Enregistrer</button>
            </div>
            <div className='userBox'>
                <h1>Historique des commandes : </h1>
                {orderHistory.map((order, index) => {
                    return (
                        <div key={index} className='orderItem'>
                            <p>Commande n°{order.id}</p>
                            <p>Produit : {order.product_id}</p>
                            <p>Quantité : {order.qty}</p>
                            <p>Date : {dateFormat((order.createdAt), 'dS mmm, h:MM')}</p>
                            <p>Statut : {order.status}</p>
                        </div>
                    )
                }
                )}

            </div>
        </div>
    );
};

export default User;