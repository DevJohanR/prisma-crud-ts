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
    <section className='h-screen flex items-center justify-center'>
<form onSubmit={onSubmit}>
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
      className='bg-sky-500 px-3 py-1 rounded-md text-white mt-2'>
   {params.id ? "Update" : "Create" }
      </button>
      </form>
    </section>
  )
}

export default NewPage