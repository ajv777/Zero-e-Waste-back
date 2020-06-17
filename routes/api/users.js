const router = require('express').Router()
const usersModel = require('../../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')
const {checkToken} = require('../middlewares')

// QUERIES START HERE
router.get('/', checkToken, async(req, res) => {
  try{
    const rows = await usersModel.getAll()
    res.json(rows)
  }catch(err) {
    res.status(500).json({error: err.message})
  }
})

router.get('/:usersId', checkToken, async(req, res) => {
  try{
    const row = await usersModel.getById(req.params.usersId)
    res.json(row)
  }catch(err) {
    res.status(500).json({error: err.message})
  }
})

router.put('/:usersId', checkToken, async(req, res) => {
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

router.delete('/:usersId', checkToken, async(req, res) => {
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
// QUERIES END HERE

// LOGIN STARTS HERE

// Retistro
router.post('/', async(req, res) => {
  console.log(req.body)
  try{
    // el 2 es el factor de carga. Cuando dejemos de hacer pruebas es mejor subirlo a 10-12
    req.body.password = bcrypt.hashSync(req.body.password, 2)
    console.log(req.body)
    const result = await usersModel.create(req.body)
    if(result.affectedRows >= 1){
      res.json({success: "Usuario registrado"})
    }else{
      res.json({error: "Registro fallido"})
    }
  }catch(err){
    res.status(500).json({error: err.message})
  }
  
})

// Login
router.post('/login', async(req, res) => {
  const user = await usersModel.getByEmail(req.body.email)
  if(user){
    const same = bcrypt.compareSync(req.body.password, user.Password)
    if(same){
      res.json({success: 'login correcto', token: createToken(user.Id_User)})
    }else{
      res.json({error: 'Error en email y/o contraseña'})
    }
  }else{
    res.json({error: 'Error en email y/o contraseña'})
  }
})

// Token creation
function createToken(pUserId){
  const payload = {
    userId: pUserId, 
  }
  const options = {
    //Esto es necesario hacerlo porque es necesario que el token caduque. Si le roban el token al usuario y no expira, se puede usar indefinidamente.
    expiresIn: '60days'
  }
  return jwt.sign(payload, process.env.SECRET_KEY, options)
}



// LOGIN ENDS HERE
module.exports = router;
