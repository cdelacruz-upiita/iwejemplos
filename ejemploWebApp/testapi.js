const correo = 'pedro@gmail.com'
fetch(`http://localhost:5000/api/sqlserver/users/${correo}`)
    .then(res => res.json()) // Retorno implícito
    .then(user => console.log(user)) 
    .catch(err => console.error(err));