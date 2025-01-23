'use client';
import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

function ShoppingCart() {
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Asgaard Sofa',
      price: 250000,
      quantity: 1,
      image: '',
    },
  ]);

  const toggleCart = (): void => {
    setIsCartVisible(!isCartVisible);
  };

  const calculateSubtotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateQuantity = (id: number, quantity: number): void => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (id: number): void => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative">
      {/* Cart Icon */}
      <button
        onClick={toggleCart}
        className="text-black p-2 hover:bg-gray-200 rounded"
        aria-label="Toggle Shopping Cart"
      >
        <AiOutlineShoppingCart aria-label="Shopping Cart" size={23} />
      </button>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
          isCartVisible ? 'translate-x-0' : 'translate-x-full'
        } sm:w-[400px] md:w-[450px] lg:w-[500px]`}
      >
        <div className="p-4 overflow-y-auto h-full flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            <hr />

            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex">
                    <Image
                      src={item.image}
                      height={150}
                      width={150}
                      alt={item.name}
                      className="object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="mt-8 font-medium">{item.name}</h3>
                      <p className="my-2">
                        {item.quantity} x{' '}
                        <span className="text-yellow-600">
                          Rs. {item.price.toLocaleString()}
                        </span>
                      </p>
                      {/* Quantity Input */}
                      <div className="flex gap-2 items-center">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Remove Button */}
                  <div
                    className="bg-gray-500 h-[30px] w-[30px] text-white rounded-full flex justify-center items-center cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  >
                    <span className="p-0.5 text-xl font-medium">x</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section (Subtotal + Buttons) */}
          <div className="mt-auto">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="ml-8 my-2">
                Rs. {calculateSubtotal().toLocaleString()}
              </p>
            </div>
            <hr />
            <div className="mt-4 flex justify-around mx-auto gap-4">
              <Link href="/cart">
                <button className="rounded-full text-black hover:text-white bg-white hover:bg-gray-800 px-8 py-2 border border-black">
                  View Cart
                </button>
              </Link>
              <Link href="/checkout">
                <button className="rounded-full text-black hover:text-white bg-white hover:bg-gray-800 px-8 py-2 border border-black">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Close Cart Button */}
        <button
          onClick={toggleCart}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close Cart"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
