import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        enum: ["Colombian", "American", "Mexican", "Spanish", "French", "German", "Brazilian", "Argentinian", "Chilean", "Peruvian"],
        required: true,
    },
    documentType: {
        type: String,
        enum: ["ID", "Passport"],
        required: true,
    },
    documentNumber: {
        type: String,
        required: true,
        unique: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    phone: {
        type: String,
        required: true,
        match: [/^\+?[0-9]+$/, 'Por favor ingresa un número de teléfono válido'], // Permite solo números y opcionalmente '+'
        trim: true // Elimina espacios en blanco
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor ingresa un email válido'],
    },
    password: {
        type: String,
        required: true,
    },
    dataProcessing: {
        type: Boolean,
        required: true,
    },
    dataPolicy: {
        type: Boolean,
        required: true,
    },
});

export default mongoose.model('User', userSchema);
