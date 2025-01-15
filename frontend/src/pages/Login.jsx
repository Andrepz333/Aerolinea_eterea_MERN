import React, {useEffect} from "react";
import {useForm} from 'react-hook-form'
import {loginRequest} from "../api/auth.js"
import { Link, useNavigate } from 'react-router-dom';


function Login(){
   
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate()
    useEffect(() => {
        window.history.pushState(null, '', window.location.href)
        window.onpopstate = function(e) {
            window.history.pushState(null, '', window.location.href)
        }
        
    }, [navigate])
    return(
       <div className="min-h-screen flex justify-center items-center bg-zinc-900">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-white text-2xl font-semibold mb-6 text-center">Iniciar Sesion</h1>
            <form  onSubmit= {handleSubmit(async(data) => {
                try{
                        const response = await loginRequest(data)
                        console.log(response)
                        console.log("Response Status:", response.status);
                        if(response.status === 200 ){
                            localStorage.setItem('token', response.data.token)
                            navigate('/home')
                            
                        }
                        localStorage.setItem('token', response.data.token)
                        console.log("Token:", response.data.token);
                        console.log("Response Data:", response.data);
                }catch(error){
                    console.log("Error:", error);
                    
                }
                })}
                className="flex flex-col gap-3">
                <input type="email" {...register("email", {required:true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="ingrese el correo"/>
                {errors.email && <p className="text-red-500">El correo es requerido</p>}
                <input type="password" {...register("password", {required:true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="ingrese la contraseña"/>
                {errors.password && <p className="text-red-500">La contraseña es requerida</p>}
                <p className='flex gap-x-2 justify-between'>Aun no tienes cuenta<Link to="/register" className='text-blue-500'>Registrate</Link></p>
                <button type="submit" class="bg-green-600 text-white hover:bg-second py-3">Iniciar Sesion</button>
            </form>
        </div>
    </div>
    );
}

export default Login