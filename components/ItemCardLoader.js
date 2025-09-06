import React from "react";

const ItemCardLoader = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Image Loader */}
      <div className="h-48 w-full bg-gray-200" />

      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-1/4" />

        {/* Price */}
        <div className="h-4 bg-gray-200 rounded w-16" />

        {/* Description */}
        <div className="h-6 bg-gray-200 rounded w-1/2" />

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-3">
          <div className="h-9 w-9 rounded-lg bg-gray-200" />
          <div className="h-9 w-9 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ItemCardLoader;
