import { useState } from "react";

export default function LoginForm({ onCreateAccount }) {
  return (
    <div className="container">
      <form id="loginForm" action="/users/login" method="POST" noValidate>
        <input type="email" id="correo" placeholder="Correo electrónico" name="correo" required />
        <div id="error-correo" className="error"></div>

        <input type="password" id="contrasena" placeholder="Contraseña" name="contrasena" required minLength="6" />
        <div id="error-contrasena" className="error"></div>

        <div className="btnContainer">
          <button type="submit" className="submit">Iniciar Sesión</button>
        </div>

        <div className="links">
          <a href="/users/recuperar">¿Olvidaste tu contraseña?</a>
          <button type="button" className="linkButton" onClick={onCreateAccount}>
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
}