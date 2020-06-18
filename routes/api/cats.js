const router = require('express').Router()
const catsModel = require('../../models/cats')

// compra -> select con categorías
router.get('/', async(req, res) => {
    try {
        const rows = await catsModel.getAll()
        res.json(rows)
    } catch(err){
        res.status(500).error({error: err.message})
    }
})



module.exports = router