import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const totalItems = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-lg" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          ⚡ ShopSphere
        </Link>
        <div className="d-flex flex-wrap gap-2">
          <Link className="btn btn-outline-light" to="/products">
            Products
          </Link>
          <Link className="btn btn-outline-light" to="/add-product">
            Add Product
          </Link>
          <Link className="btn btn-outline-light" to="/admin">
            Admin
          </Link>
          <Link className="btn btn-outline-light" to="/cart">
            🛒 Cart ({totalItems})
          </Link>
          <Link className="btn btn-outline-light" to="/wishlist">
            ❤️ Wishlist ({wishlist.length})
          </Link>
          {user ? (
            <>
              <Link className="btn btn-outline-light" to="/orders">
                Orders
              </Link>
              <Link className="btn btn-light fw-bold" to="/profile">
                👤 {user.name}
              </Link>
              <button className="btn btn-danger" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>
              <Link className="btn btn-light" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
