"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";

interface ProductSection {
  title: string;
  description: string;
  isNew: boolean;
  tags: string[];
  price: number;
  productImage: string;
  discountPercentage: number;
  _id: string;
}

export default function RelatedProducts() {
  const [cards, setCards] = useState<ProductSection[]>([]);

  useEffect(() => {
    const fetchData1 = async () => {
      const res: ProductSection[] = await client.fetch(`
        *[_type=='product'][]{
          'productImage': productImage.asset->url,
          description,
          discountPercentage,
          tags,
          isNew,
          title,
          price,
          _id
        }
      `);

      setCards(res);

      if (!res || res.length === 0) {
        const fallbackRes: ProductSection[] = await client.fetch(`
          *[_type=='product'][]{
            'productImage': productImage.asset->url,
            description,
            discountPercentage,
            tags,
            isNew,
            title,
            price,
            _id
          }
        `);

        setCards(fallbackRes);
      }
    };

    fetchData1();
  }, []); // Empty dependency array to avoid unnecessary re-fetching

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Related Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.reverse().slice(0, 16).map((item: ProductSection, index: number) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow">
            <div className="relative w-full h-[301px] overflow-hidden rounded-t-lg">
              <Image
                src={item.productImage}
                alt={item.title}
                fill
                className="object-center"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description.slice(0, 20)}...</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">Rs. {item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-8 py-3 border border-[#b88e2f] hover:bg-[#b88e2f] hover:text-white transition-colors text-[#b88e2f]"
        >
          Search More
        </Link>
      </div>
    </section>
  );
}
