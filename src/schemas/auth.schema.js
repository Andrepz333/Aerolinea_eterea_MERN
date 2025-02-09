import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({
        required_error: 'Nombre es requerido',
    }),
    nationality: z.enum([
        "Colombian", "American", "Mexican", "Spanish", "French", "German", "Brazilian", "Argentinian", "Chilean", "Peruvian"
    ], {
        required_error: 'Nacionalidad es requerida',
    }),
    documentType: z.enum(["ID", "Passport"], {
        required_error: 'Tipo de documento es requerido',
    }),
    documentNumber: z.string({
        required_error: 'Número de documento es requerido',
    }),
    birthday: z.coerce.date({
        required_error: 'Fecha de nacimiento es requerida',
    }),
    gender: z.enum(["Male", "Female", "Other"], {
        required_error: 'Género es requerido',
    }),
    
    phone: z.string({
        required_error: 'Número de teléfono es obligatorio',
    }).regex(/^\+?[0-9]+$/, {
        message: 'Solo se permiten números y un "+" al inicio',
    }),

    email: z.string({
        required_error: 'Email es requerido',
    }).email({
        message: 'Email no válido',
    }),
    password: z.string({
        required_error: 'Password es requerido',
    }).min(6, {
        message: 'Password debe tener al menos 6 caracteres',
    }),
    dataProcessing: z.boolean({
        required_error: 'Debe aceptar el tratamiento de datos',
    }),
    dataPolicy: z.boolean({
        required_error: 'Debe aceptar la política de datos',
    })
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
