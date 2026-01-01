const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const auth = require("../middleware/auth");

router.post("/create",auth, itemController.createItem);
router.get("/items",auth, itemController.getItems);
router.put("/items/:id",auth, itemController.updateItem);
router.delete("/items/:id",auth, itemController.deleteItem);

module.exports = router;
