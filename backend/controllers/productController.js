const Product = require("../models/Product");

// --------------------Get All Product-----------------
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// --------------------Get Single Product--------------
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// --------------------Add Product---------------------
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// --------------------Delete Product------------------
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    res.json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// --------------------Update Product------------------
exports.updateProduct = async (req, res) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// --------------------Add Review----------------------
exports.createReview = async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    const product = await Product.findById(
      req.params.id
    );
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    const review = {
      user,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);
    product.numReviews =
      product.reviews.length;
    product.rating =
      product.reviews.reduce(
        (acc, item) =>
          acc + item.rating,
        0
      ) / product.reviews.length;
    await product.save();
    res.status(201).json({
      message:
        "Review Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};