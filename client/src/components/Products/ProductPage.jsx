import React, { useEffect, useState } from 'react'


import './ProductPage.css';
import ProductSidebar from './ProductSidebar';

import ProductList from './ProductList';
//import { setErrorMap } from './../../../node_modules/zod/dist/esm/v3/errors';
const ProductPage = () => {
  return (
    <section className='products_page'>
        <ProductSidebar />
        
        <ProductList />
    </section>

);
};

export default ProductPage;
