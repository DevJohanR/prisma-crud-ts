import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export async function GET(){
  const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
}

//ejemplo de consulta post basica sin try catch
export async function POST(request:Request){
    const data = await request.json();
    console.log(data)
    const newTask = await prisma.task.create({
        data: data
    })
    return NextResponse.json(newTask)
    
}



/*
export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log(data);
        const newTask = await prisma.task.create({
            data: data
        });
        return NextResponse.json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
}

*/