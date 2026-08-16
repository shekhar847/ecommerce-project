import { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { SearchIcon, FilterIcon } from "../components/Icons";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [inStockOnly, setInStockOnly] = useState(false);

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

  // Filter products by category, search term, max price, & stock availability
  const filteredProducts = products.filter((p) => {
    const matchesCategory = category === "All" || p.category?.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = (p.price || 0) <= maxPrice;
    const matchesStock = !inStockOnly || p.countInStock > 0;

    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="text-center mb-4">
        <span className="eyebrow">PREMIUM CATALOG</span>
        <h1 className="display-4 fw-bold mb-2">Explore All Products</h1>
        <p className="lead text-secondary max-w-lg mx-auto">
          Discover original gadgets, apparel, and footwear with instant express delivery.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card p-4 mb-4 rounded-4 prism-edge">
        <div className="row g-3 align-items-center mb-3">
          {/* Category Chips */}
          <div className="col-lg-6 col-md-12 d-flex flex-wrap gap-2 align-items-center">
            <span className="text-secondary small fw-bold d-flex align-items-center gap-1 me-1">
              <FilterIcon size={16} /> Category:
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
          <div className="col-lg-6 col-md-12 d-flex gap-2 align-items-center">
            <div className="position-relative flex-grow-1 d-flex align-items-center">
              <SearchIcon
                size={18}
                className="position-absolute text-secondary ms-3"
                style={{ left: "0", zIndex: 5, pointerEvents: "none" }}
              />
              <input
                type="text"
                className="form-control rounded-pill ps-5 pe-4 w-100"
                placeholder="Search products by name or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className="btn btn-sm btn-link text-secondary text-decoration-none position-absolute me-2"
                  style={{ right: "0", zIndex: 5 }}
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

        {/* Secondary Filter Row: Price Slider & In Stock Checkbox */}
        <div className="row g-3 align-items-center pt-3 border-top border-light">
          <div className="col-md-6 d-flex align-items-center gap-3">
            <label className="form-label mb-0 small text-secondary fw-bold text-nowrap">
              Max Price: <span className="text-success fw-bold">₹{maxPrice.toLocaleString()}</span>
            </label>
            <input
              type="range"
              className="form-range"
              min="500"
              max="200000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <div className="col-md-6 d-flex justify-content-md-end align-items-center gap-3">
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                id="inStockCheck"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <label className="form-check-input-label small fw-bold text-dark" htmlFor="inStockCheck">
                In Stock Items Only
              </label>
            </div>

            {(category !== "All" || search || maxPrice < 200000 || inStockOnly) && (
              <button
                className="btn btn-sm btn-link text-danger text-decoration-none p-0 fw-bold"
                onClick={() => {
                  setCategory("All");
                  setSearch("");
                  setMaxPrice(200000);
                  setInStockOnly(false);
                  setSortBy("default");
                }}
              >
                Reset Filters ↺
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <p className="text-secondary mb-0">
          Showing <span className="fw-bold text-dark">{sortedProducts.length}</span> of {products.length} products
        </p>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
          <p className="mt-3 text-secondary">Loading catalog products...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="alert alert-info text-center rounded-4 py-5">
          <h4 className="fw-bold mb-2">No Matching Products Found</h4>
          <p className="mb-0 text-secondary">Try adjusting your search filters or resetting price range.</p>
        </div>
      ) : (
        <div className="row g-4">
          {sortedProducts.map((product) => (
            <div className="col-lg-3 col-md-6" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;