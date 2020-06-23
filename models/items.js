// List all items
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from items", (err, rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

// Select an item
const getById = (pItemId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from items where idItem = ?', [pItemId], (err, rows) => {
                if(err) reject(err)
                resolve(rows[0])
        })
    })
}

// Sort by category. No order
const getByCat = (pCatName) => {
    return new Promise((resolve, reject) => {
        db.query('select * from items where Category_idCategory = ?', [pCatName], (err, rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

// Sort by category order by precio asc
const getByPriceAsc = (pCatName) => {
    return new Promise((resolve, reject) => {
        db.query("select * from items where Category_idCategory = ? order by precio asc", [pCatName], (err, rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

// Sort by category order by precio desc
const getByPriceDesc = (pCatName) => {
    return new Promise((resolve, reject) => {
        db.query("select * from items where Category_idCategory = ? order by precio desc", [pCatName], (err, rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

// Sort by category order by most recent date
const getByRegDate = (pCatName) => {
    return new Promise((resolve, reject) => {
        db.query("select * from items where Category_idCategory = ? order by Register_date asc", [pCatName], (err, rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

// Sort by user
const getByUser = (pUserName) => {
    return new Promise((resolve, reject) => {
        db.query("select * from items where Users_Id_User = ?", [pUserName], (err, rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

// Create an item
// Al usar pData, eliminamos la necesidad de mantener orden en el segundo parámetro. La principal ventaja de esto es que si decidimos añadir más parámetros a la base de datos, es mucho menos lío implementarlos desde back
const create = (pData) => {
    return new Promise((resolve, reject) => {
        db.query('insert into items (name, description, register_date, pic_1, pic_2, pic_3, precio, post_delivery, hand_delivery, users_id_user, category_idCategory) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [pData.name, pData.description, pData.register_date, pData.pic_1, pData.pic_2, pData.pic_3, pData.precio, pData.post_delivery, pData.hand_delivery, pData.users_id_user, pData.category_idCategory],
        (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

// Edit an item
const updateById = (pItemId, pData) => {
    return new Promise((resolve, reject) => {
        db.query('update items set name = ?, description = ?, register_date = ?, pic_1 = ?, pic_2 = ?, pic_3 = ?, precio = ?, post_delivery = ?, hand_delivery = ?, users_id_user = ?, category_idCategory = ? where idItem = ?',
        [pData.name, pData.description, pData.register_date, pData.pic_1, pData.pic_2, pData.pic_3, pData.precio, pData.post_delivery, pData.hand_delivery, pData.users_id_user, pData.category_idCategory, pItemId],
        (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}

//Delete an item
const remove = (pItemId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from items where idItem = ?', 
        [pItemId],
        (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}

module.exports = {
    getAll, getById, getByCat, getByPriceAsc: getByPriceAsc, getByPriceDesc, getByRegDate, getByUser, create, updateById, remove
}  //comentario de prueba