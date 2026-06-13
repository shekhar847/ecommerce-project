const razorpay = require("../config/razorpay");

exports.createPayment = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("AMOUNT:", req.body.amount);
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };
    console.log("OPTIONS:", options);
    const order = await razorpay.orders.create(options);
    console.log("ORDER CREATED:", order);
    res.json(order);
  } catch (error) {
    console.log("RAZORPAY ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};