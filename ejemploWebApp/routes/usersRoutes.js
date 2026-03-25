/*
   rutas a acciones correspondientes a los 
   métodos HTTP POST y GET según correspondan 
   para las peticiones al servidor.

   En estas rutas se invocan a los controladores
   que son los encargados de procesar las 
   peticiones.
*/

import express from "express";
import { showFormRegister,showWelcome, registerUser, loginUser } from "../controllers/usersController.js";

const router = express.Router();
/*router.get("/", showFormLogin);*/
router.get("/registro", showFormRegister);
router.post("/registro", registerUser);
router.post("/login",loginUser)
router.get("/login/:name", showWelcome);
export default router;