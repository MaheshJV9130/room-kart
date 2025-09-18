'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';

const Edit = () => {
  const {
      register,
      handleSubmit,
      setError,
      clearErrors,
      reset,
      formState: { errors},
    } = useForm();
  const params = useParams()

  // const fetchData = async (id) => {
  //   let req = await fetch()
  // }
  
const onSubmit = (data) => {
    console.log(data)
};
    
  
  return (
    <main className="min-h-screen flex justify-center items-center">
         This Feature Coming Soon
        </main>
  )
}

export default Edit
