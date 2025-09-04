"use client";
import Link from "next/link";
import React from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const MyListing = () => {
  // Dummy listings for now
  const listings = [
    {
      id: 1,
      title: "Nike Air Max 270",
      price: "₹5,999",
      category: "Shoes",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "HP Pavilion 15",
      price: "₹48,999",
      category: "Laptop",
      status: "Sold",
      image:
        "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Guitar Acoustic",
      price: "₹4,500",
      category: "Music",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Listings</h1>
          <Link href='/sell' className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition">
            <FiPlus /> Add New
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold truncate">{item.title}</h2>
                <p className="text-gray-500 text-sm">{item.category}</p>
                <p className="text-blue-600 font-bold">{item.price}</p>

                <span
                  className={`inline-block text-xs font-medium px-2 py-1 rounded-md w-fit ${
                    item.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-3">
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                    <FiEdit />
                  </button>
                  <button className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600">
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
