import React from "react";
import {useForm} from 'react-hook-form'
import { registerRequest} from "../api/auth.js";

function Register(){
    const {register, handleSubmit} = useForm();
    return(
        <div className="min-h-screen flex justify-center items-center bg-zinc-900">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-white text-2xl font-semibold mb-6 text-center">Registrar Usuario</h1>
             <form 
                onSubmit= {handleSubmit(async(values) => {
                    console.log(values);
                    const response = await registerRequest(values);
                    console.log(response);
                })}
                className="flex flex-col gap-3">
                <input type="email" {...register("email", {required:true})}
                class="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="ingrese el correo"/>
                <input type="password" {...register("password", {required:true})}
                    class="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="ingrese la contraseña"/>
                <button type="submit" class="bg-green-600 text-white hover:bg-second py-3">Registrar</button>
            </form>
        </div>
    </div>
    )
}

export default Register