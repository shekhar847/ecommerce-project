import { useWishlist } from "../context/WishlistContext";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(`http://localhost:5000/api/products/${id}`);
        const productsRes = await axios.get("http://localhost:5000/api/products");
        setProduct(productRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  const submitReview = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.error("Please Login First");
        return;
      }
      if (!comment.trim()) {
        toast.warning("Please Enter Review");
        return;
      }
      await axios.post(`http://localhost:5000/api/products/${id}/reviews`,
        {
          user: user.name,
          rating,
          comment,
        }
      );
      toast.success("Review Added Successfully ⭐");
      setComment("");
      setRating(5);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  if (!product) {
    return (
      <div className="container mt-5">
        Loading...
      </div>
    );
  }
  const relatedProducts = products.filter((p) => p.category === product.category && p._id !== product._id);
  return (
    <div className="container mt-5">
      <div className="row">
        {/* --------------------Product Image-------------- */}
        <div className="col-md-5">
          <div className="card product-details-card">
            <img src={product.image} alt={product.name} className="img-fluid rounded product-details-img" />
          </div>
        </div>

        {/* --------------------Product Info-------------- */}
        <div className="col-md-7">
          <span className="badge bg-primary mb-2">
            {product.category}
          </span>
          <h1 className="fw-bold">
            {product.name}
          </h1>
          <p className="fs-5">
            <span className="text-warning">
              ⭐⭐⭐⭐⭐
            </span>
            <span className="ms-2">
              {product.rating}
            </span>
            <span className="text-secondary ms-2">
              ({product.numReviews} Reviews)
            </span>
          </p>
          <h2 className="text-success fw-bold">
            ₹ {product.price}
          </h2>
          <h5 className="text-decoration-line-through text-secondary">
            ₹ {product.price + 3000}
          </h5>
          <span className="badge bg-danger">
            20% OFF
          </span>
          <p className="mt-3">
            {product.countInStock > 0 ? (
              <span className="badge bg-success">
                In Stock
              </span>
            ) : (
              <span className="badge bg-danger">
                Out Of Stock
              </span>
            )}
          </p>
          <hr />
          <h5>Description</h5>
          <p className="text-light">
            {product.description}
          </p>
          {product.countInStock > 0 && (
            <div className="mb-4">
              <label className="form-label fw-bold">
                Quantity
              </label>
              <select className="form-select bg-dark text-white border-secondary" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                {[...Array(product.countInStock).keys()].map(
                  (x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  )
                )}
              </select>
            </div>
          )}
          {/* --------------------Buttons----------------- */}
          <div className="d-flex gap-2 flex-wrap mt-4 mb-4">
            <button className="btn btn-success btn-lg" onClick={() => { addToCart({ ...product, qty, }); toast.success(`${qty} Item Added To Cart 🛒`); }}>
              🛒 Add To Cart
            </button>
            <button className="btn btn-danger btn-lg" onClick={() => { addToWishlist(product); toast.success("Added To Wishlist ❤️"); }}>
              ❤️ Wishlist
            </button>
            <Link to="/checkout" className="btn btn-warning btn-lg" onClick={() => toast.success("Proceeding To Checkout ")}>
              Buy Now
            </Link>
          </div>
          {/* --------------------Specifications----------- */}
          <div className="card bg-dark border-0 p-3 mt-4">
            <h5 className="mb-3">
              Product Specifications
            </h5>
            <table className="table table-dark table-bordered">
              <tbody>
                <tr>
                  <td>Category</td>
                  <td>{product.category}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>{product.rating} ⭐</td>
                </tr>
                <tr>
                  <td>Reviews</td>
                  <td>{product.numReviews}</td>
                </tr>
                <tr>
                  <td>Stock</td>
                  <td>{product.countInStock}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* --------------------Delivery Card-------------- */}
          <div className="card border-success p-3 mt-4" style={{ background: "#14532d", color: "white", }}>
            <h5 className="text-white">
              🚚 Delivery Information
            </h5>
            <p className="mb-1">
              Free Delivery Available
            </p>
            <p className="mb-1">
              Cash On Delivery Supported
            </p>
            <p className="mb-0">
              Estimated Delivery: 2-5 Days
            </p>
          </div>
        </div>
      </div>
      {/* --------------------Reviews Section--------------- */}
      <hr className="my-5" />
      <h3>Add Review</h3>
      <select className="form-select mb-2" value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
      <textarea className="form-control mb-2" placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)} />
      <button className="btn btn-success" onClick={submitReview}>
        Submit Review
      </button>
      <div className="mt-4">
        <span className="badge bg-success me-2">
          Secure Payment
        </span>
        <span className="badge bg-primary me-2">
          Fast Delivery
        </span>
        <span className="badge bg-warning text-dark">
          Easy Returns
        </span>
      </div>
      <hr />
      <h3 className="mb-4">
        ⭐ Customer Reviews
      </h3>
      {product.reviews?.length === 0 ? (
        <p>No Reviews Yet</p>
      ) : (
        product.reviews.map((review, index) => (
          <div key={index} className="card glass-card p-3 mb-3">
            <h5>{review.user}</h5>
            <p>⭐ {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
      {/* --------------------Related Products------------ */}
      <hr className="my-5" />
      <h2 className="text-center fw-bold mb-5">
        Related Products
      </h2>
      <div className="row">
        {relatedProducts.length === 0 ? (
          <p className="text-center">
            No Related Products Found
          </p>
        ) : (
          relatedProducts.slice(0, 4).map((item) => (
            <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <ProductCard product={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductDetails;