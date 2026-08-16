import { useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PlusIcon, ArrowRightIcon } from "../components/Icons";

function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !price || !countInStock) {
      toast.warning("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/products`, {
        name,
        image: image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        description,
        category,
        price: Number(price),
        countInStock: Number(countInStock),
      });
      toast.success("Product Created Successfully! 🎉");
      navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="glass-card p-4 p-md-5 rounded-5 prism-edge max-w-lg mx-auto shadow-lg" style={{ maxWidth: "560px" }}>
        <div className="text-center mb-4">
          <span className="eyebrow">ADMIN MANAGEMENT</span>
          <h2 className="fw-bold text-dark mb-1">Add New Product</h2>
          <p className="text-secondary small">Add a new item to your store inventory</p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Product Name *</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="e.g. Wireless Noise-Canceling Headphones"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Category *</label>
              <select
                className="form-select rounded-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Mobile">Mobile</option>
                <option value="Electronics">Electronics</option>
                <option value="Shoes">Shoes</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Price (₹) *</label>
              <input
                type="number"
                className="form-control rounded-3"
                placeholder="2999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Stock Quantity *</label>
              <input
                type="number"
                className="form-control rounded-3"
                placeholder="25"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="https://..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              className="form-control rounded-4"
              rows="4"
              placeholder="Provide a detailed description of the features..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow py-3 d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <>
                <PlusIcon size={20} /> Publish Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;