import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout';
import { generateQuery } from '../../utils/Utils';
import './productListPage.css'
import ProductPage from './productPage/ProductPage';
import ProductStorePage from './productStore/ProductStorePage';

const ProductListPage = (props) => {
    
    const renderProductPage = () => {
        const params = generateQuery(props.location.search);
        let content = null;

        switch(params.type){
            case 'Store':
                content = <ProductStorePage {...props}/>
                break;
            case 'Page':
                content = <ProductPage {...props}/>
                break;
            default:
                content = null;
        }
        return content
    }

    return (
        <Layout>
            {renderProductPage()}
        </Layout>
    )
}

export default ProductListPage
