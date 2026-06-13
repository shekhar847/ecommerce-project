import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(search.toLowerCase()) && (category === "All" || product.category === category)
  );
  return (
    <div className="container mt-4">
      <div className="hero-section p-5 text-center mb-5 shadow">
        <h1 className="display-4 fw-bold">
          ShopSphere
        </h1>
        <p className="lead">
          Premium Shopping Experience
        </p>
      </div>
      <h2 className="text-center mb-4">
        Our Products
      </h2>
      <div className="row mb-4">
        <div className="col-md-8 mb-2">
          <input type="text" className="form-control" placeholder="🔍 Search Products..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className="col-md-4">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All"> All Categories</option>
            <option value="Mobile"> Mobile</option>
            <option value="Electronics"> Electronics</option>
            <option value="Shoes"> Shoes</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="alert alert-warning text-center">
          No Products Found
        </div>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Products;