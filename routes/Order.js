const express = require("express");
const {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
} = require("../controller/Order");

const router = express.Router();
//  /orders is already added in base path
router
  .post("/", createOrder)
  .get("/", fetchOrdersByUser)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

exports.router = router;
