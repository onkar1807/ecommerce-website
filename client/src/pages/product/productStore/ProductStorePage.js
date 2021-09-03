import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../../actions/productAction';
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom'
import '../../product/productListPage.css'
import Card from '../../../components/UI/card/Card';
import Price from '../../../components/UI/card/Price';
import Rating from '../../../components/UI/card/Rating';

const ProductStorePage = ({match}) => {

    const product = useSelector(state => state.product);
    const [priceRange, setpriceRange] = useState({
        under10k: '10000',
        under15k: '15000',
        under20k: '20000',
        under25k: '25000',
    })
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createProduct(match.params.slug))
    }, [])

    return (
        <>
           {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            headerLeft={`${match.params.slug} Mobile under ${priceRange[key]}`}
                            headerRight={<button>View all</button>}
                            style={{
                                width: 'calc(100% - 40px)',
                                margin: '20px'
                            }}
                        >
                            <div>
                                {
                                    product.productsByPrice[key].map(product => 
                                        <Link 
                                            to={`/${product.slug}/${product._id}/p`}
                                            style={{
                                            display: 'block', 
                                            textDecoration: 'none',
                                            color: 'black'
                                        }} className="productContainer">
                                            <div className="productImgContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />  
                                            </div>                                      
                                            <div className="productInfo">
                                                    <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                    <div>
                                                        <Rating value={'4.3'} />
                                                        &nbsp;&nbsp;
                                                        <span
                                                            style={{
                                                                color: '#777',
                                                                fontWeight: '500',
                                                                fontSize: '13px'
                                                            }}
                                                        >
                                                            4333
                                                        </span>
                                                    </div>
                                                    <Price value={product.price} />
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </Card>
                    )
                })
            } 
        </>
    )
}

export default ProductStorePage
