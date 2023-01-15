import React from 'react';
import '../styles/productCard.css'
import cat from '../assets/cat.jpeg';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    console.log("productCard", product.photo);

    function handleClick(e, product) {
        navigate('/product/' + product.id, { replace: true });
    }
    return (
        <div key={product.id} onClick={(e) => handleClick(e, product)}>
            <div key={product.id} className='productCard' >
                <h1 className='cardTitle'>{product.name}</h1>
                <img className='cardImage' src={product.photo ? product.photo : cat} alt="product" />
                <p className='cardDesc'>{product.description}</p>

            </div>
            <div className='cardPriceBox'>
                <p className='cardPrice' >{product.price}€ TTC</p>
            </div>
        </div>
    );
};

export default ProductCard;