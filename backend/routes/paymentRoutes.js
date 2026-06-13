const express = require("express");
const {
  createPayment,
} = require("../controllers/paymentController");
const router = express.Router();
router.post(
  "/create-order",
  createPayment
);

module.exports = router;