import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { TrashIcon, ShoppingBagIcon, ArrowRightIcon, PlusIcon, SparklesIcon, TagIcon } from "../components/Icons";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    subtotal,
    discountAmount,
    totalPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput("");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span className="eyebrow">CHECKOUT BAG</span>
          <h1 className="display-6 fw-bold mb-0 text-dark">Shopping Cart</h1>
        </div>
        <span className="badge bg-primary fs-6 px-3 py-2">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="glass-card text-center py-5 rounded-4 prism-edge">
          <div className="icon-tile mx-auto mb-3" style={{ width: "72px", height: "72px" }}>
            <ShoppingBagIcon size={36} className="text-secondary" />
          </div>
          <h3 className="fw-bold mb-2 text-dark">Your Cart is Empty</h3>
          <p className="text-secondary mb-4">Looks like you haven't added any items to your bag yet.</p>
          <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5">
            Explore Products <ArrowRightIcon size={18} className="ms-1" />
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart Items List */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div key={item._id} className="glass-card p-3 rounded-4 prism-edge">
                  <div className="row align-items-center g-3">
                    <div className="col-md-2 col-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded-3"
                        style={{ height: "90px", width: "100%", objectFit: "cover" }}
                      />
                    </div>

                    <div className="col-md-5 col-8">
                      <span className="badge bg-primary mb-1">{item.category || "General"}</span>
                      <h5 className="fw-bold text-dark mb-1 text-truncate">{item.name}</h5>
                      <span className="text-success fw-bold">₹{item.price?.toLocaleString()}</span>
                    </div>

                    <div className="col-md-3 col-6 d-flex align-items-center gap-2">
                      <div className="d-flex align-items-center rounded-pill bg-light border border-light px-2 py-1">
                        <button
                          className="btn btn-sm btn-link text-dark text-decoration-none p-1"
                          onClick={() => decreaseQty(item._id)}
                        >
                          -
                        </button>
                        <span className="fw-bold text-dark px-2 small">{item.qty}</span>
                        <button
                          className="btn btn-sm btn-link text-dark text-decoration-none p-1"
                          onClick={() => increaseQty(item._id)}
                        >
                          <PlusIcon size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="col-md-2 col-6 text-end">
                      <div className="fw-bold text-dark mb-1">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger border-0 p-1"
                        onClick={() => removeFromCart(item._id)}
                        title="Remove Item"
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Coupon Panel */}
          <div className="col-lg-4">
            <div className="glass-card p-4 rounded-4 prism-edge sticky-top" style={{ top: "100px" }}>
              <h4 className="fw-bold mb-3 border-bottom border-light pb-3 text-dark">
                Order Summary
              </h4>

              {/* Promo Coupon Box */}
              <div className="p-3 rounded-4 bg-light border border-light mb-4">
                <span className="fw-bold text-dark small d-flex align-items-center gap-1 mb-2">
                  <SparklesIcon size={16} className="text-primary" /> Apply Promo Code
                </span>
                
                {appliedCoupon ? (
                  <div className="d-flex align-items-center justify-content-between bg-success bg-opacity-10 border border-success border-opacity-25 rounded-pill px-3 py-2">
                    <div className="d-flex align-items-center gap-2">
                      <TagIcon size={16} className="text-success" />
                      <div>
                        <span className="fw-bold text-success font-monospace me-1">{appliedCoupon.code}</span>
                        <small className="text-secondary">({appliedCoupon.label})</small>
                      </div>
                    </div>
                    <button className="btn btn-sm text-danger fw-bold p-0 ms-2" onClick={removeCoupon}>
                      ✕
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control rounded-pill form-control-sm text-uppercase"
                      placeholder="e.g. WELCOME10, FESTIVE20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-sm btn-primary rounded-pill px-3 fw-bold">
                      Apply
                    </button>
                  </form>
                )}
                
                <div className="mt-2 d-flex flex-wrap gap-1">
                  <span
                    className="badge bg-secondary bg-opacity-25 text-dark border border-secondary border-opacity-25 cursor-pointer"
                    style={{ fontSize: "0.7rem", cursor: "pointer" }}
                    onClick={() => applyCoupon("WELCOME10")}
                  >
                    WELCOME10 (-10%)
                  </span>
                  <span
                    className="badge bg-secondary bg-opacity-25 text-dark border border-secondary border-opacity-25 cursor-pointer"
                    style={{ fontSize: "0.7rem", cursor: "pointer" }}
                    onClick={() => applyCoupon("SHOP500")}
                  >
                    SHOP500 (-₹500)
                  </span>
                  <span
                    className="badge bg-secondary bg-opacity-25 text-dark border border-secondary border-opacity-25 cursor-pointer"
                    style={{ fontSize: "0.7rem", cursor: "pointer" }}
                    onClick={() => applyCoupon("FESTIVE20")}
                  >
                    FESTIVE20 (-20%)
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-dark fw-medium">₹{subtotal?.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Promo Discount Savings</span>
                  <span className="fw-bold">-₹{discountAmount?.toLocaleString()}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Estimated Shipping</span>
                <span className="text-success fw-medium">FREE</span>
              </div>

              <div className="d-flex justify-content-between mb-3 text-secondary">
                <span>Taxes &amp; Fees</span>
                <span className="text-dark fw-medium">Included</span>
              </div>

              <hr className="border-light" />

              <div className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fw-bold text-dark fs-5">Total Amount</span>
                <span className="display-6 fw-bold text-success">
                  ₹{totalPrice?.toLocaleString()}
                </span>
              </div>

              <Link to="/checkout" className="btn btn-accent btn-lg w-100 rounded-pill shadow mb-2">
                Proceed To Checkout <ArrowRightIcon size={18} className="ms-1" />
              </Link>

              <p className="small text-secondary text-center mb-0 mt-3">
                🔒 Guaranteed safe 256-bit SSL Checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;