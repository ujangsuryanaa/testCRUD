const express = require("express");

const router = express.Router();

const {
  addProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/product");

router.post("/product", addProducts);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.patch("/product/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
