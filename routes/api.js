const router = require('express').Router();
const apiItemsRouter = require('./api/items');
const apiUsersRouter = require('./api/users');
const apiCatsRouter = require('./api/cats')

// Compruebo que se conecta la ruta
/* router.get('/', (req,res) => {
    res.send ('Estoy en /api')
}) */

const {checkToken} = require('./middlewares')

router.use('/items', apiItemsRouter); // he quitado el /api/ porque ya estamos en api y por ello no es necesario
router.use('/users', checkToken, apiUsersRouter);
router.use('/cats', apiCatsRouter)

module.exports = router;