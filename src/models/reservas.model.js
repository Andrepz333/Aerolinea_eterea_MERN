import mongoose from "mongoose";

const reservasSchema = new mongoose.Schema({
    from: {
        type: String,
        enum: ["Bogotá", "Medellín", "Cali", "Cartagena", "Barranquilla"],
        required: true,
    },
    to: {
        type: String,
        enum: ["Madrid", "Miami", "Buenos Aires", "Cancún", "São Paulo"],
        required: true,
    },
    departure: {
        type: Date,
        required: true,
    },
    return: {
        type: Date,
        required: true,
    },
    airfare: {
        type: String,
        enum: ["Basic", "Classic", "Premium"],
        required: true,
    },
    baggage: {
        type: String,
        enum: ["carry-on", "checked", "special"],
        required: true,
    }
});

export default mongoose.model('Reservas', reservasSchema);
