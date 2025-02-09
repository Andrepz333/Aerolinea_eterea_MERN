import { z } from "zod";

export const createReservasSchema = z.object({
    from: z
    .enum(["Bogotá", "Medellín", "Cali", "Cartagena", "Barranquilla"], {
        required_error: 'El origen es requerido',
    }),
    to: z
    .enum(["Madrid", "Miami", "Buenos Aires", "Cancún", "São Paulo"], {
        required_error: 'El destino es requerido',
    }),
    departure: z
    .coerce.date({
        required_error: 'La fecha de salida es requerida',
        invalid_type_error: 'La fecha de salida debe ser un formato válido',
    }),
    return: z
    .coerce.date({
        required_error: 'La fecha de regreso es requerida',
        invalid_type_error: 'La fecha de regreso debe ser un formato válido',
    }),
    airfare: z
    .enum(["Basic", "Classic", "Premium"], {
        required_error: 'La tarifa aérea es requerida',
    }),
    baggage: z
    .enum(["carry-on", "checked", "special"], {
        required_error: 'El tipo de equipaje es requerido',
        })
    });