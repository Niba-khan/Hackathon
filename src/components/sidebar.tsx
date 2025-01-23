import React from "react";
import { useCart } from "./cardcontext";
 // Adjust the import path

const CartSidebar = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="fixed right-0 top-0 w-72 h-full bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p> 
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <div>
                <h3>{item.title}</h3>
                <p>
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="btn btn-secondary"
                >
                  +
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="btn btn-secondary"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
