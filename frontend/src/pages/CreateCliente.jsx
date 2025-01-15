import { useForm } from "react-hook-form";
import { createRequest } from "../api/auth.js";
import { searchClientRequest } from "../api/clients.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateClientRequest, deleteClientRequest } from "../api/clients.js";
import { Link } from "react-router-dom";

function CreateClient() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async (values) => {
    try {
      // Convertir documento y teléfono a números en todos los casos
      const formData = {
        ...values,
        documento: Number(values.documento),
        telefono: Number(values.telefono)
      };
  
      if (isNaN(formData.documento) || isNaN(formData.telefono)) {
        setSearchError("Documento y teléfono deben ser números válidos");
        return;
      }
  
      if (isEditing) {
        // Llamada a la API para actualizar con los datos convertidos
        await updateClientRequest(formData);
        setIsEditing(false);
        setSearchResult(null);
      } else {
        // Crear nuevo cliente
        await createRequest(formData);
      }
      reset();
    } catch (error) {
      console.error("Error:", error);
      setSearchError(error.response?.data?.message || "Error al procesar la solicitud");
    }
  };

//buscar
  const handleSearch = async () => {
    try {
      setSearchError(null);
      setSearchResult(null);
      setIsEditing(false);

      // Determinar si el término de búsqueda es un documento (número) o email
      const searchParams = {};
      const numeroDocumento = Number(searchTerm);
      
      if (!isNaN(numeroDocumento)) {
        searchParams.documento = numeroDocumento;
      } else if (searchTerm.includes('@')) {
        searchParams.email = searchTerm;
      } else {
        setSearchError("Por favor ingrese un documento válido o email");
        return;
      }

       console.log('Enviando parámetros:', searchParams);

      const response = await searchClientRequest(searchParams);
      if (response.data && response.data.cliente) {
        setSearchResult(response.data.cliente);
      } else {
        setSearchError("No se encontró el cliente");
      }

    } catch (error) {
      console.error('Error completo:', error);
      setSearchError(error.response?.data?.message || "Error al buscar el cliente");
    }
  };
//actualizar
const handleUpdate = () => {
  Object.keys(searchResult).forEach(key => {
      // Asegurarse de que los valores numéricos se manejen correctamente
      if (key === 'documento' || key === 'telefono') {
          setValue(key, Number(searchResult[key]));
      } else {
          setValue(key, searchResult[key]);
      }
  });
  setIsEditing(true);
};

  //eliminar
  const handleDelete = async () => {
    try {
      if (!searchResult?.documento) {
        setSearchError("No hay cliente seleccionado para eliminar");
        return;
      }

      // Confirmar antes de eliminar
      if (!window.confirm("¿Está seguro que desea eliminar este cliente?")) {
        return;
      }

      await deleteClientRequest(searchResult.documento);
      setSearchResult(null);
      setSearchError(null);
      reset();
    } catch (error) {
      console.error('Error al eliminar:', error);
      setSearchError(error.response?.data?.message || "Error al eliminar el cliente");
    }
  };

  //listar
  const handleListClick = () => {
    navigate('/getClientes');
  };


return (
    <div className="bg-black min-h-screen">
      {/* Contenedor del título */}
      <div className="container mx-auto text-center py-6">
      <Link
          to="/home"
          className="text-4xl font-bold inline-block transition-transform transform hover:scale-105"
          style={{
            color: "rgb(255, 69, 0)",
            textShadow: "0 0 10px rgba(255, 69, 0, 0.8)",
            backgroundColor: "transparent",
            border: "2px solid rgba(255, 69, 0, 0.8)",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Aerolínea Etérea - MERN
        </Link>
        <h2
          className="text-2xl font-bold mt-2"
          style={{
            color: "white",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
        >
          Gestión de clientes
        </h2>
      </div>

      {/* Formulario */}
      <form
        className="max-w-lg mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Campos del formulario */}
        <div>
          <label
            htmlFor="documento"
            className="block text-md font-semibold text-orange-300 mb-1"
          >
            Documento:
          </label>
          <input
            type="number"
            {...register("documento", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="nombre"
            className="block text-md font-semibold text-orange-300 mb-1"
          >
            Nombre:
          </label>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="apellido"
            className="block text-md font-semibold text-orange-300 mb-1"
          >
            apellido:
          </label>
          <input
            type="text"
            {...register("apellido", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="direccion"
            className="block text-md font-semibold text-orange-300 mb-1"
          >
            Dirección:
          </label>
          <input
            type="text"
            {...register("direccion", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="telefono"
            className="block text-md font-semibold text-orange-300 mb-1"
          >
            Teléfono:
          </label>
          <input
            type="tel"
            {...register("telefono", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-md font-semibold text-orange-300 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
          />
        </div>
        

        {/* Botones */}
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <input
            type="search"
            placeholder="Buscar por documento o email..."
            className="w-48 p-2 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 shadow-lg text-black bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        <button
            type="button"
            onClick={handleSearch}
            className="text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Buscar
          </button>
          <button
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
          >   {isEditing ? "Guardar Cambios" : "Crear"}
          </button>

          <button
            type="button"
            onClick={handleListClick}
            className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Listar
          </button>
          {/* Mostrar resultados de búsqueda */}
        {searchResult && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cliente encontrado:</h3>
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <p><span className="font-medium">Documento:</span> {searchResult.documento}</p>
              <p><span className="font-medium">Nombre:</span> {searchResult.nombre}</p>
              <p><span className="font-medium">Apellido:</span> {searchResult.apellido}</p>
              <p><span className="font-medium">Dirección:</span> {searchResult.direccion}</p>
              <p><span className="font-medium">Teléfono:</span> {searchResult.telefono}</p>
              <p><span className="font-medium">Email:</span> {searchResult.email}</p>
            </div>
            <div className="flex gap-2 mt-4 justify-end">
      <button
        type="button"
        onClick={handleUpdate}
        className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
      >
        Actualizar
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5"
      >
        Eliminar
      </button>
    </div>
          </div>
        )}

        {/* Mostrar errores de búsqueda */}
        {searchError && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {searchError}
          </div>
        )}
        </div>
      </form>
    </div>
  );
}

export default CreateClient;


