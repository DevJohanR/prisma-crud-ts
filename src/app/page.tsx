
//import axios from 'axios'
import {prisma} from '@/libs/prisma'
import TaskCard from '@/components/TaskCard' 

async function loadTasks() {
/*
  const res= await axios.get("http://localhost:3000/api/tasks")
  console.log(res.data)
  */

 const tasks = await prisma.task.findMany()
return tasks
}

async function HomePage() {
  const tasks = await loadTasks()
  console.log(tasks)
  return (
    <div className='grid grid-cols-3 gap-3'>

      {tasks.map(task=>(
   <TaskCard task={task} key={task.id} />
      ))}

    </div>
  )
}

export default HomePage