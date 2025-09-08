"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidImageAdd } from "react-icons/bi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Sell = () => {
  const [productPrev, setProductPrev] = useState([]);
  const [images, setImages] = useState([]);
  const [isSub, setIsSub] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors},
  } = useForm();

  const handlePre = (e, type) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const files = e.target.files;
    if(files.length > 3){
      setError("images",{message:"Max file limit is 3"})
        setTimeout(() => clearErrors(type), 2000);
    }else{

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
      
        if (file && file.size > MAX_FILE_SIZE) {
          setError("images", { message: "File size must be less than 5MB" });
          setTimeout(() => clearErrors(type), 2000);
        } else if (file) {
          setImages((prev) => [...prev, file]);
          setProductPrev((prev)=>[...prev , URL.createObjectURL(file)]);
        }
      }
    };
    
  };
const uploadForm = async (form) => {
      
      let req = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/sell-item`,
        { method: "POST", credentials: "include", body: form }
      );
      req = await req.json();
      if(req.status===200){
        toast.success(req.message)
        reset()
        router.push('/')
      }else{
        toast.error(req.message)
      }
    }
  const onSubmit = (data) => {
    setIsSub(true)
    const form = new FormData();
    for (const key in data) {
      form.append(key, data[key]);
    }
   images.forEach((img) => {
  form.append("productImages", img);
});
    uploadForm(form);
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:max-w-1/2 w-[80%] mx-auto border my-3 border-black/20 p-4 rounded-xl"
      >
        <h1 className="text-center text-xl md:text-3xl font-bold m-4 ">
          Submit a Product For Sell
        </h1>

        {/* Product name */}
        <div className="mb-5">
          <label
            htmlFor="product-name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Product Name
          </label>
          <input
            {...register("product-name", {
              required: "Product name is required",
            })}
            type="text"
            id="product-name"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="Ex: Chair"
          />
          {errors["product-name"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["product-name"].message}
            </p>
          )}
        </div>

        {/* product category */}
        <div className="mb-5">
          <label
            htmlFor="product-category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Product Category
          </label>
          <select
            {...register("product-category", {
              required: "Please select a category",
              validate: (v) => v !== "none" || "Please select a category",
            })}
            id="product-category"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          >
            <option value="none">Choose product category</option>
            <option value="furniture">Furniture</option>
            <option value="electronics">Electronics & Appliances</option>
            <option value="room-essentials">Room Essentials</option>
            <option value="books-stationery">Books & Stationery</option>
            <option value="fashion-personal-items">
              Fashion & Personal Items
            </option>
            <option value="others">Others</option>
          </select>
          {errors["product-category"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["product-category"].message}
            </p>
          )}
        </div>

        {/* product freshness */}
        <div className="mb-5">
          <div className="block mb-2 text-sm font-medium text-gray-900">
            Product Freshness
          </div>
          <span className="text-xs m-2 flex items-center gap-1 cursor-pointer">
            <input
              {...register("product-freshness", {
                required: "Please select an option",
              })}
              type="radio"
              id="brand-new"
              value="brand-new"
            />
            <label htmlFor="brand-new">Brand New</label>
          </span>
          <span className="text-xs m-2 flex items-center gap-1 cursor-pointer">
            <input
              {...register("product-freshness", {
                required: "Please select an option",
              })}
              type="radio"
              id="second-hand"
              value="second-hand"
            />
            <label htmlFor="second-hand">Second Hand</label>
          </span>
          {errors["product-freshness"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["product-freshness"].message}
            </p>
          )}
        </div>

        {/* product images */}
        <div className="mb-5">
          <div className="block mb-2 text-sm font-medium text-gray-900">
            Product Images
          </div>
          <div className="flex justify-start my-2 gap-3 items-center">
            <div>
              <label className="cursor-pointer flex justify-center items-center gap-2" htmlFor="images">
                {productPrev.length===0&&<BiSolidImageAdd size={120}/>}
                {productPrev.map(img=>(
                  <Image key={img} src={img} width={128} height={128} className="w-32 h-32 rounded-xl object-cover" alt="img"/>
                ))}
              </label>
              <input
                {...register("images", {
                  required: "upload at least one image",
                })}
                onChange={(e) => handlePre(e)}
                id={"images"}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
              />
              {errors.images && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* product desc*/}
        <div className="mb-5">
          <label
            htmlFor="product-desc"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Product Description
          </label>
          <textarea
            {...register("product-desc", {
              required: "Product description is required",
            })}
            id="product-desc"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 resize-none field-sizing-content focus:border-blue-600 block w-full p-2.5"
            placeholder="Additional Description"
          />
          {errors["product-desc"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["product-desc"].message}
            </p>
          )}
        </div>

        {/* product price */}
        <div className="mb-5">
          <label
            htmlFor="product-price"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Product Price
          </label>
          <input
            {...register("product-price", {
              required: "Product price is required",
              min: { value: 1, message: "Price must be at least ₹1" },
            })}
            type="number"
            id="product-price"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 resize-none field-sizing-content focus:border-blue-600 block w-full p-2.5"
            placeholder="Ex: ₹50"
          />
          {errors["product-price"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["product-price"].message}
            </p>
          )}
        </div>

        {/* submit */}
        <div className="text-center">
          <button
          disabled={isSub}
            type="submit"
            className={`disabled:bg-blue-600/20 disabled:cursor-progress text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center self-center`}
          >
            Add product
          </button>
        </div>
      </form>
    </main>
  );
};

export default Sell;
