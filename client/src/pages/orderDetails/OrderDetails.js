import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions/userAction';
import Layout from '../../components/layout/Layout'
import Card from '../../components/UI/card/Card';
import './style.css'

const OrderDetails = ({ match }) => {

    const user = useSelector(state => state.user);
    const { orderDetails } = user;
    const dispatch = useDispatch();

    useEffect(() => {
        const payload = {
            orderId: match.params.orderId
        }
        dispatch(getOrder(payload))
    }, [])

    if(!(orderDetails && orderDetails.address)) {
        return null
    }

    return (
        <Layout>
            <div style={{
                width: '1160px',
                margin: '10px auto'
            }}>
                <Card  style={{
                     margin: "10px 0",
                }}>
                    <div className="delAdrContainer">
                        <div className="delAdrDetails">
                            <div className="delTitle">Delivery Address</div>
                            <div className="delName">{orderDetails.address.name}</div>
                            <div className="delAddress">{orderDetails.address.address}</div>
                            <div className="delPhoneNumber">
                                Phone number {orderDetails.address.mobileNumber}
                            </div>
                        </div>
                        <div className="delMoreActionContainer">
                            <div className="delTitle">More Actions</div>
                            <div className="delName">Download Invoice</div>
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    )
}

export default OrderDetails
