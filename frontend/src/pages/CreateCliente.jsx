import { useForm } from "react-hook-form";
import { createRequest } from "../api/auth.js";

function CreateClient() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (values) => {
    const documento = Number(values.documento);
    const telefono = Number(values.telefono);

    if (isNaN(documento) || isNaN(telefono)) {
      console.error("Algunos campos no son números");
      return;
    }

    const res = await createRequest({ ...values, documento, telefono });
    console.log(res);

    reset();
  };
return (
    <div className="bg-black min-h-screen">
      {/* Contenedor del título */}
      <div className="container mx-auto text-center py-6">
        <h1
          className="text-4xl font-bold"
          style={{
            color: "rgb(255, 69, 0)",
            textShadow: "0 0 10px rgba(255, 69, 0, 0.8)",
          }}
        >
          Aerolinea eterea - MERN
        </h1>
        <h2
          className="text-2xl font-bold mt-2"
          style={{
            color: "white",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
        >
        Gestion de clientes
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
            htmlFor="Apellido"
            className="block text-md font-semibold text-orange-300 mb-1"
          >
            Apellido:
          </label>
          <input
            type="text"
            {...register("Apellido", { required: true })}
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
          <button
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Crear
          </button>
          <button
            type="reset"
            className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Borrar
          </button>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Listar
          </button>
          <div className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Buscar cliente..."
              className="w-48 p-2 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 shadow-lg"
            />
            <button
              type="button"
              className="text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5"
            >
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateClient;
