"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  useEffect(() => {
   
      const storedWishlist = localStorage.getItem("wishlist");


      console.log("💛💚", storedWishlist);
      if (storedWishlist) {
        try {
          const parsedWishlist = JSON.parse(storedWishlist);
          console.log("🛒 Parsed Wishlist Data:", parsedWishlist);

          // Check if the data is an array
          if (!Array.isArray(parsedWishlist)) {
            console.error("Invalid wishlist data structure.");
            return;
          }

          // Transform keys to match WishlistItem interface
          const transformedWishlist: WishlistItem[] = parsedWishlist.map((item: WishlistItem) => ({
            id: item.id,
            name: item.name,
            price: Number(item.price), // Convert to number
            image: item.image,
          }));

          console.log("✅ Transformed Wishlist Data:", transformedWishlist);
          setWishlistItems(transformedWishlist);
        } catch (error) {
          console.error("❌ Error parsing wishlist data:", error);
        }
      }
    }
  , []);

  const handleRemoveItem = (id: string) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    console.log("Updated wishlist saved to localStorage:", updatedWishlist);
  };

  useEffect(() => {
    console.log("🛒 Wishlist updated:", wishlistItems);
  }, [wishlistItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-[url('/blogMainImage.png')] bg-cover bg-center py-16 mb-12">
        <div className="container text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4 font-poppins">Wishlist</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <span>
              <Image src="/rightA.png" width={20} height={20} alt="arrow" />
            </span>
            <span>Wishlist</span>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Wishlist Items */}
            <div className="space-y-4">
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item: WishlistItem, index: number) => {
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="relative w-24 h-24 rounded-md overflow-hidden">
                        <Image src={item.image} alt={item.name} layout="intrinsic" width={96} height={96} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">Rs. {item.price}</p>
                      </div>
                      <button   onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">Your wishlist is empty.</p>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-4">
              You have {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} in your wishlist.
            </p>
            <div className="flex justify-between mb-2">
              <span>Total Value:</span>
              <span className="font-semibold">
                Rs.{" "}
                {wishlistItems
                  .reduce((total, item) => total + item.price, 0)
                  .toLocaleString()}
              </span>
              </div>
      </div>
      </div>
  );
}