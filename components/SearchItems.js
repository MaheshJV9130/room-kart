"use client";
import React, { useState } from "react";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";

const SearchItems = () => {
  const router = useRouter()
  const path = usePathname();
  const [query, setQuery] = useState("")
  const search = async(e) => {
    e.preventDefault()
    router.push(`/search?q=${query}`)
  }
  const category = async(e) => {
    e.preventDefault()
    if(e.target.value === "all"){
      router.push('/')
    }else{

      router.push(`/search?q=${e.target.value}`)
    }
  }
  
  if (path === "/" || path === "/search") {
    return (
      <form className="m-2 w-full flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 bg-gray-100 px-4 py-3  mx-auto">
        {/* Search Input */}
        <div className="flex w-full md:flex-1 border rounded-lg overflow-hidden shadow-sm">
          <input
            type="text"
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search items..."
            className="flex-1 p-2 md:p-3 text-sm md:text-base outline-none bg-white placeholder:text-gray-500"
          />
          <button
            type="submit"
            onClick={(e)=>search(e)}
            className="bg-black text-white px-3 md:px-5 flex items-center justify-center hover:bg-gray-800 transition"
          >
            <FaMagnifyingGlass size={20} />
          </button>
        </div>

        {/* Category Select */}
        <select
        onChange={category}
          className="w-full md:w-auto p-2 md:p-3 text-sm md:text-base border rounded-lg bg-white shadow-sm cursor-pointer outline-none"
        >
          <option value="all">All Categories</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics & Appliances</option>
          <option value="room-essentials">Room Essentials</option>
          <option value="books-stationery">Books & Stationery</option>
          <option value="fashion-personal-items">
            Fashion & Personal Items
          </option>
        </select>
      </form>
    );
  }

  return null;
};

export default SearchItems;
