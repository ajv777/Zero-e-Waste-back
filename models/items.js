const queries = require('../queries')

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from items", (err, rows) => {
            if(err) reject (err)
            resolve(rows)
        })
    })
}

const create = (name, description, pic_1, pic_2, pic_3, precio, post_delivery, hand_delivery) => {
    return new Promise((resolve, reject) => {
        db.query('insert into items (name, description, pic_1, pic_2, pic_3, precio, post_delivery, hand_delivery) values (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, description, pic_1, pic_2, pic_3, precio, post_delivery, hand_delivery, new Date()],
        (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const getById = (pItemId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from items where id = ?', [pItemId], (err, rows) => {
                if(err) reject(err)
                resolve(rows)
        })
    })
}

const updateById = (pItemId) => {
    return new Promise((resolve, reject) => {
        db.query('update items set description = ?, pic_1 = ?, pic_2 = ?, pic_3 = ?, precio = ?, post_delivery = ?, hand_delivery = ?, name = ? where id = ?',
        [name, description, pic_1, pic_2, pic_3, precio, post_delivery, hand_delivery, pItemId],
        (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}

module.exports = {
    getAll, create, getById, updateById,
} 