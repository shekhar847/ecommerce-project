import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { HeartIcon, ShoppingBagIcon, StarIcon, EditIcon, TrashIcon } from "./Icons";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();
  
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const isWishlisted = wishlist?.some((item) => item._id === product._id);
  const isAdmin = user?.role === "admin" || user?.isAdmin;

  const deleteHandler = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;
    try {
      await axios.delete(`${API_URL}/api/products/${product._id}`);
      toast.success("Product Deleted Successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const originalPrice = product.originalPrice || Math.floor(product.price * 1.25);
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="card border-0 product-card prism-edge h-100 position-relative d-flex flex-column">
      {/* -------------------- Badges & Wishlist --------------------- */}
      <div className="position-relative overflow-hidden" style={{ borderRadius: "var(--radius) var(--radius) 0 0" }}>
        {discountPercent > 0 && (
          <span className="badge bg-danger position-absolute" style={{ top: "12px", left: "12px", zIndex: 10 }}>
            -{discountPercent}% OFF
          </span>
        )}

        <button
          className={`btn position-absolute rounded-circle d-flex align-items-center justify-content-center ${
            isWishlisted ? "btn-danger" : "btn-light"
          }`}
          style={{
            top: "12px",
            right: "12px",
            zIndex: 10,
            width: "38px",
            height: "38px",
            padding: 0,
            boxShadow: "0 4px 14px rgba(0,0,0,0.3)"
          }}
          title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
            toast.success(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist");
          }}
        >
          <HeartIcon size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <Link to={`/product/${product._id}`} className="d-block text-decoration-none">
          <img
            src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"}
            alt={product.name}
            className="card-img-top"
            loading="lazy"
          />
        </Link>
      </div>

      {/* -------------------- Card Body --------------------- */}
      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="badge bg-primary">{product.category || "General"}</span>
          <div className="d-flex align-items-center gap-1 rating-text" style={{ fontSize: "0.85rem" }}>
            <StarIcon size={14} />
            <span>{product.rating || "4.5"}</span>
            <span className="reviews-text">({product.numReviews || 0})</span>
          </div>
        </div>

        <Link to={`/product/${product._id}`} className="text-decoration-none mb-2">
          <h5 className="fw-bold product-title mb-1 text-truncate" title={product.name}>
            {product.name}
          </h5>
        </Link>

        {/* Pricing */}
        <div className="d-flex align-items-baseline gap-2 mt-auto mb-2">
          <h4 className="text-success fw-bold mb-0">₹{product.price?.toLocaleString()}</h4>
          {originalPrice > product.price && (
            <small className="text-decoration-line-through text-secondary">
              ₹{originalPrice.toLocaleString()}
            </small>
          )}
        </div>

        {/* Stock status indicator */}
        <div className="mb-3">
          {product.countInStock > 0 ? (
            <span className="badge bg-success">In Stock</span>
          ) : (
            <span className="badge bg-danger">Out of Stock</span>
          )}
        </div>

        {/* Action Button */}
        <button
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
          disabled={product.countInStock <= 0}
          onClick={() => {
            addToCart(product);
            toast.success("Added to Cart 🛒");
          }}
        >
          <ShoppingBagIcon size={18} />
          <span>{product.countInStock > 0 ? "Add To Cart" : "Out Of Stock"}</span>
        </button>

        {/* Admin controls - shown only to admin users */}
        {isAdmin && (
          <div className="d-flex gap-2 mt-2 pt-2 border-top border-secondary border-opacity-25">
            <Link
              to={`/edit-product/${product._id}`}
              className="btn btn-sm btn-outline-light w-50 d-flex align-items-center justify-content-center gap-1"
            >
              <EditIcon size={14} />
              Edit
            </Link>
            <button
              className="btn btn-sm btn-outline-danger w-50 d-flex align-items-center justify-content-center gap-1"
              onClick={deleteHandler}
            >
              <TrashIcon size={14} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
