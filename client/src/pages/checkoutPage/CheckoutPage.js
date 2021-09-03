import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout'
import { Anchor, MaterialButton, MaterialInput } from '../../components/Material UI'
import { addOrder, getAddress } from '../../actions/userAction'
import AddressForm from './AddressForm'
import './style.css'
import PriceDetailes from '../../components/priceDetailes/PriceDetailes'
import { getCartItems, removeCartItem } from '../../actions/cartAction'
import CartPage from '../cartPage/CartPage'
import Card from '../../components/UI/card/Card'

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            { props.body && props.body}
        </div>
    )
}

const CheckoutPage = () => {

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [showAddressForm, setShowAddressForm] = useState(false);
    const [address, setAddress] = useState([]);
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentConfirmation, setPaymentConfirmation] = useState(false);
    const [orderGetConfirmed, setorderGetConfirmed] = useState(false);

    const Address = ({
        adr,
        selectAddress,
        onAddressSubmit,
        enableAddressEditForm,
        confirmSubmitAddress
    }) => {
        return (
            <div className="flexRow addressContainer">
                <div>
                    <input
                        name="address"
                        type="radio"
                        onClick={() => selectAddress(adr)}
                    />
                </div>
                <div className="flexRow sb addressinfo">
                    {!adr.edit ? (
                        <div style={{ width: '100%' }}>
                            <div className="addressDetaile">
                                <div>
                                    <span>{adr.name}</span>
                                    <span>{adr.addressType}</span>
                                    <span>{adr.mobileNumber}</span>
                                </div>
                                {adr.selected && (
                                    <Anchor
                                        name="EDIT"
                                        onClick={() => enableAddressEditForm(adr)}
                                        style={{
                                            fontWeight: "500",
                                            color: "#2874f0"
                                        }}
                                    />
                                )}
                            </div>
                            <div className="fullAddress">
                                {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
                            </div>
                            {
                                adr.selected &&
                                <MaterialButton
                                    title="DELIVERY HERE"
                                    onClick={() => confirmSubmitAddress(adr)}
                                    style={{
                                        width: '250px',
                                        margin: '10px 0'
                                    }}
                                />
                            }
                        </div>
                    ) : (
                        <AddressForm
                            withoutLayout={true}
                            onSubmitForm={onAddressSubmit}
                            initialData={adr}
                            onCancel={() => { }}
                        />
                    )}
                </div>
            </div>
        )
    }

useEffect(() => {
    auth.authenticate && dispatch(getAddress())
    auth.authenticate && dispatch(getCartItems())
}, [auth.authenticate])

useEffect(() => {
    const address = user.address.map((addr) => ({ ...addr, selected: false, edit: false }));
    setAddress(address)
}, [user.address])


const selectAddress = (addr) => {
    const updatedAddress = address.map(adr =>
        adr._id === addr._id ? { ...adr, selected: true } : { ...adr, selected: false });
    setAddress(updatedAddress);
}

const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map(adr =>
        adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false });
    setAddress(updatedAddress);
}

const userOrderConfirmation = () => {
    setOrderConfirmation(true)
    setOrderSummary(false)
    setPaymentConfirmation(true)
}

const confirmSubmitAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
}

const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
}

const onConfirmOrder = () => {
    const items = Object.keys(cart.cartItems).map(key => ({
        productId: key,
        payablePrice: cart.cartItems[key].price,
        purchaseQty: cart.cartItems[key].qty
    }));

    const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
    }, 0);

    const payload = {
        "addressId": selectedAddress._id,
        totalAmount,
        items,
        "paymentStatus": "pending",
        "paymentType": 'cod'
    };
    // console.log(payload)
    dispatch(addOrder(payload))
    setorderGetConfirmed(true);
}


return (
    <Layout>
        <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
            <div className="checkoutContainer">

                {/* check if user logged in / not */}
                <CheckoutStep
                    stepNumber={'1'}
                    title={'LOGIN'}
                    active={!auth.authenticate}
                    body={
                        auth.authenticate ? (
                            <div className="loggedIn stepCompleted">
                                <span style={{ fontWeight: 500 }}>{auth.user?.user?.fullName}</span>
                                <span style={{ margin: '0 5px' }}><strong>{auth.user?.user?.email}</strong></span>
                            </div>
                        ) : (
                            <div>
                                <MaterialInput label='Email' />
                            </div>
                        )
                    }
                />

                <CheckoutStep
                    stepNumber={'2'}
                    title={'DELIVERY ADDRESS'}
                    active={!confirmAddress && auth.authenticate}
                    body={
                        <>
                            {confirmAddress ? (
                                <div className='stepCompleted'>
                                    {`${selectedAddress.address} - ${selectedAddress.pinCode}`}
                                </div>
                            ) : (address.map(adr =>
                                    <Address
                                        selectAddress={selectAddress}
                                        enableAddressEditForm={enableAddressEditForm}
                                        confirmSubmitAddress={confirmSubmitAddress}
                                        onAddressSubmit={onAddressSubmit}
                                        adr={adr}
                                    />
                                )
                            )}
                        </>
                    }
                />

                {/* address for */}

                {
                    confirmAddress ? null
                        : showAddressForm ?
                            <AddressForm
                                onSubmitForm={onAddressSubmit}
                                onCancel={() => { }}
                            /> :
                            <CheckoutStep
                                stepNumber={'+'}
                                title={'ADD NEW ADDRESS'}
                                active={false}
                                onClick={() => setShowAddressForm(true)}
                            />
                }

                {/* order summary */}

                <CheckoutStep
                    stepNumber={'3'}
                    title={'ORDER SUMMARY'}
                    active={orderSummary}
                    body={
                        orderSummary ? 
                        <CartPage 
                            onlyCartItems={true} 
                        /> 
                        : orderConfirmation && <div className='stepCompleted'>{Object.keys(cart.cartItems).length} items</div>
                    }
                />

                { orderSummary && <Card style={{
                        margin: '10px 0'
                    }}>
                        <div 
                            className='flexRow sb'
                            style={{
                                padding: '20px',
                                alignItems: 'center'
                            }}>
                            <p>Order confirmation email will be sent to <strong>{auth.user.user?.email}</strong></p>
                            <MaterialButton
                                title={'CONTINUE'}
                                onClick={userOrderConfirmation}
                                style={{
                                    width: '200px'
                                }}
                            />
                        </div>
                    </Card>
                }

                {/* payment option */}

                <CheckoutStep
                    stepNumber={'4'}
                    title={'PAYMENT OPTIONS'}
                    active={paymentConfirmation}
                    body={
                        paymentConfirmation && 
                        <div className='stepCompleted'>
                            <div style={{ padding: '10px 0'}}>
                                <input type='radio' name="paymentType" value="COD" />
                                <span>Cash on delivery</span>
                            </div>
                            <MaterialButton 
                                title={'CONFIRM ORDER'}
                                onClick={onConfirmOrder}
                                style={{ width: '200px'}}
                            />
                        </div>
                    }
                />
            </div>

            {/* price component */}
            <PriceDetailes
                totalItem={Object.keys(cart.cartItems).reduce((qty, key) => {
                    return qty + cart.cartItems[key].qty;
                }, 0)}

                totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                    const { price, qty } = cart.cartItems[key];
                    return totalPrice + price * qty;
                }, 0)}
            />
        </div>
    </Layout>
)
}

export default CheckoutPage
