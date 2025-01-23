import { client } from "../../../sanity/lib/client";
import { NextResponse } from "next/server";

// This API route fetches product data from Sanity CMS and returns it as a JSON response.
export async function GET() {
  try {
    const data = await client.fetch(`*[_type=="product"]{
     _id,
      title,
      price,
      isNew,
      dicountPercentage,
      "imageUrl": productImage.asset._ref,
      description,
      tags,
      _createdAt,
      _updatedAt
}`);

    return  NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    return new NextResponse('Error fetching data', { status: 500 });
  }
}