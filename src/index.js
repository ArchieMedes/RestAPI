const express = require('express');
const app = express(); // ejecutamos el framework de express
const morgan = require('morgan'); // MIDDLEWARE: permite ver POR CONSOLA lo que llega al SERVIDOR

// SETTINGS
// en lugar de declararlo como una variable lo hago así porque "app." la puedo llamar desde cualquier parte de mi aplicación
app.set('port', process.env.PORT || 3000); // esto es como crear una variable llamada PORT con un valor numérico de 3000 o UN PUERTO YA DEFINIDO POR EL SERVICIO DE LA NUBE DONDE MONTARÉ MI APP
app.set('json spaces', 2); // esta linea no hace nada en nuevas versiones 

// MIDDLEWARES
app.use( morgan('dev') );
app.use( express.urlencoded( { // para recibir datos de FORMULARIOS y ENTENDERLOS
    extended: false
}));
// app.use(morgan('combined')); // hace lo que dev pero más detallado
app.use( express.json() ); // permite que nuestro servidor levantado con NodeJS reciba y entienda archivos JSON

// ROUTES
app.use(require('./routes/index')); // app utiliza lo que requiero de la carpeta routes desde el archivo index
app.use('/api/movies', require('./routes/movies')); // para que la URL y por convencion, empiece por "api"
app.use('/api/users', require('./routes/users'));

// STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});