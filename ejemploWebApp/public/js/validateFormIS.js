const form = document.getElementById("loginForm");

/* helpers */
function setError(input, error, mensaje) {
  error.textContent = mensaje;
  input.classList.add("invalido");
  input.classList.remove("valido");
}

function setValido(input, error) {
  error.textContent = "";
  input.classList.add("valido");
  input.classList.remove("invalido");
}

/* validar campo */
function validarCampo(input) {
  const error = document.getElementById("error-" + input.id);

  if (input.validity.valueMissing) {
    setError(input, error, "Este campo es obligatorio");
    return false;
  }

  if (input.type === "email" && input.validity.typeMismatch) {
    setError(input, error, "Correo inválido");
    return false;
  }

  if (input.id === "contrasena" && input.value.length < 6) {
    setError(input, error, "Mínimo 6 caracteres");
    return false;
  }

  setValido(input, error);
  return true;
}

/* debounce */
function debounce(func, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

/* eventos */
["correo","contrasena"].forEach(id => {
  const input = document.getElementById(id);

  input.addEventListener("blur", () => validarCampo(input));
  input.addEventListener("input", debounce(() => validarCampo(input), 300));
});

form.addEventListener("submit", (event) => {
  let esFormularioValido = true;
  
  ["correo", "contrasena"].forEach(id => {
    const input = document.getElementById(id);
    if (!validarCampo(input)) {
      esFormularioValido = false;
    }
  });

  
  if (!esFormularioValido) {
    event.preventDefault(); 
    console.log("El formulario tiene errores. No se envía.");
  } else {
    console.log("Formulario válido. Enviando al servidor...");
  }
});
