import { Link } from "react-router-dom";
import { SparklesIcon, ShieldCheckIcon, TruckIcon, SupportIcon } from "./Icons";

function Footer() {
  return (
    <footer className="footer mt-5 pt-5 pb-4 border-top border-secondary border-opacity-25" style={{ background: "rgba(7, 6, 13, 0.8)" }}>
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand Col */}
          <div className="col-lg-4 text-start">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", background: "var(--prism-gradient)" }}>
                <SparklesIcon size={18} className="text-dark" />
              </div>
              <h4 className="fw-bold mb-0 text-white" style={{ fontFamily: "var(--font-display)" }}>
                ShopSphere
              </h4>
            </div>
            <p className="text-secondary small mb-3">
              Next-generation luxury e-commerce experience. Premium tech essentials, apparel, and footwear delivered to your doorstep.
            </p>
            <div className="d-flex gap-2">
              <span className="badge bg-primary">Razorpay Protected</span>
              <span className="badge bg-success">256-bit SSL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-6 text-start">
            <h6 className="fw-bold text-white mb-3">Quick Navigation</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li><Link to="/products" className="text-secondary text-decoration-none hover-glow">All Products</Link></li>
              <li><Link to="/cart" className="text-secondary text-decoration-none hover-glow">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="text-secondary text-decoration-none hover-glow">My Wishlist</Link></li>
              <li><Link to="/orders" className="text-secondary text-decoration-none hover-glow">Track Orders</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-3 col-6 text-start">
            <h6 className="fw-bold text-white mb-3">Popular Categories</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li><Link to="/products" className="text-secondary text-decoration-none hover-glow">Smartphones &amp; Mobiles</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-glow">Laptops &amp; Workstations</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-glow">Footwear &amp; Sneakers</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none hover-glow">Audio &amp; Wearables</Link></li>
            </ul>
          </div>

          {/* Customer Trust */}
          <div className="col-lg-2 text-start">
            <h6 className="fw-bold text-white mb-3">Guarantees</h6>
            <div className="d-flex flex-column gap-2 text-secondary small">
              <div className="d-flex align-items-center gap-1.5">
                <TruckIcon size={16} className="text-cyan" /> Free Shipping
              </div>
              <div className="d-flex align-items-center gap-1.5">
                <ShieldCheckIcon size={16} className="text-violet" /> 100% Genuine
              </div>
              <div className="d-flex align-items-center gap-1.5">
                <SupportIcon size={16} className="text-lime" /> 24/7 VIP Help
              </div>
            </div>
          </div>
        </div>

        <div className="border-top border-secondary border-opacity-25 pt-3 mt-4 text-center">
          <p className="text-secondary small mb-0">
            © 2026 ShopSphere. All rights reserved. Crafted with passion &amp; high precision.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
