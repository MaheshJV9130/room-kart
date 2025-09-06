"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ItemCardLoader from "@/components/ItemCardLoader";
const Product = () => {
  const router = useRouter();
  const params = useParams();
  const { productId } = params;
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getProduct = async () => {
    let req = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/product/${productId}`,
      { credentials: "include" }
    );
    req = await req.json();
    if (req.status == 404) {
      router.push("/my-listing");
    } else {
      setProduct(req);
      setImages(req.images);
      setSelectedImage(req.images[0]);
      let req2 = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/seller`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ sellerId: req.seller }),
        }
      );
      req2 = await req2.json();
      setSeller(req2);
      setIsLoading(false)
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section className="min-h-screen w-full flex justify-center px-10 py-10 bg-gray-50">
      {isLoading ? (
        <ItemCardLoader />
      ) : (
        <div className="flex w-full max-w-6xl gap-10  justify-center items-center">
          {/* Left Thumbnails */}
          <div className="flex flex-col gap-4 ">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-contain border-2 rounded-lg cursor-pointer p-1 ${
                  selectedImage === img ? "border-blue-600" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Main Product Image */}
          <div className="flex-1 flex justify-center items-start">
            <img
              src={selectedImage}
              className="w-[70%] h-auto object-contain  rounded-lg shadow-sm"
            />
          </div>

          {/* Product Info Section */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p className="text-green-600 font-medium">In Stock</p>
            <p className="text-3xl font-bold">₹{product.price}</p>
            <p className="text-sm text-gray-600">{product.description}</p>

            <ul className="list-disc pl-5 text-gray-700 text-sm capitalize">
              <li>{product.freshness}</li>
              <li>{product.category}</li>
              <li>
                Seller : {seller.name} , {seller.hostel}
              </li>
              <li>Contact : {seller.number}</li>
            </ul>

            {/* Buy Box */}

            <Link
              href={`https://wa.me/+91${seller.number}?text=Hi ${seller.name}, I am interested in your ${product.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-lg w-fit text-center"
            >
              Contact to Seller
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
