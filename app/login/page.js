"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const login = async (data) => {
    let req = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials:'include'
    });
    req = await req.json();
    if(req.status==200){
      toast.success(req.message)
      router.push('/')
    }
    if(req.status==404){
      toast.error(req.message)
    }
  };
  const registerUser = async (data) => {
    
    if (data.password !== data.confirmPass) {
        setError("confirmPass", {
          message: "confirm password is not same as password",
        });
        return
      }
      if (data.hostel === "none") {
        setError("hostel", { message: "select hostel" });
        return
      }
      clearErrors()
    let req = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials:'include'
      }
    );
    req = await req.json();
    if(req.status==200){
      toast.success(req.message)
      router.push('/')

    }
  };

  const onSubmit = (data) => {
    if (data.name) {
      registerUser(data);
    } else {
      login(data);
    }
  };
  const [isLoggin, setIsLoggin] = useState(true);
  const formHandle = () => {
    reset();
    setIsLoggin((prev) => !prev);
  };

  return (
    <div className=" min-h-screen flex items-center">
      {isLoggin && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:max-w-sm w-[80%] mx-auto border border-black/20  p-4 rounded-xl"
        >
          <h1 className="text-center text-3xl font-bold m-4 ">Welcome Back</h1>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center self-center"
            >
              Submit
            </button>
          </div>
          <div className="text-center text-xs m-2">
            <p>Don't have an account?</p>
            <button
              className="cursor-pointer text-blue-600"
              onClick={formHandle}
            >
              Create account
            </button>
          </div>
        </form>
      )}

      {/* Sign Up Form */}

      {!isLoggin && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:max-w-sm mx-auto my-5 border border-black/20 w-[80%] p-4 rounded-xl"
        >
          <h1 className="text-center text-3xl font-bold m-4 ">
            Create Your Account
          </h1>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your name
            </label>
            <input
              {...register("name", { required: true , maxLength:{value:20,message:"name too long"},minLength:{value:3,message:"name too small"}})}
              type="text"
              id="name"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="Your name"
              required
            />
            {errors.name && (
              <p className="m-2 text-xs text-red-500 text-center">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="name@example.com"
              required
            />
            {errors.email && (
              <p className="m-2 text-xs text-red-500 text-center">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your WhatsApp Number
            </label>
            <input
              {...register("number", { required: true ,  maxLength:{value:10 , message:"Enter valid Number" , minLength:{value:10 , message:"Enter valid Number"}} , minLength:10})}
              type="number"
              id="number"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="9874561230"
              required
            />
            {errors.number && (
              <p className="m-2 text-xs text-red-500 text-center">
                {errors.number.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="hostel"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your Hostel
            </label>
            <select
              {...register("hostel", { required: true})}
              name="hostel"
              id="hostel"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm p-2 outline-0 rounded-lg"
            >
              <option value="none">Select Hostel</option>
              <option value="shivneri-hostel">Shivneri</option>
              <option value="savitri-hostel">Savitri</option>
              <option value="private-room">Private Hostel/Room</option>
            </select>
            {errors.hostel && (
              <p className="m-2 text-xs text-red-500 text-center">
                {errors.hostel.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              {...register("password", { required: true , maxLength:{value:20,message:"password too long"},minLength:{value:8,message:"password too small"}})}
              type="password"
              id="password"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
            {errors.password && (
              <p className="text-xs text-red-500 m-2 text-center">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="confirmPass"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              {...register("confirmPass", { required: true })}
              type="password"
              id="confirmPass"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
            {errors.confirmPass && (
              <p className="m-2 text-xs text-red-500 text-center">
                {errors.confirmPass.message}
              </p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center self-center"
            >
              Submit
            </button>
          </div>
          <div className="text-center text-xs m-2">
            <p>Already have an account?</p>
            <button
              className="cursor-pointer text-blue-600"
              onClick={formHandle}
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
