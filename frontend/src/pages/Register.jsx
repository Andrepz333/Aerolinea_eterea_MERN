<<<<<<< HEAD
import React from "react";
=======
>>>>>>> df509ac (Actualizacion)
import {useForm} from 'react-hook-form'
import { registerRequest} from "../api/auth.js";

function Register(){
    const {register, handleSubmit} = useForm();
    return(
<<<<<<< HEAD
        <div className="min-h-screen flex justify-center items-center bg-zinc-900">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-white text-2xl font-semibold mb-6 text-center">Registrar Usuario</h1>
=======
        <div className="min-h-screen flex justify-center items-center bg-black-900">
            <div className="bg-white max-w-md w-full p-10 rounded-md">
                <h1 className="text-black text-3xl font-semibold mb-6 text-center">Registrar Usuario</h1>
>>>>>>> df509ac (Actualizacion)
             <form 
                onSubmit= {handleSubmit(async(values) => {
                    console.log(values);
                    const response = await registerRequest(values);
                    console.log(response);
                })}
                className="flex flex-col gap-3">
                <input type="email" {...register("email", {required:true})}
<<<<<<< HEAD
                class="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="ingrese el correo"/>
                <input type="password" {...register("password", {required:true})}
                    class="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="ingrese la contraseña"/>
                <button type="submit" class="bg-green-600 text-white hover:bg-second py-3">Registrar</button>
=======
                className="w-full bg-zinc-300 text-black px-4 py-2 rounded-md my-2" placeholder="ingrese el correo"/>
                <input type="password" {...register("password", {required:true})}
                    className="w-full bg-zinc-300 text-black px-4 py-2 rounded-md my-2" placeholder="ingrese la contraseña"/>
                    <input type="text" {...register("role", { required: true })}
                        className="w-full bg-zinc-300 text-black px-4 py-2 rounded-md my-2" placeholder="Ingrese el rol" />
                <button type="submit" className="bg-red-700 text-white hover:bg-second py-3">Registrar</button>
>>>>>>> df509ac (Actualizacion)
            </form>
        </div>
    </div>
    )
}

export default Register