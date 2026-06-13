const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
} = require("../controllers/productController");
const router = express.Router();
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.post("/:id/reviews", createReview);

module.exports = router;