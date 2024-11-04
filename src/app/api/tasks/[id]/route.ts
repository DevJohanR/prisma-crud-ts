import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'


/*
en una ruta como /api/tasks/1, el 1 se trata como la cadena "1" y no como el número 1. Es por esto que en la interfaz Params defines id: string, ya que lo que recibes inicialmente de la URL es una cadena de texto.
*/

/*
En una ruta como /api/tasks/1, el "1" es interpretado como una cadena "1" y no como el número 1. 
Es por esto que en la interfaz Params definimos id: string, ya que lo que recibimos inicialmente de la URL es una cadena de texto.
Luego, en las funciones donde necesitamos usar `id` como número (porque Prisma espera un `number`), 
lo convertimos explícitamente usando `Number(params.id)` para evitar errores de tipado.
*/

interface Params {
    params : {id : string};
}


export async function GET(request: Request, {params}: Params){
    /*
    Aquí convertimos `params.id` de `string` a `number` porque el método `findFirst` de Prisma espera
    que `id` sea un `number` según la definición del esquema en Prisma. Esta conversión asegura que
    Prisma reciba el tipo de dato correcto.
    */
    const task = await prisma.task.findFirst({
        where:{
            id:Number(params.id) // Convertimos el id a número para que Prisma lo acepte.
        }
    })
    return NextResponse.json(task)
}

export async function PUT(request: Request, {params}: Params){
       /*
    Primero obtenemos los datos del cuerpo de la solicitud usando `request.json()`, que 
    devuelve un objeto JSON con los campos que queremos actualizar.
    */
    const data = await request.json()
   const taskUpdated = await prisma.task.update({
        where:{
            id: Number(params.id)
        },
        data:data  // Actualizamos la tarea con los datos recibidos en la solicitud.
    })
return NextResponse.json(taskUpdated)
}


export async function DELETE(request: Request, {params}: Params){
    const task = await prisma.task.delete({
        where:{
            id: Number(params.id)
        }
    })
    return NextResponse.json(task)
    }
    
    