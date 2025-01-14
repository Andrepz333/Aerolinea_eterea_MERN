import { Router } from 'express';
import { createCliente, getClientes, updateCliente, deleteCliente, deleteClienteByDocumentoOEmail, searchClienteByDocumentoOEmail } from '../controllers/clientes.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createClientesSchema } from '../schemas/clientes.schema.js';


const router = Router();

router.post('/createCliente', validateSchema(createClientesSchema), createCliente);

router.get('/getClientes', getClientes);

router.get('/searchClienteByDocumentoOEmail', searchClienteByDocumentoOEmail);

router.put('/updateCliente', validateSchema(createClientesSchema), updateCliente);

router.delete('/deleteCliente', deleteCliente);

router.delete('/deleteClienteByDocumentoOEmail', deleteClienteByDocumentoOEmail);

export default router;