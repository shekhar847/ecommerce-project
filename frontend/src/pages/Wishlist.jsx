import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { HeartIcon, ArrowRightIcon } from "../components/Icons";

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span className="eyebrow">SAVED ITEMS</span>
          <h1 className="display-6 fw-bold mb-0">My Wishlist</h1>
        </div>
        <span className="badge bg-danger fs-6 px-3 py-2">
          {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="glass-card text-center py-5 rounded-4 prism-edge">
          <div className="icon-tile mx-auto mb-3 text-pink" style={{ width: "72px", height: "72px" }}>
            <HeartIcon size={36} fill="currentColor" />
          </div>
          <h3 className="fw-bold mb-2">Your Wishlist is Empty</h3>
          <p className="text-secondary mb-4">Explore products and tap the heart icon to save your favorites here.</p>
          <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5">
            Discover Products <ArrowRightIcon size={18} className="ms-1" />
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {wishlist.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;