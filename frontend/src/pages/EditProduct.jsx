import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setName(data.name);
        setImage(data.image);
        setDescription(data.description);
        setCategory(data.category);
        setPrice(data.price);
        setCountInStock(data.countInStock);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);
  const submitHandler = async (e) => {e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`,{name,image,description,category,price,countInStock,});
      alert("Product Updated Successfully");
      navigate("/products");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  return (
    <div className="container mt-5">
      <h2>Edit Product</h2>
      <form onSubmit={submitHandler}>
        <input type="text" className="form-control mb-3" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)}/>

        <input type="text" className="form-control mb-3" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)}/>

        <textarea className="form-control mb-3" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>

        <input type="text" className="form-control mb-3" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}/>

        <input type="number" className="form-control mb-3" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>

        <input type="number" className="form-control mb-3" placeholder="Stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}/>
        <button className="btn btn-warning">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;