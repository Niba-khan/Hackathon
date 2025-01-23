'use client'
import React, { useState, useEffect } from "react";
import CreateClient from "@sanity/client";
import Image from "next/image";
import Link from "next/link";

const sanity = CreateClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});

interface Product {
  _id: string;
  title: string;
  price: number;
  productImage: {
    asset: {
      url: string;
    };
  };
}

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false); // Track if it's client-side

  const fetchProducts = async () => {
    try {
      const query = `*[_type == "product"]{
        _id,
        title,
        price,
        productImage { asset->{_id, url} }
      }`;
      
      const result = await sanity.fetch(query);
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted
    fetchProducts();
  }, []);

  if (!isClient) {
    return null; // Optionally render loading state until mounted on client
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-20">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-4">{product.title}</h3>
            <Image
              src={product.productImage.asset.url}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-64 object-cover mb-4"
            />
            <p className="mt-2 font-semibold">Price: ${product.price}</p>
             
        
        <Link
          href={`/product/${product._id}`} 
          className="block px-4 py-2 text-center bg-blue-500 text-white rounded"
        >
         Add To Cart
        </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
