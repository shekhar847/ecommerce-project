import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const deleteHandler = async () => {
    try {
      await axios.delete(`${API_URL}/api/products/${product._id}`);
      toast.success("Product Deleted Successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="card border-0 product-card position-relative">
      {/* --------------------Sale Badge--------------------- */}
      <span
        className="badge bg-danger position-absolute"
        style={{ top: "10px", left: "10px", zIndex: 10 }}
      >
        SALE
      </span>

      {/* --------------------Wishlist Heart----------------- */}
      <div className="position-relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
          />
        </Link>
        <button
          className="btn btn-light position-absolute rounded-circle"
          style={{ top: "10px", right: "10px", zIndex: 10, width: "45px", height: "45px" }}
          onClick={() => {
            addToWishlist(product);
            toast.success("Added To Wishlist");
          }}
        >
          ♥
        </button>
      </div>
      <div className="card-body">
        <span className="badge bg-primary mb-2">{product.category}</span>
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <h5 className="fw-bold product-title">{product.name}</h5>
        </Link>
        <p className="rating-text mb-1">
          ★ {product.rating || 0}
          <span className="reviews-text ms-2">({product.numReviews || 0} Reviews)</span>
        </p>
        <div className="d-flex align-items-baseline gap-2 mt-2">
          <h4 className="text-success fw-bold mb-0">₹ {product.price}</h4>
          <small className="text-decoration-line-through text-secondary">
            ₹ {Math.floor(product.price * 1.2)}
          </small>
          <span className="badge bg-success">20% OFF</span>
        </div>
        <p className="mt-2 mb-1">
          {product.countInStock > 0 ? (
            <span className="badge bg-success">In Stock</span>
          ) : (
            <span className="badge bg-danger">Out Of Stock</span>
          )}
        </p>
        <button
          className="btn btn-primary w-100 mt-2"
          disabled={product.countInStock <= 0}
          onClick={() => {
            addToCart(product);
            toast.success("Added To Cart");
          }}
        >
          {product.countInStock > 0 ? "Add To Cart" : "Out Of Stock"}
        </button>
        <Link to={`/edit-product/${product._id}`} className="btn btn-warning w-100 mt-2">
          Edit Product
        </Link>
        <button className="btn btn-danger w-100 mt-2" onClick={deleteHandler}>
          Delete Product
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
