'use client'
import React, { useState, useEffect } from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";

const sanity = sanityClient({
  projectId: "h6zorl2h",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});

interface Product {
  _id: number
  title: string;
  price: number;
  description: string;
  discountpercentage: number;
  productImage: {
    asset: {
      url: string
      _ref: string;
    };
    tags: string[];
  };
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products from Sanity
  const fetchProducts = async () => {
    try {
      const query = `*[_type == "product"]{
        _id,
        title,
        price,
        description,
        discountpercentage,
        productImage { asset->{_id, url} }
      }`;
      
      const result = await sanity.fetch(query);
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Handle product click to show details
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Product List</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <h3 className="text-xl font-semibold mb-4">{product.title}</h3>
            <Image
              src={product.productImage.asset.url}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-64 object-cover mb-4"
            />
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2 font-semibold">Price: ${product.price}</p>
            <p className="mt-1 text-sm text-gray-500">Discount: {product.discountpercentage}%</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Display selected product details */}
      {selectedProduct && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">{selectedProduct.title}</h3>
          <Image
            src={selectedProduct.productImage.asset.url}
            alt={selectedProduct.title}
            width={500}
            height={500}
            className="w-full h-96 object-cover mb-4"
          />
          <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
          <p className="font-semibold">Price: ${selectedProduct.price}</p>
          <p className="text-sm text-gray-500">Discount: {selectedProduct.discountpercentage}%</p>
        </div>
      )}

      {/* Cart section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        <ul>
          {cart.map((product, index) => (
            <li key={index} className="text-lg">{product.title}</li>
          ))}
        </ul>
        <p className="mt-4 font-semibold">Total: ${cart.reduce((total, product) => total + product.price, 0)}</p>
      </div>
    </div>
  );
};

export default ProductCards;
