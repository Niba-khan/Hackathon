"use client";

import { useState } from "react";
import Link from "next/link";

// Define the Product type
interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

const AddToCartButton = ({ product }: { product: Product }) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);

    if (!product.imageUrl) {
      console.error("Image URL is missing or invalid");
      return;
    }


    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleAddToCart}
        className="w-full bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Add to Cart
      </button>
      {showNotification && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4">
          <span>Product added to cart</span>
          <Link href="/cart" className="underline font-semibold hover:text-gray-200">
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
