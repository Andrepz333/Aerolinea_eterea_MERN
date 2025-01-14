import mongoose from "mongoose";

const pasajeroSchema = new mongoose.Schema({
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
    numero_pasaporte:{
        type: String,
        required: true,
    },
    id_cliente:{
        type: Number,
        required: true,
    },
});

export default mongoose.model('pasajeros', pasajeroSchema);