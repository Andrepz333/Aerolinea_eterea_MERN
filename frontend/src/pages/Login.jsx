import {useEffect} from "react";
import {useForm} from 'react-hook-form'
import {loginRequest} from "../api/auth.js"
import { Link, useNavigate } from 'react-router-dom';


function Login(){
   
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            navigate('/')
        }
        console.log("invalido");
        window.history.pushState(null, '', window.location.href)
        window.onpopstate = function() {
            window.history.pushState(null, '', window.location.href)
        }
        
    }, [navigate])
    return(
       <div className="min-h-screen flex justify-center items-center bg-black-900">
            <div className="bg-white max-w-md w-full p-10 rounded-md">
                <h1 className="text-black text-3xl font-semibold mb-6 text-center">Iniciar Sesion</h1>
            <form  onSubmit= {handleSubmit(async(data) => {
                        const response = await loginRequest(data)
                        console.log(response)
                        console.log("Response Status:", response.status);
                        if(response.status === 200 ){
                            navigate('/Home')
                        }
                        else if (response.status === 400) {
                            // Si las credenciales son incorrectas, mostrar alerta
                            alert('Credenciales inválidas');
                        } else {
                            // Si el código de estado es distinto a 200 o 401, muestra un mensaje genérico
                            alert('Ocurrió un error desconocido');
                        }
                    
                })}
                className="flex flex-col gap-3">
                <input type="email" {...register("email", {required:true})}
                className="w-full bg-zinc-300 text-white px-4 py-2 rounded-md my-2" placeholder="ingrese el correo"/>
                {errors.email && <p className="text-black">El correo es requerido</p>}
                <input type="password" {...register("password", {required:true})}
                    className="w-full bg-zinc-300 text-white px-4 py-2 rounded-md my-2" placeholder="ingrese la contraseña"/>
                {errors.password && <p className="text-black">La contraseña es requerida</p>}
                <p className='flex gap-x-2 justify-between text-black'>Aún no tienes cuenta?<Link to="/create" className='text-black'>Registrate</Link></p>
                <button type="submit" className="bg-red-700 text-white hover:bg-second py-3">Iniciar Sesion</button>
            </form>
        </div>
    </div>
    );
}

export default Login