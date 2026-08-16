import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { TrashIcon, ShoppingBagIcon, ArrowRightIcon, PlusIcon } from "../components/Icons";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span className="eyebrow">CHECKOUT BAG</span>
          <h1 className="display-6 fw-bold mb-0">Shopping Cart</h1>
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
          <h3 className="fw-bold mb-2">Your Cart is Empty</h3>
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
                      <h5 className="fw-bold text-white mb-1 text-truncate">{item.name}</h5>
                      <span className="text-success fw-bold">₹{item.price?.toLocaleString()}</span>
                    </div>

                    <div className="col-md-3 col-6 d-flex align-items-center gap-2">
                      <div className="d-flex align-items-center rounded-pill bg-dark border border-secondary px-2 py-1">
                        <button
                          className="btn btn-sm btn-link text-white text-decoration-none p-1"
                          onClick={() => decreaseQty(item._id)}
                        >
                          -
                        </button>
                        <span className="fw-bold text-white px-2 small">{item.qty}</span>
                        <button
                          className="btn btn-sm btn-link text-white text-decoration-none p-1"
                          onClick={() => increaseQty(item._id)}
                        >
                          <PlusIcon size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="col-md-2 col-6 text-end">
                      <div className="fw-bold text-white mb-1">
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

          {/* Order Summary Side Panel */}
          <div className="col-lg-4">
            <div className="glass-card p-4 rounded-4 prism-edge sticky-top" style={{ top: "100px" }}>
              <h4 className="fw-bold mb-3 border-bottom border-secondary border-opacity-25 pb-3">
                Order Summary
              </h4>

              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-white fw-medium">₹{totalPrice?.toLocaleString()}</span>
              </div>

              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Estimated Delivery</span>
                <span className="text-success fw-medium">FREE</span>
              </div>

              <div className="d-flex justify-content-between mb-3 text-secondary">
                <span>Taxes &amp; Fees</span>
                <span className="text-white fw-medium">Included</span>
              </div>

              <hr className="border-secondary border-opacity-25" />

              <div className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fw-bold text-white fs-5">Total Amount</span>
                <span className="display-6 fw-bold text-success">
                  ₹{totalPrice?.toLocaleString()}
                </span>
              </div>

              <Link to="/checkout" className="btn btn-primary btn-lg w-100 rounded-pill shadow mb-2">
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