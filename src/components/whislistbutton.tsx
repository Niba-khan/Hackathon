// components/WishlistButton.tsx
'use client'; // Ensures the component is client-side

import { useState, useEffect } from 'react';

interface WishlistButtonProps {
  productId: string;
}

const WishlistButton = ({ productId }: WishlistButtonProps) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const handleAddToWishlist = () => {
    if (!wishlist.includes(productId)) {
      const updatedWishlist = [...wishlist, productId];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      alert('Added to Wishlist');
    } else {
      alert('This product is already in your wishlist.');
    }
  };

  return (
    <button
      onClick={handleAddToWishlist}
      className="bg-gray-900 text-white px-6 py-3 rounded-full mt-6 transition duration-300 hover:bg-gray-700"
    >
      Add to Wishlist
    </button>
  );
};

export default WishlistButton;
