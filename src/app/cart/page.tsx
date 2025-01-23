"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: SanityImageSource;
  alt: string;
}

export default function CartPage() {
  const [sanityData, setSanityData] = useState<Product[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] {
          _id,
          name,
          description,
          price,
          originalPrice,
          discount,
          image,
          alt,
        }`;
        const data: Product[] = await client.fetch(query);
        setSanityData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Update cart items when sanityData or cart changes
  useEffect(() => {
    const savedCart: string[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  useEffect(() => {
    if (sanityData.length > 0) {
      const items = cart
        .map((id) => sanityData.find((product) => product._id === id))
        .filter((item): item is Product => Boolean(item));
      setCartItems(items);
    }
  }, [sanityData, cart]);

  // Remove item from cart
  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((productId) => productId !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      {/* Cart Banner */}
      <div>
        <Image
          src={"/image/cart.png"}
          alt="cart-section"
          width={1440}
          height={316}
          className="w-full h-auto mt-20"
        />
      </div>

      {/* Main Cart Section */}
      <div className="flex flex-col custom:flex-row justify-between items-start lg:items-center custom:items-start mx-4 lg:mx-[100px] my-[56px] gap-8 lg:gap-0">
        <div className="flex flex-col justify-start items-center gap-[56px] w-full lg:w-auto">
          <div className="w-full hidden lg:w-[817px] h-[55px] bg-[#F9F1E7] rounded-lg md:flex justify-between items-center px-[30px]">
            <h1 className="font-[500] text-[16px] leading-6">Product</h1>
            <h1 className="font-[500] text-[16px] leading-6">Price</h1>
            <h1 className="font-[500] text-[16px] leading-6">Actions</h1>
          </div>

          {/* Render Cart Items */}
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="w-full lg:w-[817px] h-auto flex flex-col md:flex-row justify-between items-center pr-[30px] gap-4 lg:gap-0"
              >
                <div className="flex justify-start items-center gap-3">
                  <div className="flex justify-center items-center bg-[#F9F1E7] size-[105px] rounded-[10px]">
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.name}
                      width={90}
                      height={50}
                      className="rounded-lg object-scale-down w-full h-full"
                    />
                  </div>
                  <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">
                    {item.name}
                  </h1>
                </div>
                <h1 className="font-[500] text-[16px] leading-6 text-[#9F9F9F]">
                  Rs. {item.price}
                </h1>

                <button onClick={() => removeFromCart(item._id)}>
                  <Image
                    src="/icons/delete-icon.png" // Path to your delete icon image
                    alt="Delete"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center">Your cart is empty</p>
          )}
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-[393px] h-auto bg-[#F9F1E7] rounded-lg px-[20px] lg:px-[75px] py-3 flex flex-col justify-start items-center">
          <h1 className="font-[600] text-[32px] leading-[48px] text-black text-center">
            Cart Totals
          </h1>
          <div className="flex justify-between items-center gap-[20px] lg:gap-[50px] mt-[56px] w-full">
            <h1 className="font-[500] text-[16px] text-black">Subtotal</h1>
            <h1 className="font-[500] text-[16px] text-[#9F9F9F]">Rs. {totalPrice}</h1>
          </div>
          <div className="flex justify-between items-center gap-[20px] lg:gap-[50px] mt-[26px] w-full">
            <h1 className="font-[500] text-[16px] text-black">Total</h1>
            <h1 className="font-[500] text-[20px] text-[#B88E2F]">Rs. {totalPrice}</h1>
          </div>
          <Link href="/checkout">
            <button className="w-[222px] h-[58.95px] border border-black rounded-[15px] mt-[50px] hover:bg-black hover:text-white ease-in-out duration-300">
              Check Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
