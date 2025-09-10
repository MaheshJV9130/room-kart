"use client";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    let req = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/fetch-items`,
      { credentials: "include" }
    );
    req = await req.json();

    setProducts(req.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <section className="mx-auto p-4 min-h-screen">
        {!loading && products.length === 0 ? (
          <img src="/nopr.jpg" className="w-screen object-contain h-screen md:h-1/2" width={300} height={300} alt="nopr"/>
        ) : (
          <h2 className="md:text-2xl text-xl font-bold mx-2 text-center m-4">
            New Arrivals
          </h2>
        )}

        <div className="flex flex-wrap gap-5 justify-center text-center">
          {loading && <Loader />}
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              desc={product.description}
              title={product.title}
              image={product.images[0]}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
