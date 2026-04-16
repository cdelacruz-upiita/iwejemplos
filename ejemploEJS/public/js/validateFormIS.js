document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const correo = document.getElementById('correo');
  const contrasena = document.getElementById('contrasena');

  const errorCorreo = document.getElementById('error-correo');
  const errorContrasena = document.getElementById('error-contrasena');

  const mostrarError = (input, contenedor, mensaje) => {
    contenedor.textContent = mensaje;
    input.classList.add('input-error');
  };

  const limpiarError = (input, contenedor) => {
    contenedor.textContent = '';
    input.classList.remove('input-error');
  };

  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.addEventListener('submit', (e) => {
    let hayErrores = false;

    // Reset
    limpiarError(correo, errorCorreo);
    limpiarError(contrasena, errorContrasena);

    // Validar correo
    if (!correo.value.trim()) {
      mostrarError(correo, errorCorreo, 'El correo es obligatorio');
      hayErrores = true;
    } else if (!validarEmail(correo.value)) {
      mostrarError(correo, errorCorreo, 'Correo inválido');
      hayErrores = true;
    }

    // Validar contraseña
    if (!contrasena.value.trim()) {
      mostrarError(contrasena, errorContrasena, 'La contraseña es obligatoria');
      hayErrores = true;
    } else if (contrasena.value.length < 6) {
      mostrarError(contrasena, errorContrasena, 'Mínimo 6 caracteres');
      hayErrores = true;
    }

    if (hayErrores) e.preventDefault();
  });

  // Validación en tiempo real
  correo.addEventListener('input', () => {
    if (validarEmail(correo.value)) {
      limpiarError(correo, errorCorreo);
    }
  });

  contrasena.addEventListener('input', () => {
    if (contrasena.value.length >= 6) {
      limpiarError(contrasena, errorContrasena);
    }
  });
});