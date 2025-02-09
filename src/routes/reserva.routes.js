import { Router } from 'express';
import { createReserva, getReservas, updateReserva, deleteReserva, searchReservaByRoute } from '../controllers/reservas.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createReservasSchema } from '../schemas/reservas.schema.js';


const router = Router();

router.post('/createReserva', validateSchema(createReservasSchema), createReserva);

router.get('/getReservas', getReservas);

router.get('/searchReservaByRoute', searchReservaByRoute);

router.put('/updateReserva', validateSchema(createReservasSchema), updateReserva);

router.delete('/deleteReserva', deleteReserva);


export default router;