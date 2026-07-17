import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const navClass = ({ isActive }) =>
    "btn btn-outline-light" + (isActive ? " nav-active" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2">
        <Link className="navbar-brand fw-bold" to="/">
          ShopSphere
        </Link>
        <div className="d-flex flex-wrap gap-2">
          <NavLink className={navClass} to="/products">
            Products
          </NavLink>
          <NavLink className={navClass} to="/add-product">
            Add Product
          </NavLink>
          <NavLink className={navClass} to="/admin">
            Admin
          </NavLink>
          <NavLink className={navClass} to="/cart">
            Cart ({totalItems})
          </NavLink>
          <NavLink className={navClass} to="/wishlist">
            Wishlist ({wishlist.length})
          </NavLink>
          {user ? (
            <>
              <NavLink className={navClass} to="/orders">
                Orders
              </NavLink>
              <NavLink className="btn btn-accent fw-bold" to="/profile">
                {user.name}
              </NavLink>
              <button className="btn btn-danger" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className={navClass} to="/login">
                Login
              </NavLink>
              <NavLink className="btn btn-accent" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
