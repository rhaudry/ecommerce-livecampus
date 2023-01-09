import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Cookies from 'universal-cookie';
import '../styles/productList.css';
const cookies = new Cookies();
const token = cookies.get('token');


const ProductsList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:8080/api/products/get', { token: token })
            .then((products) => {
                setProducts(Object.values(products.data));
            });
    }, []);
    return (
        <div className='productsGlobalBox'>
            <h1 className='productListTitle'>ProductList</h1>
            <div className='productsContainer'>
                {products.map((product) => {
                    return <ProductCard product={product} key={product.id}></ProductCard>
                })}
            </div>
        </div>
    );
};

export default ProductsList;