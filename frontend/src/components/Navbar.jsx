import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ShoppingBagIcon, HeartIcon, UserIcon, LogOutIcon, SparklesIcon, PlusIcon } from "./Icons";

function Navbar() {
  const navigate = useNavigate();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky-top py-3" style={{ zIndex: 1050 }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg px-3 py-2" style={{
          background: "rgba(20, 18, 31, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--edge)",
          borderRadius: "var(--radius-pill)",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)"
        }}>
          {/* Brand Logo */}
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold me-4" to="/">
            <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
              width: "36px",
              height: "36px",
              background: "var(--prism-gradient)"
            }}>
              <SparklesIcon size={20} className="text-dark" />
            </div>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.35rem",
              letterSpacing: "-0.02em",
              background: "var(--prism-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              ShopSphere
            </span>
          </Link>

          {/* Toggle for mobile */}
          <button
            className="navbar-toggler border-0 shadow-none text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navContent"
            aria-controls="navContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navContent">
            {/* Center links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1 align-items-lg-center">
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 rounded-pill fw-medium transition-all ${
                      isActive ? "bg-primary text-dark fw-bold" : "text-light hover-glow"
                    }`
                  }
                >
                  Explore Products
                </NavLink>
              </li>

              {(user?.role === "admin" || user?.isAdmin) && (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/add-product"
                      className={({ isActive }) =>
                        `nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-1 ${
                          isActive ? "bg-primary text-dark fw-bold" : "text-light"
                        }`
                      }
                    >
                      <PlusIcon size={16} /> Add Product
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        `nav-link px-3 py-2 rounded-pill ${
                          isActive ? "bg-primary text-dark fw-bold" : "text-light"
                        }`
                      }
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Right icons & User profile */}
            <div className="d-flex align-items-center flex-wrap gap-2 mt-2 mt-lg-0">
              {/* Wishlist button */}
              <Link
                to="/wishlist"
                className="btn btn-outline-light rounded-pill position-relative d-flex align-items-center justify-content-center p-2"
                style={{ width: "42px", height: "42px" }}
                title="Wishlist"
              >
                <HeartIcon size={18} />
                {wishlist.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart button */}
              <Link
                to="/cart"
                className="btn btn-primary rounded-pill d-flex align-items-center gap-2 px-3 py-2"
                title="Shopping Cart"
              >
                <ShoppingBagIcon size={18} />
                <span className="fw-bold">{totalItems}</span>
              </Link>

              {/* User authentication menu */}
              {user ? (
                <div className="dropdown ms-lg-2">
                  <button
                    className="btn btn-accent rounded-pill dropdown-toggle d-flex align-items-center gap-2 px-3 py-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <UserIcon size={16} />
                    <span>{user.name}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg rounded-4 p-2 border border-secondary mt-2">
                    <li>
                      <Link className="dropdown-menu-item dropdown-item rounded-3 d-flex align-items-center gap-2 py-2" to="/profile">
                        <UserIcon size={16} /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-menu-item dropdown-item rounded-3 d-flex align-items-center gap-2 py-2" to="/orders">
                        <ShoppingBagIcon size={16} /> My Orders
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider border-secondary" /></li>
                    <li>
                      <button
                        className="dropdown-item rounded-3 text-danger d-flex align-items-center gap-2 py-2"
                        onClick={logoutHandler}
                      >
                        <LogOutIcon size={16} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2 ms-lg-2">
                  <NavLink to="/login" className="btn btn-outline-light rounded-pill px-3 py-2">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="btn btn-accent rounded-pill px-3 py-2">
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
