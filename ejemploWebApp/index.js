/**
 * Sesiones y cookies
 * 
 Middleware express-session: Genera y gestiona el session ID, firma cookies para seguridad con una clave secreta.

Cookie HTTP: Almacena el session ID en el navegador del cliente (HttpOnly para prevenir XSS).

Almacén de sesiones: Memoria para desarrollo; Redis o bases de datos para escalabilidad y persistencia entre servidores.

Opciones clave: secret (firma), resave: false (no guarda sin cambios), saveUninitialized: true (guarda sesiones nuevas), cookie: { secure: true, maxAge: 24*60*60*1000 } (duración).


const app = express();

app.use(session({
  secret: 'tu-clave-secreta-muy-larga-y-aleatoria',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // true en HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

 req.session.user = { id: 1, name: username }; // Guardar datos

   
Let´s Encrypt

mkcert


ejemplo básico de https

import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

const app = express();

// 1. Cargar los certificados
// Nota: En producción, usa variables de entorno para las rutas
const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};

app.get('/', (req, res) => {
  res.send('¡Conexión segura establecida!');
});

// 2. Crear el servidor HTTPS pasando la app de Express
const PORT = 443; // Puerto estándar para HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}`);
});

 */





/* 
   Archivo principal que inicia el servidor.
   Responsabilidades:
     1. Configurar Express
     2. Leer variables de entorno
     3. Registrar middlewares
     4. Registrar rutas
     5. Servir archivos estáticos (assets)


  Se requiere configurar el proyecto nodeJS
  
  1. Iniciarlizar proyecto
     npm init -y ------ asigna valores por defecto en 
                 ------ la configuración de package.json

   2. Instalar dependencias para el proyecto: en este caso
      Express para el servidor HTTP para procesar peticiones
      a través de envíos POST y GET.

      npm install express
      npm install --save-dev nodemon
      npm install bcrypt
*/

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

/*import dotenv from "dotenv"; // npm install dotenv*/

import usersRoutes from "./routes/usersRoutes.js";
import { get404 } from "./controllers/errorController.js"

// asigna puerto para atender peticiones
/**
 * | Rango       | Tipo        | Uso recomendado                                 |
| ----------- | ----------- | ----------------------------------------------- |
| 0-1023      | Well-known  | ❌ Reservados (HTTP=80, HTTPS=443, FTP=21, etc.) |
| 1024-49151  | Registrados | ✅ Desarrollo (3000, 4000, 5000, 8080)           |
| 49152-65535 | Dinámicos   | ✅ Temporales                                    |
 */
const PORT = 3000;

// instancia el modulo de express para configurar el servidor
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define el motor de plantillas
app.set('view engine', 'ejs');

// habilita la conversión de objetos JSON a objetos JS.
app.use(express.json());

// habilita el procesamiento de solicitudes POST/PUT
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {  
  res.sendFile(path.join(__dirname, "public/html/formInicioS.html"));
});

// asocia carpeta views para las vistas EJS
app.set('views', path.join(__dirname, 'views'));

// asocia contenido estático HTML, CSS
app.use(express.static(path.join(__dirname, "public")));

app.use("/users",usersRoutes);
// Se asocia el puerto e inicia el servidor
/**
 * app.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor corriendo");
});
 */

app.use(get404);

app.use ((err, req, res, next)=>{
   const statusCode = err.statusCode || 500;
   res.status(statusCode).json({
      status: 'error',
      message: err.message || "Algo salió mal ..."
   })
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});