const router = require('express').Router()
const item = require('../../models/items')


router.get('/', (req, res) => {
    item.getAll()
        .then(rows => {
            res.json(rows)
        })
        .catch(err => {
            res.json({error: err.message})
        })
})

//POST http://localhost:3000/api/items
router.post('/create', async(req, res) => {
    const result = await item.create(req)
    res.send('Estoy en items/create')
})

//PUT http://localhost:3000/api/items
router.put('/:itemId', async (req, res) => {
    const result = await items.updateById(req.params.itemid, req)
    if(result['affectedRows'] === 1 ){
        res.json({success: 'item was updated'})
    }else{
        res.json({error: 'item was not updated'})
    }
})


module.exports = router