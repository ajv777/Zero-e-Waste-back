const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("Select * from users", (err, rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

const getById = (pUsersId) => {
    return new Promise((resolve, reject) => {
        db.query("Select * from users where Id_User = ?", [pUsersId], (err, rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

// login
const getByEmail = (pUsersEmail) => {
    return new Promise((resolve, reject) => {
        db.query("Select * from users where email = ?", [pUsersEmail], (err, rows) => {
            if(err) reject(err)
            resolve(rows[0])
        })
    })
}

const create = (pData) => {
    return new Promise((resolve, reject) => {
        db.query("insert into users (name, surname, address, pc, localidad, province, phone_number, whatsapp, email, password, latitude, longitude, signup_date) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [pData.name, pData.surname, pData.address, pData.pc, pData.localidad, pData.province, pData.phone_number, pData.whatsapp, pData.email, pData.password, pData.latitude, pData.longitude, pData.signup_date],
        (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const updateById = (pUsersId, pData) => {
    return new Promise((resolve, reject) => {
        db.query("Update users set name = ?, surname = ?, address = ?, pc = ?, localidad = ?, province = ?, phone_number = ?, whatsapp = ?, email = ?, latitude = ?, longitude = ?, signup_date = ? where Id_User = ?",
        [pData.name, pData.surname, pData.address, pData.pc, pData.localidad, pData.province, pData.phone_number, pData.whatsapp, pData.email, pData.latitude, pData.longitude, pData.signup_date, pUsersId],
        (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}

const remove = (pUsersId) => {
    return new Promise((resolve, reject) => {
        db.query("delete from users where Id_User = ?", [pUsersId],
        (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}

//Instalar jasonwebtoken y moment
//El token se crea aquí
//Ejemplo cogido de la app de gimnasios
/* function createToken(pUserId) {
    const payload = {
        userId: pUserId,
        createdAt: moment().unix(),
        expiredAt: moment().add(15, 'minutes').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
} */

//Crear un fichero de middlewares en routes
//Middlewares exporta 

//En api va algo así como (cogido de gimnasio)
/* const {checkToken} = require('./middlewares')

router.use('/clientes', checkToken, apliClientesRouter) */

//Para saber qué hacer con el token, la respuesta está en los middlewares de appgimnasio

//Merece la pena echar un ojo al isAdmin (Middlewares:43, routes/api/clientes: 30). 
//Quizás se puede usar el mismo método para restringir acceso a usuarios que no están logueados



module.exports = {
    getAll, getById, getByEmail, create, updateById, remove
}