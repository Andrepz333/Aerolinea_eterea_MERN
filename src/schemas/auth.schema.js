import { z } from "zod";

export const registerSchema = z.object({
    email: z
    .string({
        required_error: 'Email is requerido',
    })
    .email({
        message: 'Email no válido',
    }),
    password: z
    .string({
        required_error: 'Password es requerido',
    })
    .min(6, {
        message: 'Password debe tener al menos 8 caracteres',
    }),

});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});