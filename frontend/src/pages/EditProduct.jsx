import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { EditIcon } from "../components/Icons";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products/${id}`);
        setName(data.name || "");
        setImage(data.image || "");
        setDescription(data.description || "");
        setCategory(data.category || "Electronics");
        setPrice(data.price || "");
        setCountInStock(data.countInStock || "");
      } catch (error) {
        console.log("Error loading product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/products/${id}`, {
        name,
        image,
        description,
        category,
        price: Number(price),
        countInStock: Number(countInStock),
      });
      toast.success("Product Details Updated! ✏️");
      navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="glass-card p-4 p-md-5 rounded-5 prism-edge max-w-lg mx-auto shadow-lg">
        <div className="text-center mb-4">
          <span className="eyebrow">INVENTORY MANAGER</span>
          <h2 className="fw-bold text-white mb-1">Edit Product</h2>
          <p className="text-secondary small">Update details, pricing, and stock levels</p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Category</label>
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
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                className="form-control rounded-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Stock Quantity</label>
              <input
                type="number"
                className="form-control rounded-3"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning btn-lg w-100 rounded-pill fw-bold shadow py-3 d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <>
                <EditIcon size={20} /> Update Product Details
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;