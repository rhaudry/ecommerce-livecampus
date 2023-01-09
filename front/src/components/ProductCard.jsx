import React from 'react';
import '../styles/productCard.css'
import cat from '../assets/cat.jpeg';

function handleClick(e, product) {
    console.log(product);
}

const ProductCard = ({ product }) => {
    console.log("productCard", product.photo);
    return (
        <div key={product.id} onClick={(e) => handleClick(e, product.id)}>
            <div key={product.id} className='productCard' >
                <h1 className='cardTitle'>{product.name}</h1>
                <img className='cardImage' src={product.photo ? product.photo : cat} alt="product" />
                <p className='cardDesc'>{product.description}</p>

            </div>
            <div className='cardPriceBox'>
                <p className='cardPrice' >{product.price}€ TTC</p>
                <button className='cardSell'>Ajouter au panier</button>
            </div>
        </div>
    );
};

export default ProductCard;