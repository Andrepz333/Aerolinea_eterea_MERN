import {useEffect} from "react";
import {useForm} from 'react-hook-form'
import {loginRequest} from "../api/auth.js"
import { Link, useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';
// Añadimos estos imports
import { useDispatch } from 'react-redux';
import { setUser } from "../features/authSlice";

function Login(){
   
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    // Añadimos dispatch
    const dispatch = useDispatch();

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
       <div className="min-h-screen bg-gradient-to-b from-white via-cyan-500 to-purple-500 flex justify-center items-center">
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-10 max-w-md w-full shadow-2xl">
                <Link
                    to="/create"
                    className="flex justify-center items-center gap-2 text-4xl font-bold mb-6"
                >
                    <Plane className="text-cyan-400 w-10 h-10" />
                    <span className="bg-gradient-to-r from-cyan-400 to-white text-transparent bg-clip-text 
                        hover:from-fuchsia-500 hover:to-cyan-400 transition-all duration-300">
                        Ethereal Airline
                    </span> 
                </Link>

                <h1 className="text-2xl font-bold text-center text-white mb-6">Login</h1>
                <form onSubmit={handleSubmit(async(data) => {
                        try {
                            const response = await loginRequest(data);
                            console.log("Login response:", response);
                            
                            if(response.status === 200 ){
                                const userData = response.data.user;
                                console.log("User data to be stored:", userData);
                                
                                localStorage.setItem('token', response.data.token);
                                dispatch(setUser(userData));
                                
                                navigate('/Home');
                            }
                        } catch (error) {
                            console.error("Login error:", error);
                            alert('Error during login');
                        }
                    })}

                    className="space-y-4">
                    <div className="relative">
                      <input 
                         type="email" 
                         {...register("email", {required:true})}
                         className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white 
                            focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" 
                         placeholder="ingrese el correo"
                         />
                        {errors.email && <p className="text-red-400 mt-1">El correo es requerido</p>}
                    </div>

                    <div className="relative">
                <input 
                 type="password" 
                 {...register("password", {required:true})}
                 className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white 
                            focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" 
                 placeholder="ingrese la contraseña"/>
                 {errors.password && <p className="text-red-400 mt-1">La contraseña es requerida</p>}
                 </div>

                 <div className="flex justify-between items-center text-white">
                        <p> Dont have an account?</p>
                        <Link to="/create" className="text-cyan-400 hover:text-purple-400 transition-colors">
                            Register here
                        </Link>
                    </div>
                
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 
                        hover:from-fuchsia-500 hover:to-cyan-400 text-white font-bold py-3 
                        rounded-full transition-all duration-300 shadow-lg"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login