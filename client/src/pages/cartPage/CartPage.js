import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getCartItems, removeCartItem } from '../../actions/cartAction'
import Layout from '../../components/layout/Layout'
import { MaterialButton } from '../../components/Material UI'
import PriceDetailes from '../../components/priceDetailes/PriceDetailes'
import Card from '../../components/UI/card/Card'
import CartItem from './cartItem/CartItem'
import './cartPage.css'

/* 
before login
add product to cart
save in localstorage
when try to checkout ask for credentials and
if logged in add products to users cart database from localstorage
 */

const CartPage = (props) => {

    const cart = useSelector(state => state.cart);
    // console.log(cart);
    const auth = useSelector(state => state.auth);

    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems)
    }, [cart.cartItems])

    useEffect(() => {
        if(auth.authenticate) {
            dispatch(getCartItems())
        }
    },[auth.authenticate])

    const renderCartIncrement = (_id, qty) => {
        const { name, price, img} = cartItems[_id]
        dispatch(addToCart({ _id, name, price, img }, 1));
    }

    const renderCartDecrement = (_id, qty) => {
        const { name, price, img} = cartItems[_id]
        dispatch(addToCart({ _id, name, price, img }, -1));
    }

    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({ productId: _id }))
    }

    

    if(props.onlyCartItems) {
        return (
            <>
            {
                 Object.keys(cartItems).map((key, index) => 
                    <CartItem
                        key={index} 
                        cartItem={cartItems[key]}
                        cartInc={renderCartIncrement}
                        cartDec={renderCartDecrement}
                        onRemoveCartItem={onRemoveCartItem}
                    />
                )
            }
            </>
        )
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: 'flex-start'}}>
                <Card
                    headerLeft={'My Cart'}
                    headerRight={ <div>Delivery to</div>}
                    style={{ width: 'calc(100% - 400px)', overFlow: 'hidden' }}
                >   
                    {
                        Object.keys(cartItems).map((key, index) => 
                            <CartItem
                                key={index} 
                                cartItem={cartItems[key]}
                                cartInc={renderCartIncrement}
                                cartDec={renderCartDecrement}
                                onRemoveCartItem={onRemoveCartItem}
                            />
                        )
                    }

                    <div style={{
                        width: '100%',
                        display: 'flex',
                        background: '#ffffff',
                        justifyContent: 'flex-end',
                        boxShadow: '0 0 10px 10px #eee',
                        padding: '10px 0',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ width: '250px' }}>
                            <MaterialButton 
                                title="PLACE ORDER"
                                onClick={() => props.history.push('/checkout')}
                            />
                        </div>
                    </div>
                </Card>

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

export default CartPage
