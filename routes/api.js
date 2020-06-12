const router = require ('express').Router();
const apiItemsRouter = require('./api/items');
const apiUsersRouter = require ('./api/users');

// Compruebo que se conecta la ruta
/* router.get('/', (req,res) => {
    res.send ('Estoy en /api')
}) */


router.use('/items', apiItemsRouter); // he quitado el /api/ porque ya estamos en api y por ello no es necesario
router.use('/users', apiUsersRouter);

module.exports = router;