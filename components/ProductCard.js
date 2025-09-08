import Link from "next/link";
import React from "react";

const ProductCard = ({id , image , desc , title , price }) => {
  return ( 
    <div className="border border-black/20 md:w-[20%] max-w-[80%] max-h-[25rem] p-3 rounded-2xl shadow-md flex justify-between flex-col gap-2">
      <img
        src={image}
        className="h-40 w-full object-contain mb-2 rounded-lg"
      />

      <h3 className="text-lg font-bold truncate">
        {title}
      </h3>

      <p className="text-sm text-gray-500 line-clamp-2">
       {desc}
      </p>

      <span className="mx-auto text-xl font-semibold text-blue-600  px-2 py-1  w-fit">
        ₹{price}
      </span>
    <Link className="border bg-blue-600 hover:bg-blue-500/90 p-2 rounded-xl font-bold text-white" href={`/product/${id}`}>Buy</Link>
      
    </div>
  );
};

export default ProductCard;
