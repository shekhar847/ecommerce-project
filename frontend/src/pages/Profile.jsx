import { Link } from "react-router-dom";
import { UserIcon, ShoppingBagIcon, HeartIcon, LogOutIcon, ArrowRightIcon } from "../components/Icons";

function Profile() {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="glass-card p-5 rounded-5 prism-edge max-w-md mx-auto">
          <div className="icon-tile mx-auto mb-3" style={{ width: "64px", height: "64px" }}>
            <UserIcon size={32} />
          </div>
          <h3 className="fw-bold mb-2">Account Login Required</h3>
          <p className="text-secondary mb-4">Please log in to view your profile &amp; order history.</p>
          <Link to="/login" className="btn btn-primary btn-lg rounded-pill px-5">
            Sign In Now <ArrowRightIcon size={18} className="ms-1" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="glass-card p-4 p-md-5 rounded-5 prism-edge max-w-lg mx-auto shadow-lg">
        <div className="text-center mb-4">
          <div
            className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3 shadow"
            style={{ width: "80px", height: "80px", background: "var(--prism-gradient)" }}
          >
            <UserIcon size={40} className="text-dark" />
          </div>
          <h2 className="fw-bold text-white mb-1">{user.name}</h2>
          <span className="badge bg-primary px-3 py-1 fs-6">
            {user.role === "admin" || user.isAdmin ? "VIP Administrator" : "Registered Customer"}
          </span>
        </div>

        <div className="p-4 rounded-4 bg-dark bg-opacity-40 border border-secondary border-opacity-25 mb-4">
          <div className="mb-3">
            <span className="text-secondary small d-block">Full Name</span>
            <span className="fw-bold text-white fs-5">{user.name}</span>
          </div>

          <div>
            <span className="text-secondary small d-block">Email Address</span>
            <span className="fw-bold text-cyan font-monospace">{user.email}</span>
          </div>
        </div>

        {/* Quick Action Links */}
        <div className="d-flex flex-column gap-2 mb-4">
          <Link to="/orders" className="btn btn-outline-light rounded-pill d-flex align-items-center justify-content-between p-3">
            <span className="d-flex align-items-center gap-2">
              <ShoppingBagIcon size={18} className="text-cyan" /> My Orders History
            </span>
            <ArrowRightIcon size={16} />
          </Link>

          <Link to="/wishlist" className="btn btn-outline-light rounded-pill d-flex align-items-center justify-content-between p-3">
            <span className="d-flex align-items-center gap-2">
              <HeartIcon size={18} className="text-pink" /> Saved Wishlist
            </span>
            <ArrowRightIcon size={16} />
          </Link>
        </div>

        <button
          className="btn btn-outline-danger w-100 rounded-pill py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
          onClick={logoutHandler}
        >
          <LogOutIcon size={18} /> Logout Account
        </button>
      </div>
    </div>
  );
}

export default Profile;