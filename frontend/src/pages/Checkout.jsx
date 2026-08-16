import { useState, useEffect } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ShieldCheckIcon, LockIcon, ArrowRightIcon, CheckIcon } from "../components/Icons";

function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  
  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const [name, setName] = useState(savedUser?.name || "");
  const [email, setEmail] = useState(savedUser?.email || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const payNow = async (e) => {
    e.preventDefault();
    if (!name || !email || !address || !city) {
      toast.warning("Please fill in all shipping details");
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/payment/create-order`, { amount: totalPrice });
      
      const options = {
        key: "rzp_test_SzqgmJdlfylllC",
        amount: data.amount,
        currency: data.currency,
        name: "ShopSphere",
        description: "Order Payment",
        order_id: data.id,
        handler: async function () {
          try {
            await axios.post(`${API_URL}/api/orders`, {
              user: name,
              items: cart,
              totalPrice,
              address,
              city,
            });
            toast.success("Payment Successful & Order Placed 🎉");
            clearCart();
            navigate("/orders");
          } catch (error) {
            toast.error(error.response?.data?.message || "Order creation failed");
          }
        },
        theme: {
          color: "#b26bff"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div className="container py-4">
      {/* Checkout Step Tracker */}
      <div className="glass-card p-4 rounded-4 prism-edge mb-4">
        <div className="d-flex align-items-center justify-content-center gap-3 gap-md-5 text-center">
          <div className="d-flex align-items-center gap-2 text-cyan">
            <span className="badge rounded-circle bg-primary p-2">1</span>
            <span className="fw-bold">Cart Bag</span>
          </div>
          <div className="border-bottom border-secondary flex-grow-1 max-w-xs"></div>
          <div className="d-flex align-items-center gap-2 text-cyan">
            <span className="badge rounded-circle bg-primary p-2">2</span>
            <span className="fw-bold">Shipping Info</span>
          </div>
          <div className="border-bottom border-secondary flex-grow-1 max-w-xs"></div>
          <div className="d-flex align-items-center gap-2 text-emerald">
            <span className="badge rounded-circle bg-warning text-dark p-2">3</span>
            <span className="fw-bold">Payment</span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Shipping Form */}
        <div className="col-lg-7">
          <div className="glass-card p-4 rounded-4 prism-edge">
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <ShieldCheckIcon size={24} className="text-cyan" /> Shipping Address
            </h4>

            <form onSubmit={payNow}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Delivery Address</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Street address, house number, apt..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">City / Location</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="City, State, Pincode"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-accent btn-lg w-100 rounded-pill fw-bold shadow py-3">
                Pay ₹{totalPrice?.toLocaleString()} via Razorpay
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary & Security */}
        <div className="col-lg-5">
          <div className="glass-card p-4 rounded-4 prism-edge mb-4">
            <h4 className="fw-bold mb-3 border-bottom border-secondary border-opacity-25 pb-3">
              Order Review ({cart.length})
            </h4>

            <div className="d-flex flex-column gap-3 mb-4" style={{ maxHeight: "300px", overflowY: "auto" }}>
              {cart.map((item) => (
                <div key={item._id} className="d-flex align-items-center justify-content-between gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-3"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="fw-bold text-white mb-0 text-truncate max-w-xs">{item.name}</h6>
                      <small className="text-secondary">Qty: {item.qty}</small>
                    </div>
                  </div>
                  <span className="fw-bold text-success">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-secondary border-opacity-25" />

            <div className="d-flex justify-content-between align-items-baseline mb-2">
              <span className="text-secondary">Shipping Charge</span>
              <span className="text-success fw-bold">FREE</span>
            </div>

            <div className="d-flex justify-content-between align-items-baseline mb-3">
              <span className="fw-bold text-white fs-5">Total Payable</span>
              <span className="display-6 fw-bold text-success">₹{totalPrice?.toLocaleString()}</span>
            </div>

            <div className="p-3 rounded-3 bg-dark bg-opacity-40 border border-secondary border-opacity-25">
              <div className="d-flex align-items-center gap-2 text-cyan small mb-1">
                <CheckIcon size={16} /> 100% Encrypted Payment
              </div>
              <p className="small text-secondary mb-0">
                Supports Razorpay, UPI, Credit/Debit Cards, Net Banking, and Wallet payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;