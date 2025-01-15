import { useEffect, useState } from "react";
import { getClientsRequest } from "../api/clients.js";


function GetClients(){
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchClients(){
            try {
                const response = await getClientsRequest();
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchClients();
    }, []);

    if (loading){
        return <div>Loading...</div>;
    }

    return(

<div className="max-w-6xl mx-auto p-4">
<style>
{`
.neon-text {
 color: white;
      text-shadow: 
        0 0 5px #FF0000, 
        0 0 10px #FF0000, 
        0 0 20px #FF0000, 
        0 0 30px #FF0000;

}`}
  </style>
        <h1 className="text-4xl font-bold text-center p-9 text-white neon-text">Listado de Clientes</h1>
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border neon-border">
            <thead className="bg-red-900 text-white">
                <tr>
                <th className="px-4 py-2 border-b">Documento</th>
                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">Apellido</th>
                <th className="px-4 py-2 border-b">Direccion</th>
                <th className="px-4 py-2 border-b">Teléfono </th>
                <th className="px-4 py-2 border-b">Email</th>
                </tr>
            </thead>
            <tbody className="bg-white text-black">
                {clients.length > 0 ? (
                clients.map((clients) => (
                    <tr key={clients.documento} className="border-b">
                    <td className="px-4 py-2">{clients.documento}</td>
                    <td className="px-4 py-2">{clients.nombre}</td>
                    <td className="px-4 py-2">{clients.apellido}</td>
                    <td className="px-4 py-2">{clients.direccion}</td>
                    <td className="px-4 py-2">{clients.telefono}</td>
                    <td className="px-4 py-2">{clients.email}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="7" className="px-4 py-2 text-center">No se encontraron clientes</td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default GetClients;