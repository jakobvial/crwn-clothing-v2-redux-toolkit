import {CartItemContainer, ItemDetails} from "./cart-item.styles";
import {CartItem as tCartItem} from "../../store/cart/cart.types";
import {FC} from "react";

export type CartItemProps = {
    cartItem: tCartItem
}

const CartItem: FC<CartItemProps> = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <ItemDetails>
                <span>{name}</span>
                <span>
          {quantity} x ${price}
        </span>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;
