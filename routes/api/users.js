const router = require('express').Router()
const usersModel = require('../../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')

// QUERIES START HERE
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
// QUERIES END HERE

// LOGIN STARTS HERE

// Retistro
router.post('/', async(req, res) => {
  console.log(req.body)
  try{
    //He dejado la longitud de contraseña como 15, pero dejo esto comentado para que sepamos donde está
    req.body.password = bcrypt.hashSync(req.body.password, 15)

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
  console.log("hola juanan")
  if(user){
    const same = bcrypt.compareSync(req.body.password.usuario.password)
    console.log(same)
    if(same){
      createToken(user.id_user)
      res.json({success: 'login correcto', token: createToken(user.id_user)})
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
    /* createdAt: moment().unix(),
    expiredAt: moment().add(15, 'minutes').unix() */
  }
  return jwt.sign(payload, process.env.SECRET_KEY)
}



// LOGIN ENDS HERE
module.exports = router;
