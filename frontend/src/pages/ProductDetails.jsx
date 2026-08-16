import { useWishlist } from "../context/WishlistContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../config";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { StarIcon, HeartIcon, ShoppingBagIcon, TruckIcon, ShieldCheckIcon, SparklesIcon, CheckIcon } from "../components/Icons";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(`${API_URL}/api/products/${id}`);
        const productsRes = await axios.get(`${API_URL}/api/products`);
        setProduct(productRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.log("Error loading product details:", error);
      }
    };
    fetchData();
  }, [id]);

  const submitReview = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.error("Please login to write a review");
        return;
      }
      if (!comment.trim()) {
        toast.warning("Please enter your review text");
        return;
      }
      await axios.post(`${API_URL}/api/products/${id}/reviews`, {
        user: user.name,
        rating: Number(rating),
        comment,
      });
      toast.success("Review Added Successfully ⭐");
      setComment("");
      setRating(5);
      
      // Refresh details
      const res = await axios.get(`${API_URL}/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
        <p className="mt-3 text-secondary">Loading product details...</p>
      </div>
    );
  }

  const isWishlisted = wishlist?.some((item) => item._id === product._id);
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p._id !== product._id
  );
  const originalPrice = product.originalPrice || Math.floor(product.price * 1.25);

  return (
    <div className="container py-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/products" className="text-secondary text-decoration-none">Products</Link></li>
          <li className="breadcrumb-item active text-white" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      {/* Main Product Info Grid */}
      <div className="row g-4 mb-5">
        {/* Product Image */}
        <div className="col-lg-5">
          <div className="glass-card p-3 prism-edge h-100 d-flex align-items-center justify-content-center">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded-4 product-details-img shadow-lg"
            />
          </div>
        </div>

        {/* Product Details Column */}
        <div className="col-lg-7">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-primary px-3 py-1.5 fs-6">{product.category}</span>
            {product.countInStock > 0 ? (
              <span className="badge bg-success px-3 py-1.5 fs-6">In Stock</span>
            ) : (
              <span className="badge bg-danger px-3 py-1.5 fs-6">Out of Stock</span>
            )}
          </div>

          <h1 className="display-5 fw-bold mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <div className="d-flex text-warning">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={20}
                  fill={i < Math.round(product.rating || 5) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="fw-bold text-white ms-1">{product.rating || 5.0}</span>
            <span className="text-secondary">({product.numReviews || 0} customer reviews)</span>
          </div>

          {/* Pricing Box */}
          <div className="glass-card p-4 rounded-4 prism-edge mb-4">
            <div className="d-flex align-items-baseline gap-3 mb-1">
              <h2 className="text-success display-6 fw-bold mb-0">₹{product.price?.toLocaleString()}</h2>
              {originalPrice > product.price && (
                <h4 className="text-decoration-line-through text-secondary mb-0">
                  ₹{originalPrice.toLocaleString()}
                </h4>
              )}
              <span className="badge bg-danger px-2.5 py-1">20% OFF</span>
            </div>
            <p className="small text-secondary mb-0">Inclusive of all taxes. Free shipping on orders over ₹999.</p>
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <h5 className="fw-bold mb-2 text-white">Product Description</h5>
            <p className="text-secondary leading-relaxed">
              {product.description || "High performance luxury design crafted with premium quality materials. Engineered to deliver exceptional user satisfaction and durability."}
            </p>
          </div>

          {/* Quantity Selector */}
          {product.countInStock > 0 && (
            <div className="mb-4 d-flex align-items-center gap-3">
              <label className="form-label fw-bold text-white mb-0">Quantity:</label>
              <select
                className="form-select rounded-pill w-auto px-4 py-2"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1} {x === 0 ? "Unit" : "Units"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex gap-3 flex-wrap mb-4">
            <button
              className="btn btn-primary btn-lg rounded-pill px-4 d-flex align-items-center gap-2 shadow"
              disabled={product.countInStock <= 0}
              onClick={() => {
                addToCart({ ...product, qty });
                toast.success(`${qty} item(s) added to cart 🛒`);
              }}
            >
              <ShoppingBagIcon size={20} /> Add To Cart
            </button>

            <button
              className={`btn btn-lg rounded-pill px-4 d-flex align-items-center gap-2 ${
                isWishlisted ? "btn-danger" : "btn-outline-light"
              }`}
              onClick={() => {
                addToWishlist(product);
                toast.success(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist ❤️");
              }}
            >
              <HeartIcon size={20} fill={isWishlisted ? "currentColor" : "none"} />
              {isWishlisted ? "In Wishlist" : "Wishlist"}
            </button>

            <button
              className="btn btn-accent btn-lg rounded-pill px-4 fw-bold"
              onClick={() => {
                addToCart({ ...product, qty });
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>
          </div>

          {/* Delivery & Warranty Card */}
          <div className="glass-card p-4 rounded-4 prism-edge">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <TruckIcon size={22} className="text-cyan" /> Delivery &amp; Services
            </h5>
            <div className="row g-2">
              <div className="col-md-6 d-flex align-items-center gap-2 text-secondary small">
                <CheckIcon size={16} className="text-success" /> Express Delivery in 2-4 Days
              </div>
              <div className="col-md-6 d-flex align-items-center gap-2 text-secondary small">
                <CheckIcon size={16} className="text-success" /> Cash On Delivery Available
              </div>
              <div className="col-md-6 d-flex align-items-center gap-2 text-secondary small">
                <ShieldCheckIcon size={16} className="text-violet" /> 100% Original Brand Guarantee
              </div>
              <div className="col-md-6 d-flex align-items-center gap-2 text-secondary small">
                <SparklesIcon size={16} className="text-emerald" /> 7-Day Replacement Policy
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="glass-card p-5 rounded-4 prism-edge mb-5">
        <h3 className="fw-bold mb-4">Customer Reviews ({product.reviews?.length || 0})</h3>

        {/* Add Review Form */}
        <div className="p-4 rounded-4 bg-dark bg-opacity-50 border border-secondary border-opacity-25 mb-4">
          <h5 className="fw-bold mb-3 text-white">Write a Customer Review</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Rating</label>
              <select className="form-select rounded-pill" value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="5">5 ⭐⭐⭐⭐⭐ Exceptional</option>
                <option value="4">4 ⭐⭐⭐⭐ Very Good</option>
                <option value="3">3 ⭐⭐⭐ Good</option>
                <option value="2">2 ⭐⭐ Fair</option>
                <option value="1">1 ⭐ Poor</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">Review Comment</label>
              <textarea
                className="form-control rounded-4"
                rows="3"
                placeholder="Share details of your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="col-md-12 text-end">
              <button className="btn btn-primary rounded-pill px-4" onClick={submitReview}>
                Submit Review
              </button>
            </div>
          </div>
        </div>

        {/* Existing Reviews List */}
        {product.reviews?.length === 0 ? (
          <p className="text-secondary mb-0">No reviews yet. Be the first to share your feedback!</p>
        ) : (
          <div className="row g-3">
            {product.reviews.map((rev, idx) => (
              <div key={idx} className="col-md-6">
                <div className="p-3 rounded-4 bg-dark bg-opacity-30 border border-secondary border-opacity-25">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fw-bold text-white">{rev.user}</span>
                    <div className="d-flex text-warning">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <StarIcon key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-secondary mb-0 small">{rev.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="fw-bold mb-4">Related Products</h3>
          <div className="row g-4">
            {relatedProducts.slice(0, 4).map((item) => (
              <div key={item._id} className="col-lg-3 col-md-6">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;