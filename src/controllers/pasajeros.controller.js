import Clientes from '../models/clientes.model.js';
//http://localhost:4000/api/createCliente CREATE
export const createPasajero = async (req, res) => {
    try {
        const { documento, nombre, apellido, direccion, telefono, email } = req.body;
        const newCliente = new Clientes({ 
            documento,
            nombre,
            apellido,
            direccion,
            telefono,
            email,
        });
        await newCliente.save();
        res.json(newCliente);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
};

//http://localhost:4000/api/getClientes READ
export const getClientes = async (req, res) => {
    try {
        const clientes = await Clientes.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
//http://localhost:4000/api/searchClienteByDocumentoOEmail
export const searchClienteByDocumentoOEmail = async (req, res) => {
    try {
        const { documento, email } = req.body;

        // Verificar que al menos uno de los dos parámetros (documento o email) esté presente
        if (!documento && !email) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un parámetro: documento o email' });
        }

        // Crear el objeto de búsqueda dinámico
        const query = documento ? { documento: documento } : { email: email };
        
        // Buscar al cliente según el parámetro proporcionado
        const cliente = await Clientes.findOne(query);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Retornar los datos del cliente encontrado
        res.json({ cliente });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//http://localhost:4000/api/updateCliente UPDATE
export const updateCliente = async (req, res) => {
    try {
        const { documento, nombre, apellido, direccion, telefono,  email } = req.body;
        const cliente = await Clientes.findOne({documento: documento});
        if (!cliente) {
            return res.status(404).json({message: 'Cliente no encontrado'});
        }
        cliente.nombre = nombre;
        cliente.apellido = apellido;
        cliente.direccion = direccion;
        cliente.telefono = telefono;
        cliente.email = email;
        await cliente.save();
        res.json(cliente);
        } catch (error) {
            res.status(500).json({message: error.message});
            }
}
//http://localhost:4000/api/deleteCliente
export const deleteCliente = async (req, res) => {
    try {
        const { documento } = req.body;
        const deleteCliente = await Clientes.findOne({documento: documento});
        if (!deleteCliente) {
            return res.status(404).json({message: 'Cliente no encontrado'});
        }
        await deleteCliente.deleteOne();
        res.json({message: 'Cliente eliminado'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
}
//http://localhost:4000/api/deleteClienteByDocumentoOEmail
export const deleteClienteByDocumentoOEmail = async (req, res) => {
    try {
        const { documento, email } = req.body;

        // Verificar que al menos uno de los dos parámetros (documento o email) esté presente
        if (!documento && !email) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un parámetro: documento o email' });
        }

        // Crear el objeto de búsqueda dinámico
        const query = documento ? { documento: documento } : { email: email };
        
        // Buscar al cliente según el parámetro proporcionado
        const cliente = await Clientes.findOne(query);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Eliminar el cliente
        await cliente.deleteOne();
        res.json({ message: 'Cliente eliminado' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};