"use client";

import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const MyListing = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  const deleteProduct = async (id) => {
    if(confirm("Are you really want to delete this product ?")){let req = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/delete`,
      {
        method: "DELETE",
        body: JSON.stringify({ productId: id }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    req = await req.json();
    if (req.status === 200) {
      toast.success(req.message);
      document.location.reload()
    } else {
      toast.error(req.message);
    }}
  };

  const fetchListing = async () => {
    let req = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/listings`,
      { credentials: "include" }
    );

    req = await req.json();

    setListings(req);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Listings</h1>
          <Link
            href="/sell"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            <FiPlus /> Add New
          </Link>
        </div>

        {/* Listings Grid */}
        {!isLoading && listings.length === 0 && (
          <p className="text-center text-2xl m-2 p-2">No Product for sell</p>
        )}
          {isLoading && <Loader />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={item.images[0]}
                alt={item.title}
                width={192}
                height={192}
                className="h-48 w-full object-contain "
              />

              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold truncate">{item.title}</h2>
                <p className="text-gray-500 text-sm">{item.category}</p>
                <p className="text-blue-600 font-bold">₹{item.price}</p>

                <span className="inline-block text-xs font-medium px-2 py-1 rounded-md w-fit  text-gray-700">
                  {item.description}
                </span>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-3">
                  <button onClick={()=>router.push(`/edit/${item._id}`)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                    <FiEdit />
                  </button>

                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyListing;
