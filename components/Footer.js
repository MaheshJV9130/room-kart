import React from "react";

const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-100 shadow-sm">
  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <a
        href="#"
        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
      >
        
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-600">
          RoomKart
        </span>
      </a>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </div>
    <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
    <span className="block text-sm  sm:text-center">
      © {year}
      <a href="#" className="hover:underline  font-semibold">
        RoomKart™
      </a>
      . All Rights Reserved.
    </span>
  </div>
</footer>

  );
};

export default Footer;
