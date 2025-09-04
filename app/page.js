'use client'
import ProductCard from "@/components/ProductCard";
import ProductCardSke from "@/components/ProductCardSke";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchProducts = async () => {
    let req = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item/fetch-items`, {credentials:"include"})
    req = await req.json()
    
    setProducts(req.data)
    setLoading(false)
  }
  useEffect(() => {
    
    fetchProducts()
  }, [])
  
  return (
    <main>
      <section className="mx-auto p-4">
        <h2 className="text-2xl font-bold mx-2 text-center m-4">Recommended</h2>
        <div className="flex flex-wrap gap-5 justify-center text-center">
          {loading&&<ProductCardSke/>}
          {products.map(product=>(
            <ProductCard key={product._id} id={product._id} desc={product.description} title={product.title} image={product.images[0]} price={product.price}/>
          ))}
        </div>
      </section>
    </main>
  );
}
