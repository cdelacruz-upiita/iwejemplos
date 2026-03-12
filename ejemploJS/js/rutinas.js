/* var permite declarar una variable con alcance de función, 
   puede redeclararse */

/* let permite declarar una variable con alcance de bloque {}
   y reasignar su valor pero no redeclarar en el mismo bloque */

/* const para valores que no cambian en un bloque { }, por lo que
   no se puede reasignar. En objetos y arrays si se puede modificar */   
 
var msgG = "texto creado a nivel global en el archivo"; // ASI Automatic Semicolon Insertion
let a = 5;
[1,2,3,5,6.5,"uno"].forEach(n => console.log(n));


/* Estructura para ejemplificar this en funciones */
const persona = {
  nombre: "Ana María",

  tradicional: function() {
    console.log("Tradicional:", this.nombre);
  },

  flecha: () => {
    console.log("Flecha:", this.nombre);
  }
};


function funVariables (strParam){
  const msg = "Mensaje: ";
  let strLocal = "texto creado en el alcance de la función";
  let num = 3;
  console.log(msg + " valor de la variable msgG declarada con var fuera de la función" + msgG);
  console.log(msg + strParam);
  console.log(msg + strLocal);
  /*console.log(msg + 5 + 7);*/
  console.log("Suma de valores enteros con variable num: " + (num + 5));
  num = 7.5
  console.log("Suma de valores decimales con la misma variable num: " + (num + 5.6));
  console.log(`Suma anterior usando template string: ${num + 5.6}`);

  // ${} -- evita el uso de concatenacion de string


  console.log(saludar("Carlos"));  
  console.log(saludarAnonima("Juan"));
  console.log(saludarFlecha("María"));

  persona.tradicional(); // Ana María
  persona.flecha();      // undefined

}

// Función tradicional
// Se puede llamar antes de declarla
// tiene su propio this
function saludar(nombre) {
  return "Hola " + nombre;
}

// Función anónima
// tiene su propio this
const saludarAnonima = function(nombre) {
  return "Hola fun anónima " + nombre;
};

// Función flecha
// no tiene su propio this
// no funciona como constructor
const saludarFlecha = (nombre) =>   "Hola fun flecha " + nombre; 
  /* { return "Hola fun flecha " + nombre;
};*/



