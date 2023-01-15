import React from 'react';
import cat from '../assets/cat.jpeg';
import '../styles/productDetail.css'
import Cookies from 'universal-cookie';
import { useRef } from 'react';
const cookies = new Cookies();


const ProductDetail = ({ product }) => {
    const quantity = useRef(0);
    function addToCart() {
        const cart = cookies.get('cart');
        if (cart === undefined) {
            cookies.set('cart', [[parseInt(quantity.current.value), product]], { path: '/' });
        } else {
            cookies.set('cart', [...cart, [parseInt(quantity.current.value), product]], { path: '/' });
        }
        alert('Produit ajouté au panier');
        window.location.reload(false);
    }
    return (
        <div className='detailBox'>
            <h1 className='detailTitle'>{product.name}</h1>
            <div className='detailBoxItems'>
                <div className='detailImageBox'>
                    <img className='detailImage' src={product.photo ? product.photo : cat} alt="product" />
                </div>
                <div className='detailInfoBox'>
                    <p className='detailDesc'>Plus d'infos : {product.description}</p>
                    <p className='detailPrice'>{product.price}€ TTC</p>
                    <input ref={quantity} min={0} type="number" />
                    <button onClick={addToCart} className='detailSell btn'>Ajouter au panier</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;