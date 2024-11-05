"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

function NewPage({ params: initialParams }: { params: Promise<{ id: string }> }) {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const [params, setParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    // Asignar `params` desenrollado de la promesa
    async function loadParams() {
      const resolvedParams = await initialParams;
      setParams(resolvedParams);
    }

    loadParams();
  }, [initialParams]);

  useEffect(() => {
    async function fetchData() {
      if (params?.id) {
        console.log("obteniendo datos!!!");
        try {
          const res = await axios.get(`/api/tasks/${params.id}`);
          setValue("title", res.data.title);
          setValue("description", res.data.description);
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (params) {
      fetchData();
    }
  }, [params, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (params?.id) {
      await axios.put(`/api/tasks/${params.id}`, data);
    } else {
      const res = await axios.post("/api/tasks", data);
      console.log(res);
    }
    router.push("/");
    router.refresh();
  });

  return (
    <section className="h-[calc(100vh-7rem)] flex items-center justify-center">
      <form onSubmit={onSubmit}>
        <h1 className="text-3xl font-bold">
          {params?.id ? "Update" : "Create"} Task
        </h1>

        <label htmlFor="title" className="text-xs font-bold">
          Write your title:
        </label>
        <input
          type="text"
          placeholder="Write a title"
          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:right-1 focus:ring-sky-300 focus:border-sky-300 text-black block mb-2"
          {...register("title")}
        />

        <label htmlFor="description" className="text-xs font-bold">
          Write your description:
        </label>
        <textarea
          placeholder="Write a description"
          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:right-1 focus:ring-sky-300 focus:border-sky-300 text-black block w-full"
          {...register("description")}
        ></textarea>

        <button
          type="submit"
          className="bg-sky-500 px-3 py-1 rounded-md text-white mt-2"
        >
          {params?.id ? "Update" : "Create"}
        </button>

        {params?.id && (
          <button
            className="bg-red-500 px-3 py-1 rounded-md text-white mt-2 ml-2"
            type="button"
            onClick={async () => {
              await axios.delete(`/api/tasks/${params.id}`);
              router.push("/");
              router.refresh();
            }}
          >
            Delete
          </button>
        )}
      </form>
    </section>
  );
}

export default NewPage;






//version 1 con error

/*
"use client"

import {useForm} from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect } from 'react'

function NewPage({params}: {params: {id: string}}) {

  const {register, handleSubmit, setValue} = useForm()
  const router = useRouter();

  console.log(params);
  
useEffect(()=>{
  if(params.id){
    console.log('obteniendo datos!!!')
    axios.get(`/api/tasks/${params.id}`)
    .then(res=>{
      console.log(res.data)
      setValue('title', res.data.title)
      setValue('description', res.data.description)
    })
  }
},[])


  const onSubmit = handleSubmit(async (data)=>{
if(params.id){
await axios.put(`/api/tasks/${params.id}`, data)
}else{
  console.log(data)
  const res = await axios.post('api/tasks',data)
  console.log(res)
}
router.push("/")
router.refresh()
  })

  return (
    <section className='h-[calc(100vh-7rem)] flex items-center justify-center'>
<form onSubmit={onSubmit}>

<h1 className='text-3xl font-bold'>
  {params.id ? "Update" : "Create"} Task
</h1>


  <label htmlFor="title" className='text-xs font-bold'>Write you title:</label>
      <input type="text" placeholder='Write a title' 
      className='px-3 py-1 border border-gray-300 rounded-md shadow-sm
      focus:outline-none focus:right-1 focus:ring-sky-300 focus:border-sky-300 text-black block mb-2' 
      {...register('title')}
      />
        <label htmlFor="description" className='text-xs font-bold' >Write you description:</label>
      <textarea placeholder='Write a description'
       className='px-3 py-1 border border-gray-300 rounded-md shadow-sm
       focus:outline-none focus:right-1 focus:ring-sky-300 focus:border-sky-300 text-black block w-full' 
       {...register('description')}
      ></textarea>
      <button 
      type='submit'
      className='bg-sky-500 px-3 py-1 rounded-md text-white mt-2'>
   {params.id ? "Update" : "Create" }
      </button>

    <button 
    className='bg-red-500 px-3 py-1 rounded-md text-white mt-2 ml-2'
    type='button'
    onClick={async()=>{
      await axios.delete(`/api/tasks/${params.id}`)
      router.push('/')
      router.refresh()
      //nota: puedo agregar un if(confirm("estas seguro de borrarlo")){ y trasladar la logica aqui}
    }}
    >
    Delete
    </button>

      </form>
    </section>
  )
}

export default NewPage

*/