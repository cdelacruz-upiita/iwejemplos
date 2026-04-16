import { Router } from 'express';
import * as crud from '../controllers/usersMySQL.js';
import * as crudSQL from '../controllers/usersSQLServer.js';
const router = Router();

router.get('/mysql/users', crud.getUsers);
router.get('/sqlserver/users', crudSQL.getUsers);

/**
  {
  "nombre": "Juan Pérez",
  "correo": "juan.perez@example.com",
  "contrasena": "12345678",
  "preguntarc": "¿Nombre de tu primera mascota?",
  "respuestarc": "Firulais"
}
 * 
 */

router.post('/mysql/users', crud.registerUser);
router.post('/sqlserver/users', crudSQL.registerUser);

export default router;
