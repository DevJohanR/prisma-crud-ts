"use client"

import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
interface Props{
    task: Task
}

//ASI HABRIA QUE HACERLO SI NO ESTUVIERA USANDO PRISMA
/*
interface Props{
    task: any
}
*/
function TaskCard({task}: Props){
    const router = useRouter()
    return(
        <div className='bg-gray-900 p-3 hover:bg-gray-800 hover:cursor-pointer'
            onClick={()=>{
                router.push(`/tasks/edit/${task.id}`)
            }}
        >
        <h3 className='font-bold text-xl'>{task.title}</h3>
        <p className='text-slate-300'>{task.description}</p>
      </div>
    )
}

export default TaskCard;