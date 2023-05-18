import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from "react";

import {selectCartItems, selectIsCartOpen} from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles';
import {setIsCartOpen} from "../../store/cart/cart.slice";

const CartDropdown = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);
    const navigate = useNavigate();

    // Using useCallback to memoize the function, limiting the number of times the function is initialized.
    // Using useMemo, instead, would memoize the value returned by the function. This is advisable when the function
    // is expensive to run.
    const goToCheckoutHandler = useCallback(() => {
        navigate('/checkout');
        dispatch(setIsCartOpen(!isCartOpen))
    }, [isCartOpen]);

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>)
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
