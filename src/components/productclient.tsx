'use client'; // Mark this component as a Client Component

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link if you need Next.js navigation

// Define the type for the product prop
interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

interface ProductClientProps {
  product: Product;
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const [message, setMessage] = useState<string>(''); // State to show message

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    // Set the message when the product is added to cart
    setMessage('Added to Cart');
    
    // Optional: Automatically hide the message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      {/* Show the message if set */}
      {message && <p className="text-green-600 font-semibold">{message}</p>}

      <button
        onClick={() => handleAddToCart(product)} // Call the handleAddToCart function
        className="w-full bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Add to Cart
      </button>
      
      <Link
        href="/cart"
        className="w-full bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Go to Cart
      </Link>
    </div>
  );
};

export default ProductClient;
