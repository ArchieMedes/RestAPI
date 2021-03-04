const{ Router } = require('express');
const router = Router();
const _ = require('underscore'); // esta biblioteca nos permite jugar con arreglos como recorrerlos

const movies = require('../sample.json');
// console.log(movies);

router.get('/', (req, res) => {
    res.json(movies);
});

router.post('/', (req, res) => {
    // console.log(req.body); // esta linea imprime en consola lo que recibo con el método POST desde el cliente
    const { title, director, year, rating } = req.body; // extraigo los valores de los atributos del OBJETO JSON que estoy recibiendo
    if ( title && director && year && rating ) {
        const id = movies.length + 1;
        const newMovie = {...req.body, id}; // crea una copia del objeto recibido en el BODY en otro objeto (newMovie), y le agregamos un ATRIBUTO: ID con el valor que la variable CONST ID guarda
        console.log(newMovie);
        movies.push(newMovie); // agregamos el nuevo elemento a la LISTA que importamos de sample.json
        res.json(movies);
        // res.send('saved');
    }
    else {
        res.status(500).json(
            {
                error: 'Wrong request!'
            }
        );
    }
    
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;
    if( title && director && year && rating ) {
        _.each(movies, (movie, indice) => {
            if( movie.id == id ) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    }
    else {
        res.status(500).json( {
            error: 'There was an error'
        });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params; // el parámetro que estyo recibiendo por URL (/:id) lo guardo en la variable "id"
    _.each(movies, (movie, indice) => {
        if( movie.id == id ) { // si la película ("movie") que en la que estoy al recorrer el arreglo "movies", su propiedad "id" es igual al que estoy recibiendo por parámetro desed la RUTA (/:id)
            movies.splice(indice, 1); // el método SPLICE elimina el elemento con el ID que se le pase por PRIMER PARÁMETRO, mientras el segundo parámetro es la cantidad de elementos a eliminar (1)
        }
    });
    res.send(movies);
});

module.exports = router;