import { useState } from "react";

export default function RegisterForm({ onBackToLogin }) {
  const [form, setForm] = useState({
    nombre: "",
    contrasena: "",
    concontrasena: "",
    preguntarc: "",
    respuestarc: "",
    correo: ""
  });

  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (!/^[a-zA-Z\s]{3,50}$/.test(form.nombre)) {
      newErrors.nombre = "El nombre debe tener entre 3 y 50 letras.";
    }

    if (!form.contrasena.trim()) {
      newErrors.contrasena = "La contraseña es obligatoria.";
    } else if (!/^[a-zA-Z0-9]{6,13}$/.test(form.contrasena)) {
      newErrors.contrasena = "La contraseña debe tener entre 6 y 13 caracteres alfanuméricos.";
    }

    if (!form.concontrasena.trim()) {
      newErrors.concontrasena = "Confirma tu contraseña.";
    } else if (form.contrasena !== form.concontrasena) {
      newErrors.concontrasena = "Las contraseñas no coinciden.";
    }

    if (!form.preguntarc.trim()) {
      newErrors.preguntarc = "La pregunta de recuperación es obligatoria.";
    }

    if (!form.respuestarc.trim()) {
      newErrors.respuestarc = "La respuesta de recuperación es obligatoria.";
    }

    if (!form.correo.trim()) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(form.correo)) {
      newErrors.correo = "Ingresa un correo válido.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setModal({
        open: true,
        title: "Errores de validación",
        message: "Revisa los campos marcados en rojo."
      });
      return;
    }

    setErrors({});
    setModal({
      open: true,
      title: "Registro exitoso",
      message: `Usuario ${form.nombre} registrado correctamente.`
    });

    console.log("Registro:", form);
  };

  const handleReset = () => {
    setForm({
      nombre: "",
      contrasena: "",
      concontrasena: "",
      preguntarc: "",
      respuestarc: "",
      correo: ""
    });
    setErrors({});
    setModal({
      open: false,
      title: "",
      message: ""
    });
  };

  return (
    <div className="container">
      <h2>Formulario de registro</h2>

      <form id="miFormulario" onSubmit={handleSubmit} noValidate>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ej. Juan López"
          value={form.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <span className="mensaje">{errors.nombre}</span>}

        <label htmlFor="contrasena">Contraseña:</label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          value={form.contrasena}
          onChange={handleChange}
        />
        {errors.contrasena && <span className="mensaje">{errors.contrasena}</span>}

        <label htmlFor="concontrasena">Confirmación contraseña:</label>
        <input
          type="password"
          id="concontrasena"
          name="concontrasena"
          value={form.concontrasena}
          onChange={handleChange}
        />
        {errors.concontrasena && <span className="mensaje">{errors.concontrasena}</span>}

        <label htmlFor="preguntarc">Pregunta recuperación cuenta:</label>
        <input
          type="text"
          id="preguntarc"
          name="preguntarc"
          value={form.preguntarc}
          onChange={handleChange}
        />
        {errors.preguntarc && <span className="mensaje">{errors.preguntarc}</span>}

        <label htmlFor="respuestarc">Respuesta recuperación cuenta:</label>
        <input
          type="text"
          id="respuestarc"
          name="respuestarc"
          value={form.respuestarc}
          onChange={handleChange}
        />
        {errors.respuestarc && <span className="mensaje">{errors.respuestarc}</span>}

        <label htmlFor="correo">Correo electrónico:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="correo@ejemplo.com"
          value={form.correo}
          onChange={handleChange}
        />
        {errors.correo && <span className="mensaje">{errors.correo}</span>}

        <div className="btnContainer">
          <button className="submit" type="submit">Enviar</button>
          <button className="reset" type="button" onClick={handleReset}>
            Limpiar
          </button>
        </div>
      </form>

      <div className="links" style={{ marginTop: "16px" }}>
        <button type="button" className="linkButton" onClick={onBackToLogin}>
          Volver al inicio de sesión
        </button>
      </div>

      {modal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modal.title}</h2>
            <p>{modal.message}</p>
            <button type="button" onClick={() => setModal({ ...modal, open: false })}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}