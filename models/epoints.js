// This is a model for recycling related queries

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

module.exports = {
    create, removeAll
}