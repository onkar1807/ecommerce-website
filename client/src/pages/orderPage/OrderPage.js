import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../actions/userAction';
import Layout from '../../components/layout/Layout'
import { Breed } from '../../components/Material UI';
import Card from '../../components/UI/card/Card'
import { generatePublicUrl } from '../../urlConfig';
import { IoIosArrowForward } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import './style.css'
import { Link } from 'react-router-dom';

const OrderPage = () => {

    const user = useSelector(state => state.user);
    // console.log(user.orders)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders())
    },[])

    return (
        <Layout>
            <div style={{ maxWidth: '1160px', margin: '5px auto' }}>
                <Breed
                    breed={[
                        { name: 'Home', href: '/'},
                        { name: 'My Account', href: '/account'},
                        { name: 'My Orders', href: '/account/order'}
                    ]}
                    breedIcon={<IoIosArrowForward />}
                />
                {
                    user.orders?.map(order => {
                        return order.items.map(item => (
                            <Card style={{ margin: '5px 0'}}>
                                <Link 
                                    to={`/order_details/${order._id}`}
                                    className="orderItemContainer"
                                >
                                    <div style={{
                                        width: 80,
                                        height: 80,
                                        overflow: 'hidden',
                                        textAlign: 'center'
                                    }}>
                                        <img 
                                            style={{
                                                maxWidth: 80,
                                                maxHeight: 80,
                                                objectFit: 'contain'
                                            }}  
                                            src={generatePublicUrl(item.productId.productPictures[0].img)} />
                                    </div>
                                    <div style={{
                                        width: '500px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        // flex: '1'
                                    }}>
                                        <div className="orderName">
                                            {item.productId?.name}
                                        </div>
                                        <div className="orderPrice"><BiRupee />{item.payablePrice}</div>
                                        <div>{order.paymentStatus}</div>
                                    </div>
                                </Link>
                            </Card>
                        ))
                    })
                }
            </div>
        </Layout>
    );
};

export default OrderPage
