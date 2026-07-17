import { useState } from "react";
import { API_URL } from "../config";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const submitHandler = async (e) => {e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/api/products`,
        {
          name,
          image,
          description,
          category,
          price,
          countInStock,
        }
      );
      alert("Product Added Successfully");
      setName("");
      setImage("");
      setDescription("");
      setCategory("");
      setPrice("");
      setCountInStock("");
      console.log(data);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={submitHandler}>
        <input type="text" className="form-control mb-3" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" className="form-control mb-3" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)}/>
        <textarea className="form-control mb-3" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <input type="text" className="form-control mb-3" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}/>
        <input type="number" className="form-control mb-3" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <input type="number" className="form-control mb-3" placeholder="Stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}/>
        <button className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;