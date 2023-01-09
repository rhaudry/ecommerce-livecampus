import React from 'react';
import Cookies from 'universal-cookie';
import NavBar from '../components/NavBar';
import ProductList from '../components/ProductsList';

const Home = () => {
    const cookies = new Cookies();
    return (
        <div>
            <NavBar></NavBar>
            <ProductList></ProductList>
        </div >
    );
};

export default Home;