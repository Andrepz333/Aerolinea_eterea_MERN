import { useForm } from "react-hook-form";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createRequest, searchReservaRequest, updateReservaRequest, deleteReservaRequest } from "../api/booking.js";
import { CalendarDays, Luggage, Navigation, Plane,Clock } from 'lucide-react';
import Swal from "sweetalert2";


// Funciones

function CreateReserva() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

    // Format datetime for form inputs
    const formatDateTimeForInput = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16); // Format: "YYYY-MM-DDTHH:mm"
    };
  
    // Format datetime for display
    const formatDateTimeForDisplay = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString(); // Format: "MM/DD/YYYY, HH:mm:ss AM/PM"
    };


  //Crear reserva
  const onSubmit = async (values) => {
    try {
      const formData = {
        from: values.from,
        to: values.to,
        departure: values.departure,
        return: values.return,
        airfare: values.airfare,
        baggage: values.baggage,
      };

      //edita o actualiza en el mismo formulario de crear
      if (isEditing) {
        await updateReservaRequest({ id: searchResult._id, ...formData });
        Swal.fire({
          title: "Reserva actualizada",
          text: "La reserva se ha actualizado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
          timer: 3000,
        });
        setIsEditing(false);
        setSearchResult(null);
      } else {
         // Si no está editando, crea una nueva reserva
      await createRequest(formData);
      Swal.fire({
        title: "Reserva creada",
        text: "La reserva se ha guardado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });
    }

      reset();
      navigate("/getReservas"); // Redirigir a la lista de reservas tras crear
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Error al procesar la solicitud.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });

      setSearchError(error.response?.data?.message || "Error al procesar la solicitud");
    }
  };

  //Buscar Reserva

  const handleSearch = async () => {
    try {
      setSearchError(null);
      setSearchResult(null);

      if (!searchTerm.trim()) {
        setSearchError("Por favor ingrese un origen y destino válidos");
        return;
      }

      const [from, to] = searchTerm.split("-").map((s) => s.trim());
      if (!from || !to) {
        setSearchError("Debe ingresar el origen y destino separados por un guion (-)");
        return;
      }

      const response = await searchReservaRequest({ from, to });
      if (response.data && response.data.reserva) {
        setSearchResult(response.data.reserva);
      } else {
        setSearchError("No se encontró la reserva");
      }
    } catch (error) {
      console.error("Error completo:", error);
      setSearchError(error.response?.data?.message || "Error al buscar la reserva");
    }
  };

  //listar o mostrar reservas
    const handleListClick = () => {
      navigate('/getReservas');
    };

    //Update Reservas
     const handleUpdate = () => {
      Object.keys(searchResult).forEach(key => {
       if (key !== 'from,to') {
       // Formatear las fechas solo para los campos departure y return
       if (key === 'departure' || key === 'return') {
       setValue(key, formatDateTimeForInput(searchResult[key]));
       } else{
         setValue(key, searchResult[key]);
       }
      }
     });
   setIsEditing(true);
  };

  //Eliminar Reserva
  const handleDelete = async () => {
  if (!searchResult) {
    setSearchError("No hay reserva seleccionada para eliminar");
    return;
  }
  try {
    await deleteReservaRequest({ from: searchResult.from, to: searchResult.to });
    Swal.fire({
      title: "Reserva cancelada",
      text: "La reserva se ha cancelado exitosamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
      timer: 3000,
    });
    setSearchResult(null);
    setSearchError(null);
    reset();
  } catch (error) {
    console.error("Error al eliminar:", error);
    Swal.fire({
      title: "Error",
      text: error.response?.data?.message || "Error al procesar la solicitud.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    setSearchError(error.response?.data?.message || "Error al eliminar la reserva");
  }
};

//Vista pagina

return (
<div className="min-h-screen bg-gradient-to-b from-white via-cyan-500 to-purple-500">

      {/* Contenedor del título */}
      <div className="container mx-auto pt-8 pb-12">
      <Link
          to="/home"
          className="flex justify-center items-center gap-2 text-5xl font-bold mb-6"
        >
        <Plane className="text-cyan-400 w-12 h-12" />
          <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text 
            hover:from-fuchsia-500 hover:to-cyan-400 transition-all duration-300">
            Ethereal Airline
          </span> 
        </Link>
        <h2 className="text-2xl font-bold text-center text-gray-600 text-shadow-neon">
          Flight Booking
        </h2>
      </div>

      {/* Main form */}
      <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-2 gap-6">

        {/* From Field */}
        <div className="relative">
          <label className="block text-cyan-400 mb-2 font-medium">
          <Navigation className="w-4 h-4 inline mr-2" />
          From:
          </label>
          <select {...register("from", { required: true })} className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white focus:border-purple-400 
                    focus:ring-1  focus:ring-purple-400 transition-all">
                  <option value="Bogotá" className="text-gray-900">Bogotá</option>
                  <option value="Medellín" className="text-gray-900">Medellín</option>
                  <option value="Cali" className="text-gray-900">Cali</option>
                  <option value="Cartagena" className="text-gray-900">Cartagena</option>
                  <option value="Barranquilla" className="text-gray-900">Barranquilla</option>
          </select>
        </div>


        {/* To Field */}
        <div className="relative">
          <label className="block text-cyan-400 mb-2 font-medium">
          <Navigation className="w-4 h-4 inline mr-2" />
            To:
            </label>

          <select {...register("to", { required: true })} className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white focus:border-purple-400 
                    focus:ring-1  focus:ring-purple-400 transition-all">
                  <option value="Madrid" className="text-gray-900">Madrid</option>
                  <option value="Miami" className="text-gray-900">Miami</option>
                  <option value="Buenos Aires" className="text-gray-900">Buenos Aires</option>
                  <option value="Cancún" className="text-gray-900">Cancún</option>
                  <option value="São Paulo" className="text-gray-900">São Paulo</option>
          </select>
        </div>

        {/* Date Departure Fields */}
        <div className="relative">
          <label className="block text-cyan-400 mb-2 font-medium">
          <CalendarDays className="w-4 h-4 inline mr-2" />
          <Clock className="w-4 h-4 inline mr-2" />
            Departure:
            </label>
          <input type="datetime-local" {...register("departure", { required: true })} 
          className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white focus:border-purple-400 
                    focus:ring-1  focus:ring-purple-400 transition-all" 
                    min={new Date().toISOString().slice(0, 16)}/>
        </div>

        {/* Date Return Fields */}
        <div className="relative">
          <label className="block text-cyan-400 mb-2 font-medium">
          <CalendarDays className="w-4 h-4 inline mr-2" />
          <Clock className="w-4 h-4 inline mr-2" />
            Return:
            </label>
          <input type="datetime-local" {...register("return", { required: true })} 
          className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white focus:border-purple-400 
                    focus:ring-1  focus:ring-purple-400 transition-all" 
                    min={new Date().toISOString().slice(0, 16)}/>
        </div>

        {/* Airfare */}
          <div className="relative">
          <label className="block text-cyan-400 mb-2 font-medium">
          <Plane className="w-4 h-4 inline mr-2" />
            Airfare:
            </label>
          <select {...register("airfare", { required: true })} 
          className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white focus:border-purple-400 
                    focus:ring-1  focus:ring-purple-400 transition-all">
                  <option value="Basic" className="text-gray-900">Basic</option>
                  <option value="Classic" className="text-gray-900">Classic</option>
                  <option value="Premium" className="text-gray-900">Premium</option>
          </select>
        </div>


        {/* Baggage */}
        <div className="relative">
          <label className="block text-cyan-400 mb-2 font-medium">
          <Luggage className="w-4 h-4 inline mr-2" />
            Baggage:
            </label>
          <select {...register("baggage", { required: true })} 
          className="w-full bg-white/5 border border-cyan-400/30 rounded-lg p-3 text-white focus:border-purple-400 
                    focus:ring-1  focus:ring-purple-400 transition-all">
                  <option value="carry-on" className="text-gray-900">Carry-on</option>
                  <option value="checked" className="text-gray-900">Checked</option>
                  <option value="special" className="text-gray-900">Special</option>
          </select>
        </div>
      </div>


        {/* Action Button create or update */}
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-fuchsia-500 hover:to-cyan-400 
                  text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
              >
                {isEditing ? "Update Flight" : "Book Flight"}
              </button>


        {/* Action Button Search */}
              <div className="flex gap-4 items-center">
                <input
                  type="search"
                  placeholder="Search from-to"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/5 border border-cyan-400/30 rounded-full py-3 px-6 text-white 
                    focus:border-purple-400 focus:ring-1  focus:ring-purple-400 placeholder-white/50"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-cyan-400 hover:bg-purple-400 text-white font-bold py-3 px-6 rounded-full 
                    transition-all duration-300 shadow-lg"
                >
                  Search
                </button>

                <button
                  type="button"
                  onClick={handleListClick}
                  className="bg-black hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-full 
                    transition-all duration-300 shadow-lg"
                >
                  View
                </button>               
                           
              </div>
            </div>
          </form>

        {/* Search Results */}
        {searchResult && (
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-cyan-400/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Flight Details</h3>
              <div className="grid md:grid-cols-2 gap-4 text-white">
                <p>From: {searchResult.from}</p>
                <p>To: {searchResult.to}</p>
                <p>Departure: {formatDateTimeForDisplay(searchResult.departure)}</p>
                <p>Return: {formatDateTimeForDisplay(searchResult.return)}</p>
                <p>Airfare: {searchResult.airfare}</p>
                <p>Baggage: {searchResult.baggage}</p>
              </div>
              <div className="flex gap-4 mt-6 justify-end">
                <button
                  onClick={handleUpdate}
                  className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-full 
                    transition-all duration-300"
                >
                  Modify
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-6 rounded-full 
                    transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {searchError && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              {searchError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateReserva;
