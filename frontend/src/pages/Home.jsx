import { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner">
          <div className="carousel-item active position-relative">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" className="d-block w-100 banner-img" alt="Nike"/>
            <div className="carousel-caption">
              <span className="eyebrow">New Drop</span>
              <h1>Latest Nike Collection</h1>
              <p>Up to 50% OFF</p>
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="carousel-item position-relative">
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" className="d-block w-100 banner-img" alt="Phone"/>
            <div className="carousel-caption">
              <span className="eyebrow">Just In</span>
              <h1>Latest Smartphones</h1>
              <p>Best Deals Available</p>
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="carousel-item position-relative">
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853" className="d-block w-100 banner-img" alt="Laptop"/>
            <div className="carousel-caption">
              <span className="eyebrow">Power Up</span>
              <h1>Gaming &amp; Work Laptops</h1>
              <p>Premium Performance</p>
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* --------------------Features----------------------- */}
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="glass-card p-4">
              <div className="icon-tile">🚚</div>
              <h5>Fast Delivery</h5>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="glass-card p-4">
              <div className="icon-tile">💳</div>
              <h5>Secure Payments</h5>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="glass-card p-4">
              <div className="icon-tile">⭐</div>
              <h5>Top Rated Products</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="row text-center mt-5 g-4 mx-0">
        <div className="col-md-3 col-6">
          <div className="stat-number">500+</div>
          <p className="stat-label">Products</p>
        </div>
        <div className="col-md-3 col-6">
          <div className="stat-number">1000+</div>
          <p className="stat-label">Customers</p>
        </div>
        <div className="col-md-3 col-6">
          <div className="stat-number">99%</div>
          <p className="stat-label">Positive Reviews</p>
        </div>
        <div className="col-md-3 col-6">
          <div className="stat-number">24/7</div>
          <p className="stat-label">Support</p>
        </div>
      </div>

      {/* --------------------Features Products-------------- */}
      <div className="container mt-5">
        <div className="text-center">
          <span className="eyebrow">Handpicked</span>
        </div>
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {products.slice(0, 4).map((product) => (
            <div className="col-lg-3 col-md-6 mb-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/products" className="btn btn-primary btn-lg">
            View All Products
          </Link>
        </div>
      </div>

      {/* --------------------Latest Products---------------- */}
      <div className="container mt-5">
        <div className="text-center">
          <span className="eyebrow">Fresh Stock</span>
        </div>
        <h2 className="text-center mb-4">Latest Products</h2>
        <div className="row">
          {products.slice(4, 8).map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* --------------------Tranding Products-------------- */}
      <div className="container mt-5">
        <div className="text-center">
          <span className="eyebrow">Hot Right Now</span>
        </div>
        <h2 className="text-center mb-4">Trending Products</h2>
        <div className="row">
          {products.slice(8, 12).map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* --------------------Categories--------------------- */}
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">Shop By Category</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <Link to="/products" className="text-decoration-none">
              <div className="glass-card p-4">
                <div className="icon-tile" style={{ width: "72px", height: "72px", fontSize: "2rem" }}>📱</div>
                <h4>Mobiles</h4>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link to="/products" className="text-decoration-none">
              <div className="glass-card p-4">
                <div className="icon-tile" style={{ width: "72px", height: "72px", fontSize: "2rem" }}>💻</div>
                <h4>Electronics</h4>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link to="/products" className="text-decoration-none">
              <div className="glass-card p-4">
                <div className="icon-tile" style={{ width: "72px", height: "72px", fontSize: "2rem" }}>👟</div>
                <h4>Shoes</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
