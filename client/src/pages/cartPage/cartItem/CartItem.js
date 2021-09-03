import React, { useState } from 'react'
import { generatePublicUrl } from '../../../urlConfig'
import './style.css'

const CartItem = (props) => {

    const [qty, setqty] = useState(1)
    const {
        _id, name, img, price
    } = props.cartItem

    const cartInc = () => {
        setqty(qty + 1)
        props.cartInc(_id, qty + 1)
    }

    const cartDec = () => {
        if(qty <= 1) return
        setqty(qty - 1)
        props.cartDec(_id, qty - 1)
    }

    return (
        <div className="cartItemContainer">
            <div className="flexRow">
                <div className="cartProImageContainer">
                    <img src={generatePublicUrl(img)} alt=""/>
                </div>
                <div className="cartItemDetails">
                    <div>
                        <p>{name}</p>
                        <p>Rs. {price}</p>
                    </div>
                    <div>Delivery in 3 - 5 days</div>
                </div>
            </div>

            <div style={{
                display: 'flex',
                margin: '5px 0'
            }}>
                <div className="quantityControl">
                    <button onClick={cartDec}>-</button>
                    <input value={qty} readOnly/>
                    <button onClick={cartInc}>+</button>
                </div>
                <button className="cartActionBtn">Save for later</button>
                <button 
                    className="cartActionBtn" 
                    onClick={()=>props.onRemoveCartItem(_id)}>
                        Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem
