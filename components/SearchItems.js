"use client";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname } from "next/navigation";
const SearchItems = () => {
  const path = usePathname();
  if (path === "/") {
    return (
      <form className=" flex items-center gap-10 justify-center bg-gray-100 my-2 py-2">
        <div className="flex border-2 rounded-xs">
          <input
            type="text"
            placeholder="Search items"
            className=" p-2 outline-0 placeholder:text-black/50"
          />
          <button className="bg-black text-white p-1 cursor-pointer">
            <FaMagnifyingGlass size={25} />
          </button>
        </div>
        <select name="" id="" className="font-bold outline-0">
          <option value="all">All Category</option>
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
  } else {
    return null;
  }
};

export default SearchItems;
