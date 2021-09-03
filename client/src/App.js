import './App.css';
import HomePage from './pages/home/HomePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ProductListPage from './pages/product/ProductListPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/authAction';
import ProductDetails from './pages/product/productDetailsPage/ProductDetails';
import CartPage from './pages/cartPage/CartPage';
import { getCartItems, updateCart } from './actions/cartAction';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';
import OrderPage from './pages/orderPage/OrderPage';
import OrderDetails from './pages/orderDetails/OrderDetails';
import EmptyCartPage from './pages/EmptyCartPage';



function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)
  

  useEffect(() => {
    if(!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  },[auth.authenticate])

  useEffect(() => {
    dispatch(updateCart())
    dispatch(getCartItems())
  },[auth.authenticate])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        {
          Object.keys(cart.cartItems).length > 0 ?  
            <Route exact path="/cart" component={CartPage}/>
          : <Route exact path="/cart" component={EmptyCartPage}/>
        }
        <Route exact path="/checkout" component={CheckoutPage}/>
        <Route exact path="/account/order" component={OrderPage}/>
        <Route exact path="/order_details/:orderId" component={OrderDetails}/>
        <Route exact path="/:productSlug/:productId/p" component={ProductDetails}/>
        <Route exact path="/:slug" component={ProductListPage}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
