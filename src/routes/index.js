const { Router } = require('express'); // este MÉTODO router permite crear NUEVAS RUTAS
const router = Router();

router.get('/', (req, res) => {
    const data = {
        "name": "archienemigo",
        "website": "archienemigo.com.mx"
    };
    res.json(data); // res.json envía OBJETOS JSON cuando se hace la petición GET de ESTA RUTA
});

module.exports = router;