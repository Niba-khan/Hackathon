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

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");

    if (storedWishlist) {
      try {
        const parsedWishlist: WishlistItem[] = JSON.parse(storedWishlist);

        // Validate and transform the data
        const validWishlist = Array.isArray(parsedWishlist)
          ? parsedWishlist.map((item) => ({
              ...item,
              price: Number(item.price),
            }))
          : [];

        setWishlistItems(validWishlist);
      } catch (error) {
        console.error("Error parsing wishlist data:", error);
      }
    }
  }, []);

  // Remove item from wishlist
  const handleRemoveItem = (id: string) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Component for individual wishlist items
  const WishlistCard = ({ item }: { item: WishlistItem }) => (
    <div className="flex items-center space-x-4">
      <div className="relative w-24 h-24 rounded-md overflow-hidden">
        <Image src={item.image} alt={item.name} layout="intrinsic" width={96} height={96} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">Rs. {item.price}</p>
      </div>
      <button onClick={() => handleRemoveItem(item.id)} className="text-gray-500 hover:text-red-500">
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-[url('/blogMainImage.png')] bg-cover bg-center py-16 mb-12">
        <div className="container text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4 font-poppins">Wishlist</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>
              <Image src="/rightA.png" width={20} height={20} alt="arrow" />
            </span>
            <span>Wishlist</span>
          </div>
        </div>
      </div>

      {/* Wishlist Items Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => <WishlistCard key={item.id} item={item} />)
          ) : (
            <p className="text-gray-500">Your wishlist is empty.</p>
          )}
        </div>

        {/* Wishlist Summary Section */}
        <div>
          <p className="text-sm text-gray-500 mb-4">
            You have {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} in your wishlist.
          </p>
          <div className="flex justify-between mb-2">
            <span>Total Value:</span>
            <span className="font-semibold">
              Rs.{" "}
              {wishlistItems.reduce((total, item) => total + item.price, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
