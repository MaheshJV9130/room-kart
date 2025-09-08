"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
const Nav = () => {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(false);
  const fetchUserData = async () => {
    let req = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
      credentials: "include",
    });

    req = await req.json();

    if (req.status === 200) {
      setUser(true);
      router.refresh();
    }
   
  };
  const logoutFun = async () => {
    if (confirm("Are you really want logout?")) {
      let req = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        { credentials: "include" }
      );
      req = await req.json();
      if (req.status === 200) {
        setUser(false);
        router.push("/login");
      }
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [path]);

  return (
    <nav className="h-16 bg-gray-100 text-black flex justify-between px-2 md:px-10 items-center">
      <Link href={"/"}>
        <h1 href="/" className="text-blue-600  md:text-3xl font-bold">
          RoomKart
        </h1>
      </Link>
      <ol className="flex justify-between md:gap-5 gap-3 text-xs md:text-base items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/sell">Sell</Link>
        </li>
        <li>
          <Link href="/my-listing">My Listings</Link>
        </li>
        <li>
          {user ? (
            <button className="text-red-600" onClick={logoutFun}>
              logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </li>
      </ol>
    </nav>
  );
};

export default Nav;
