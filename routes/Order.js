const express = require("express");
const {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controller/Order");

const router = express.Router();
//  /orders is already added in base path
router
  .post("/", createOrder)
  .get("/", fetchAllOrders)
  .get("/own/", fetchOrdersByUser)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

exports.router = router;
