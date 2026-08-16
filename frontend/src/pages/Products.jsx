import { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { SearchIcon, FilterIcon } from "../components/Icons";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        setProducts(data);
      } catch (error) {
        console.log("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categoriesList = ["All", "Mobile", "Electronics", "Shoes"];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category?.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <div className="container py-4">
      {/* Header Banner */}
      <div className="glass-card p-5 text-center mb-4 prism-edge rounded-5">
        <span className="eyebrow">PREMIUM CATALOG</span>
        <h1 className="display-4 fw-bold mb-2">Explore All Products</h1>
        <p className="lead text-secondary max-w-lg mx-auto">
          Discover original gadgets, apparel, and footwear with instant express delivery.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card p-3 mb-4 rounded-4 prism-edge">
        <div className="row g-3 align-items-center">
          {/* Category Chips */}
          <div className="col-lg-6 col-md-12 d-flex flex-wrap gap-2 align-items-center">
            <span className="text-secondary small fw-bold d-flex align-items-center gap-1 me-1">
              <FilterIcon size={16} /> Filter:
            </span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm rounded-pill px-3 py-1.5 transition-all ${
                  category === cat
                    ? "btn-primary shadow"
                    : "btn-outline-light text-secondary border-secondary"
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box & Sort */}
          <div className="col-lg-6 col-md-12 d-flex gap-2">
            <div className="position-relative flex-grow-1">
              <input
                type="text"
                className="form-control rounded-pill ps-5 pe-4"
                placeholder="Search products by name or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon
                size={18}
                className="position-absolute text-secondary"
                style={{ left: "16px", top: "50%", transform: "translateY(-50%)" }}
              />
              {search && (
                <button
                  className="btn btn-sm btn-link text-secondary text-decoration-none position-absolute"
                  style={{ right: "12px", top: "50%", transform: "translateY(-50%)" }}
                  onClick={() => setSearch("")}
                >
                  ✕
                </button>
              )}
            </div>

            <select
              className="form-select rounded-pill w-auto px-3"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort By: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-secondary mb-0 small">
          Showing <span className="text-white fw-bold">{filteredProducts.length}</span> products
        </p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="glass-card text-center py-5 my-4 rounded-4 prism-edge">
          <div className="icon-tile mx-auto mb-3" style={{ width: "64px", height: "64px" }}>
            🔍
          </div>
          <h4 className="fw-bold">No Products Found</h4>
          <p className="text-secondary mb-3">Try checking your spelling or clearing search filters.</p>
          <button
            className="btn btn-outline-light rounded-pill px-4"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;