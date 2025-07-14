/*
 *
 * Cart
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { CloseIcon, BagIcon } from '../../components/Common/Icon';
import Button from '../../components/Common/Button';
import CartList from '../../components/Store/CartList';
import CartSummary from '../../components/Store/CartSummary';
import Checkout from '../../components/Store/Checkout';
import { trackCartViewed } from '../../utils/rudderstack';

class Cart extends React.PureComponent {
  componentDidMount() {
    // Track cart viewed when cart is opened
    if (this.props.isCartOpen && this.props.cartItems.length > 0) {
      trackCartViewed(this.props.cartItems);
    }
  }

  componentDidUpdate(prevProps) {
    // Track cart viewed when cart is opened
    if (!prevProps.isCartOpen && this.props.isCartOpen && this.props.cartItems.length > 0) {
      trackCartViewed(this.props.cartItems);
    }
  }

  render() {
    const {
      isCartOpen,
      cartItems,
      cartTotal,
      toggleCart,
      handleShopping,
      handleCheckout,
      handleRemoveFromCart,
      placeOrder,
      authenticated
    } = this.props;

    return (
      <div className='cart'>
        <div className='cart-header'>
          {isCartOpen && (
            <Button
              borderless
              variant='empty'
              ariaLabel='close the cart'
              icon={<CloseIcon />}
              onClick={toggleCart}
            />
          )}
        </div>
        {cartItems.length > 0 ? (
          <div className='cart-body'>
            <CartList
              toggleCart={toggleCart}
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </div>
        ) : (
          <div className='empty-cart'>
            <BagIcon />
            <p>Your shopping cart is empty</p>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className='cart-checkout'>
            <CartSummary cartTotal={cartTotal} />
            <Checkout
              handleShopping={handleShopping}
              handleCheckout={handleCheckout}
              placeOrder={placeOrder}
              authenticated={authenticated}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isCartOpen: state.navigation.isCartOpen,
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartTotal,
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(Cart);
