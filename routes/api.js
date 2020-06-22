const router = require('express').Router();
const apiItemsRouter = require('./api/items');
const apiUsersRouter = require('./api/users');
const apiCatsRouter = require('./api/cats')
const recycleRouter = require('./api/recycle')

// Compruebo que se conecta la ruta
/* router.get('/', (req,res) => {
    res.send ('Estoy en /api')
}) */

const {checkToken, multipartMW} = require('./middlewares')

router.use('/items', checkToken, multipartMW, apiItemsRouter); // he quitado el /api/ porque ya estamos en api y por ello no es necesario
router.use('/users', apiUsersRouter);
router.use('/cats', checkToken, apiCatsRouter)
router.use('/recycle', recycleRouter)

module.exports = router;