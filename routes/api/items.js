const router = require("express").Router();
const itemsModel = require("../../models/items");
const { checkToken } = require("../middlewares");
const app = require("express");
const path = require("path");

//GET /api/items
//
router.get("/", async (req, res) => {
  try {
    const rows = await itemsModel.getAll();
    res.json(rows);
  } catch (err) {
    //con esto estamos devolviendo un codigo http 500 para indicar que la petición no ha ido bien
    res.status(500).json({ error: err.message });
  }
});

// Detalle de item
router.get("/:itemId", async (req, res) => {
  try {
    const row = await itemsModel.getById(req.params.itemId);
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Compra -> es lo que sale cuando escoges una categoría en el select
router.get("/by-cat/:catName", async (req, res) => {
  try {
    const row = await itemsModel.getByCat(req.params.catName);
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Compra -> botón "Precio (de mayor a menor)"
router.get("/by-price-asc/:nombre", async (req, res) => {
  try {
    const rows = await itemsModel.getByPriceAsc(req.params.nombre);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Compra -> botón "Precio (de menor a mayor)"
router.get("/by-price-desc/:nombre", async (req, res) => {
  try {
    const rows = await itemsModel.getByPriceDesc(req.params.nombre);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Compra -> botón "Fecha de subida (más recientes)"
router.get("/by-date/:nombre", async (req, res) => {
  try {
    const rows = await itemsModel.getByRegDate(req.params.nombre);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// usuario/:userid -> Mis productos en venta
router.get("/by-user/:nombre", async (req, res) => {
  try {
    const rows = await itemsModel.getByUser(req.params.nombre);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// vender -> formulario de venta
router.post("/", async (req, res) => {
  try {
    //con las tres líneas siguientes se aumenta la seguridad. Con esto evitamos que un usuario pueda registrar otro usuario cuando crea un objeto, lo cual no sería posible desde front pero sí con un ataque vía postman
    const data = req.body;
    data.users_id_user = req.token.userId;
    data.pic_1 = req.files.pic_1 ? path.basename(req.files.pic_1.path) : null;
    data.pic_2 = req.files.pic_2 ? path.basename(req.files.pic_2.path) : null;
    data.pic_3 = req.files.pic_3 ? path.basename(req.files.pic_3.path) : null;
    const result = await itemsModel.create(data);
    if (result.affectedRows >= 1) {
      res.json({ success: "Item was created" });
    } else {
      res.json({ error: "Create failed" });
    }
  } catch (err) {
    console.error(err.stack)
    res.status(500).json({ error: err.message });
  }
});

// usuario/:usuarioid -> editar productos en perfil (creo)
router.put("/:itemId", async (req, res) => {
  try {
    const data = req.body;
    // Borro los campos para poder no añadirlos si la imagen no viene. Si vienen, la imagen se añade. Esto es para que las imagenes que no se modifiquen no se actualicen en base de datos, porque si no lo hiciésemos se actualizarían en base de datos a un valor que no es correcto
    delete data.pic_1
    delete data.pic_2 
    delete data.pic_3
    if(req.files.pic_1){
      data.pic_1 = path.basename(req.files.pic_1.path)
    }
    if(req.files.pic_2){
      data.pic_2 = path.basename(req.files.pic_2.path)
    }
    if(req.files.pic_3){
      data.pic_3 = path.basename(req.files.pic_3.path)
    }
    
    const result = await itemsModel.updateById(req.params.itemId, data);
    if (result.affectedRows >= 1) {
      res.json({ success: "item was updated" });
    } else {
      res.json({ error: "item was not updated" });
    }
  } catch (err) {
    console.error(err.stack)
    res.status(500).json({ error: err.message });
  }
});

//DELETE http://localhost:3000/api/items
router.delete("/:itemId", async (req, res) => {
  try {
    const result = await itemsModel.remove(req.params.itemId);
    if (result.affectedRows >= 1) {
      res.json({ success: "item was deleted" });
    } else {
      res.json({ error: "item was not deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user-detail/:itemId", async (req, res) => {
  try {
    const result = await itemsModel.getUserDetail(req.params.itemId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// IMAGE UPLOAD

// Image endpoint

router.post("/uploadimg", (req, res) => {
  res.json({ message: "File was uploaded" });
});

module.exports = router;
