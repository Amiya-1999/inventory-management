const express = require("express");
const {
  getProducts,
  addProduct,
  updateQuantity,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:id/quantity", updateQuantity);
router.delete("/:id", deleteProduct);

module.exports = router;
