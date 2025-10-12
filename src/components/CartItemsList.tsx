import React from "react";
import { ListGroup } from "react-bootstrap";
import type { CartItem as CartItemType } from "../interfaces";
import CartItem from "./CartItem";

interface CartItemsListProps {
  items: CartItemType[];
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
  onQuantityChange,
  onRemoveItem,
}) => {
  return (
    <ListGroup variant="flush">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ListGroup>
  );
};

export default CartItemsList;
