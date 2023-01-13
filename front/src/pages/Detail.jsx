import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductDetail from '../components/ProductDetail';
import axios from 'axios';

const DetailProduct = () => {
    const [product, setProduct] = useState();
    let { id } = useParams();
    useEffect(() => {
        axios.get('http://localhost:8080/api/products/get/' + id)
            .then((product) => {
                setProduct(product.data);
            });
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            <a className='btn' href="/">Retour</a>
            {product && <ProductDetail product={product[0]}></ProductDetail>}
        </div>
    );
};

export default DetailProduct;