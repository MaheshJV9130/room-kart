"use client";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";


const SearchContent = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const params = useSearchParams();

  const fetch_searched_product = async () => {
    let req = await fetch(`/api/item/search?${params}`, {
      credentials: "include",
    });
    req = await req.json();
    setProducts(req.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch_searched_product();
  }, [params]); 

  return (
    <section className="mx-auto p-4 min-h-screen">
      {!loading && products.length === 0 ? (
        <p className="text-xl md:text-3xl text-center leading-[90vh]">
          No Product Found 🙄
        </p>
      ) : (
        <h2 className="md:text-2xl text-xl font-bold mx-2 text-center m-4">
          Results :
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
  );
};

const Search = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SearchContent />
    </Suspense>
  );
};

export default Search;
