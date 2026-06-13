import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice,} = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart 🛒</h2>
      {cart.length === 0 ? (
        <h4>Cart is Empty</h4>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="card bg-dark text-white border-0 shadow-lg mb-3 p-3">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <img src={item.image} alt={item.name} className="img-fluid rounded" style={{height: "120px", width: "100%", objectFit: "cover",}}/>
                </div>
                <div className="col-md-9">
                  <h5>{item.name}</h5>
                  <p>
                    Price: ₹ {item.price}
                  </p>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <button className="btn btn-secondary" onClick={() => decreaseQty(item._id)}>
                      -
                    </button>
                    <span>
                      Qty: {item.qty}
                    </span>
                    <button className="btn btn-secondary" onClick={() => increaseQty(item._id)}>
                      +
                    </button>
                  </div>
                  <p>
                    Subtotal: ₹ {item.price * item.qty}
                  </p>
                  <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="card bg-dark text-white border-0 shadow-lg p-4 mt-4">
            <h4>
              Total Items: {totalItems}
            </h4>
            <h3 className="text-success">
              Grand Total: ₹ {totalPrice}
            </h3>
            <Link to="/checkout" className="btn btn-success mt-3">
              Proceed To Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;