const router = require('express').Router()
const usersModel = require('../../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get('/', async(req, res) => {
  try{
    const rows = await usersModel.getAll()
    res.json(rows)
  }catch(err) {
    res.status(500).json({error: err.message})
  }
})

router.get('/:usersId', async(req, res) => {
  try{
    const row = await usersModel.getById(req.params.usersId)
    res.json(row)
  }catch(err) {
    res.status(500).json({error: err.message})
  }
})

router.post('/', async(req, res) =>{
  try{
    const result = await usersModel.create(req.body)
    if(result.affectedRows >= 1){
      res.json({success: "User was created"})
    }else{
      res.json({error: "Create failed"})
    }
  }catch(err){
    res.status(500).json({error: err.message})
  }
})

router.put('/:usersId', async(req, res) => {
  try{
    const result = await usersModel.updateById(req.params.usersId, req.body)
    if(result.affectedRows >= 1){
      res.json({success: "User was updated"})
    }else{
      res.json({error: "Update failed"})
    }
  }catch(err){
    res.status(500).json({error: err.message})
  }
})

router.delete('/:usersId', async(req, res) => {
  try{
    const result = await usersModel.remove(req.params.usersId)
    if(result.affectedRows >= 1){
      res.json({success: "User was deleted"})
    }else{
      res.json({error: "Delete failed"})
    }
  }catch(err){
    res.status(500).json({error: err.message})
  }
})

module.exports = router;
