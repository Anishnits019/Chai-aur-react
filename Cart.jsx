import React from "react";
import CartItem from "./CartItem";

const Cart = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-80 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
      ))}
      <h3 className="text-lg font-semibold mt-4">
        Total: ${totalPrice.toFixed(2)}
      </h3>
    </div>
  );
};

export default Cart;