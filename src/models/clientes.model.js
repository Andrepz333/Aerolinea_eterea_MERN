import mongoose from "mongoose";

const clientesSchema = new mongoose.Schema({
    documento:{
        type: Number,
        required: true,
    },
    nombre:{
        type: String,
        required: true,
    },
    apellido:{
        type: String,
        required: true,
    },
    direccion:{
        type: String,
        required: true,
    },
    telefono:{
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor ingresa un email válido'],
    },
});

export default mongoose.model('Clientes', clientesSchema);