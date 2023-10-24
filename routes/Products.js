const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} = require("../controller/Product");

const router = express.Router();
//  /products is already added in base path
router
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .post("/", createProduct)
  .patch("/:id", updateProduct);

exports.router = router;
