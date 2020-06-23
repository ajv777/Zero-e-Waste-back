// This is a model for recycling related queries

// Deletes table content
const removeAll = () => {
    return new Promise((resolve, reject) => {
        db.query('delete from epoints',
        (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
} 

// Uploads ecopoints to database
const create = (pData) => {
    return new Promise ((resolve, reject) => {
        db.query('insert into epoints (title, cif, address, others, cp, locality, province, latitude, longitude) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [pData.title, pData.cif, pData.address, pData.others, pData.cp, pData.locality, pData.province, pData.latitude, pData.longitude],
        (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}

const getAll = () => {
    return new Promise ((resolve, reject) => {
        db.query('select * from epoints'),
        (err, result) => {
            if(err) reject(err)
            resolve(result)
        }
    })
}


module.exports = {
    create, removeAll, getAll
}