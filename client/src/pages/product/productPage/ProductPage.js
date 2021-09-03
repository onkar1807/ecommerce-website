import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pageAction } from '../../../actions/productAction';
import { generateQuery } from '../../../utils/Utils';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './productPage.css'
import Card from '../../../components/UI/card/Card';

const ProductPage = (props) => {

    const product = useSelector(state => state.product);
    const { page } = product
    const dispatch = useDispatch();

    useEffect(() => {
        const params = generateQuery(props.location.search);
        const payload = {
            params
        }
        dispatch(pageAction(payload));
    },[])

    return (
        <div style={{ margin: '0 10px' }}>
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs={() => {}}
            >
                {
                    page.banners && page.banners.map((banner, index) => 
                        <a
                            key={index}
                            style={{ display: 'block'}}
                            href={banner.navigateTo}
                        >
                            <img src={banner.img} alt="" />
                        </a>
                    )
                }
            </Carousel>
            <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '10px 0'
                }}>
                    {
                        page.products && page.products.map((product, index) =>
                            <Card style={{
                                width: '400px',
                                height: '200px',
                                margin: '5px'
                            }}>
                                <img 
                                    style={{ 
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                    src={product.img} alt="" />
                            </Card>
                        )
                    }
            </div>
        </div>
    )
}

export default ProductPage
