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

const create = (pData) => {
    return new Promise((resolve, reject) => {
        db.query("insert into users (name, surname, address, pc, localidad, province, phone_number, whatsapp, email, latitude, longitude, signup_date) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [pData.name, pData.surname, pData.address, pData.pc, pData.localidad, pData.province, pData.phone_number, pData.whatsapp, pData.email, pData.latitude, pData.longitude, pData.signup_date],
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

module.exports = {
    getAll, getById, create, updateById, remove
}