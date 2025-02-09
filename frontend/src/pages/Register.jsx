import { useForm } from 'react-hook-form';
import { registerRequest } from "../api/auth.js";
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';
import Swal from "sweetalert2";

function Register() {
    const { register, handleSubmit } = useForm();

    const nationalities = ["Colombian", "American", "Mexican", "Spanish", "French", "German", "Brazilian", "Argentinian", "Chilean", "Peruvian"];
    const documentTypes = ["ID", "Passport"];
    const genders = ["Male", "Female", "Other"];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-cyan-500 to-purple-500 flex justify-center items-center">
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-10 max-w-md w-full shadow-2xl">
                <Link
                    to="/"
                    className="flex justify-center items-center gap-2 text-4xl font-bold mb-6"
                >
                    <Plane className="text-cyan-400 w-10 h-10" />
                    <span className="bg-gradient-to-r from-cyan-400 to-white text-transparent bg-clip-text 
                        hover:from-fuchsia-500 hover:to-cyan-400 transition-all duration-300">
                        Ethereal Airline
                    </span> 
                </Link>

                <h1 className="text-2xl font-bold text-center text-white mb-6">Register</h1>
                <form 
                    onSubmit={handleSubmit(async (values) => {
                        console.log("Datos enviados:", values);
                        try {
                            const response = await registerRequest(values);
                                  Swal.fire({
                                    title: "Registro Exitoso",
                                    text: "Usted se ha registrado exitosamente.",
                                    icon: "success",
                                    confirmButtonText: "Aceptar",
                                    timer: 3000,
                                  });
                                  
                            console.log("Respuesta del servidor:", response);
                        } catch (error) {
                            console.error("Error en el registro:", error.response ? error.response.data : error);
                                  Swal.fire({
                                    title: "Error",
                                    text: error.response?.data?.message || "Error al procesar la solicitud.",
                                    icon: "error",
                                    confirmButtonText: "Aceptar",
                                  });
                         }
                        })}


                    className="space-y-4" >
                    <div className="relative">
                        <input 
                            type="text" 
                            {...register("name", { required: true })}
                            className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white 
                                focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" 
                            placeholder="Enter your name"
                        />
                    </div>
                    
                    <div className="relative">
                        <select {...register("nationality", { required: true })} className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white">
                            <option value="" disabled>Select your nationality</option>
                            {nationalities.map((nationality) => (
                                <option key={nationality} value={nationality} className='text-black'>{nationality}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="relative">
                        <select {...register("documentType", { required: true })} className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white">
                            <option value="" disabled>Select document type</option>
                            {documentTypes.map((type) => (
                                <option key={type} value={type} className='text-black'>{type}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="relative">
                        <input 
                            type="text" 
                            {...register("documentNumber", { required: true })}
                            className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white 
                                focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" 
                            placeholder="Enter document number"
                        />
                    </div>
                    
                    <div className="relative">
                        <input 
                            type="date" 
                            {...register("birthday", { required: true })}
                            className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white" 
                        />
                    </div>
                    
                    <div className="relative">
                        <select {...register("gender", { required: true })} className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white">
                            <option value="" disabled>Select your gender</option>
                            {genders.map((gender) => (
                                <option key={gender} value={gender} className='text-black'>{gender}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="relative">
                    <input 
                    type="text" 
                    {...register("phone", { 
                        required: "El número de teléfono es obligatorio",
                        pattern: {
                             value: /^\+?[0-9]+$/, 
                             message: "Solo se permiten números y un '+' al inicio"}
                            })}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9+]/g, ""); // Permite solo números y '+'
                                e.target.value = e.target.value.replace(/(?!^)\+/g, ""); // Asegura que '+' solo esté al inicio
                                }}
                                className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white 
                                 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" 
                                 placeholder="Ingrese su número de teléfono"
                                 />
                                 </div>
                    
                    <div className="relative">
                        <input 
                            type="email" 
                            {...register("email", { required: true })}
                            className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white 
                                focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" 
                            placeholder="Enter email"
                        />
                    </div>
                    
                    <div className="relative">
                        <input 
                            type="password" 
                            {...register("password", { required: true })}
                            className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white 
                                focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" 
                            placeholder="Enter password"
                        />
                    </div>
                    
                    <div className="relative">
                        <input 
                            type="checkbox" 
                            {...register("dataProcessing", { required: true })}
                        /> Accept Data Processing
                    </div>
                    
                    <div className="relative">
                        <input 
                            type="checkbox" 
                            {...register("dataPolicy", { required: true })}
                        /> Accept Data Policy
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 
                        hover:from-fuchsia-500 hover:to-cyan-400 text-white font-bold py-3 
                        rounded-full transition-all duration-300 shadow-lg"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
