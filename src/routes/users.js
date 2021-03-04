const { Router } = require('express');
const router = Router();

const fetch = require('node-fetch'); // libreria instalada con 'npm i node-fetch'
 


router.get('/', async (req, res) => {
    // lo que se obtenga de la consulta FETCH se guardará como STRING en la variable RESPONSE
    const response = await fetch('https://jsonplaceholder.typicode.com/users'); // petición asíncrona: tomará tiempo para obtener los datos. Para eso usaremos ASYNC y AWAIT para que la app no continúe hasta que obtenga esta información
    const usersJson =  await response.json(); // la respuesta que era STRING conviértela  JSON
    // console.log(usersJson);
    // res.send('users');
    res.json(usersJson);
});

module.exports = router;