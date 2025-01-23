// ProductPage.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import ProductClient from "@components/productclient";
import { client } from "../../../sanity/lib/client";


// Define the type for the product
interface Product {
  id: string; // Updated to match the ProductClient prop
  title: string;
    description: string;
  price: number;
  discountPercentage: number;
  isNew: boolean;
  tags: string[];
  imageUrl: string; // Updated to match ProductClient
  colors: string[];
  sizes: string[];
}

// Fetch product data from Sanity
const fetchProduct = async (id: string): Promise<Product | null> => {
  const query = `*[_type == "product" && _id == $id][0]{
    _id,
    title,
    description,
    price,
    discountPercentage,
    isNew,
    tags,
    "imageUrl": productImage.asset->url,
    colors,
    sizes
  }`;
  const product = await client.fetch(query, { id });

  // Map the fetched product to match the Product interface
  return product
    ? {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        isNew: product.isNew,
        tags: product.tags,
        imageUrl: product.imageUrl,
        colors: product.colors || [],
        sizes: product.sizes || [],
      }
    : null;
};

// Product Page Component
const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await fetchProduct(params.id);

  if (!product) {
    notFound();
  }

  // Default fallback sizes and colors
  const defaultSizes = ["S", "M", "L"];
  const defaultColors = ["Red", "Blue", "Green"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
      {/* Image Section */}
      <div className="flex justify-center">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg shadow-lg w-full max-w-md object-cover"
        />
      </div>

      {/* Product Details Section */}
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">{product.title}</h1>
        <p className="text-lg text-primary font-semibold">${product.price.toFixed(2)}</p>
        {product.discountPercentage && (
          <p className="text-sm text-red-500 font-bold">-{product.discountPercentage}% Off</p>
        )}
        <p className="text-green-700 font-bold italic">{product.description}</p>

        {/* Colors Section */}
        <div className="flex gap-3 mt-2">
          {(product.colors.length > 0 ? product.colors : defaultColors).map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>

        {/* Sizes Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900">Sizes:</h3>
          <div className="flex gap-2 mt-2">
            {(product.sizes.length > 0 ? product.sizes : defaultSizes).map((size, index) => (
              <span
                key={index}
                className="border border-gray-300 px-3 py-1 rounded-lg text-sm font-semibold"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Client-Side Add to Cart Button */}
        <ProductClient product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
