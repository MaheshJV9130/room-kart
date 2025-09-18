import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ id, image, desc, title, price }) => {
  return (
    <div className="border border-black/20 w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-4 rounded-2xl shadow-md flex flex-col gap-3 transition hover:shadow-lg">
      {/* Product Image */}
      <div className="flex justify-center">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="h-32 sm:h-40 md:h-44 lg:h-48 w-auto object-contain rounded-lg"
        />
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold truncate text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 text-center">
        {desc}
      </p>

      {/* Price */}
      <span className="mx-auto text-lg sm:text-xl font-semibold text-blue-600">
        ₹{price}
      </span>

      {/* Buy Button */}
      <Link
        href={`/product/${id}`}
        className="border bg-blue-600 hover:bg-blue-500/90 p-2 rounded-xl font-bold text-white text-center"
      >
        Buy
      </Link>
    </div>
  );
};

export default ProductCard;
