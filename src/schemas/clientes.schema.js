import { z } from "zod";

export const createClientesSchema = z.object({
    documento: z
    .number({
        required_error: 'El documento es requerido',
    }),
    nombre: z
    .string({
        required_error: 'El nombre es requerido',
    }),
    apellido: z
    .string({
        required_error: 'El apellido es requerido',
    }),
    direccion: z
    .string({
        required_error: 'la direccion es requerida',
    }),
    telefono: z
    .number({
        required_error: 'El telefono es requerido',
    }),
    email: z
    .string({
        required_error: 'El email es requerido',
    })
});