import { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { TruckIcon, ShieldCheckIcon, SparklesIcon, SupportIcon, ArrowRightIcon, SmartphoneIcon, LaptopIcon, FootwearIcon } from "../components/Icons";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        setProducts(data);
      } catch (error) {
        console.log("Error loading home products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pb-5">
      {/* -------------------- Hero Carousel Banner ----------------------- */}
      <div className="container mt-2 mb-5">
        <div id="heroCarousel" className="carousel slide carousel-fade shadow-lg rounded-5 overflow-hidden border border-secondary border-opacity-25" data-bs-ride="carousel" data-bs-interval="4000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active position-relative">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80"
                className="d-block w-100 banner-img"
                alt="Sneakers Drop"
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-center">
                <span className="eyebrow px-3 py-1 rounded-pill bg-dark bg-opacity-75 border border-cyan mb-2">🔥 NEW DROP 2026</span>
                <h1 className="display-3 fw-bolder text-white">Future Footwear &amp; Apparel</h1>
                <p className="lead mb-4 text-light opacity-90">Experience next-level comfort &amp; style with up to 50% OFF</p>
                <div className="d-flex gap-3">
                  <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-4 shadow">
                    Shop Collection <ArrowRightIcon size={18} className="ms-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item position-relative">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80"
                className="d-block w-100 banner-img"
                alt="Latest Smartphones"
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-center">
                <span className="eyebrow px-3 py-1 rounded-pill bg-dark bg-opacity-75 border border-cyan mb-2">⚡ TECH ESSENTIALS</span>
                <h1 className="display-3 fw-bolder text-white">Next-Gen Flagship Mobiles</h1>
                <p className="lead mb-4 text-light opacity-90">Cutting-edge performance, cameras, and battery life</p>
                <div className="d-flex gap-3">
                  <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-4 shadow">
                    Explore Mobiles <ArrowRightIcon size={18} className="ms-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item position-relative">
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80"
                className="d-block w-100 banner-img"
                alt="Laptops & Workstations"
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-center">
                <span className="eyebrow px-3 py-1 rounded-pill bg-dark bg-opacity-75 border border-cyan mb-2">💻 POWER WORKSTATIONS</span>
                <h1 className="display-3 fw-bolder text-white">Gaming &amp; Studio Laptops</h1>
                <p className="lead mb-4 text-light opacity-90">Unmatched computing power for creators &amp; gamers</p>
                <div className="d-flex gap-3">
                  <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-4 shadow">
                    View Laptops <ArrowRightIcon size={18} className="ms-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon p-3 rounded-circle bg-dark bg-opacity-50" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon p-3 rounded-circle bg-dark bg-opacity-50" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* -------------------- Features Grid ----------------------- */}
      <div className="container mb-5">
        <div className="row g-4 text-center">
          <div className="col-md-3 col-sm-6">
            <div className="glass-card p-4 h-100 prism-edge d-flex flex-column align-items-center justify-content-center">
              <div className="icon-tile text-cyan mb-3">
                <TruckIcon size={28} />
              </div>
              <h5 className="fw-bold mb-1">Express Delivery</h5>
              <p className="small text-secondary mb-0">Free shipping on orders over ₹999</p>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="glass-card p-4 h-100 prism-edge d-flex flex-column align-items-center justify-content-center">
              <div className="icon-tile text-violet mb-3">
                <ShieldCheckIcon size={28} />
              </div>
              <h5 className="fw-bold mb-1">Secure Checkout</h5>
              <p className="small text-secondary mb-0">256-bit encrypted Razorpay protection</p>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="glass-card p-4 h-100 prism-edge d-flex flex-column align-items-center justify-content-center">
              <div className="icon-tile text-emerald mb-3">
                <SparklesIcon size={28} />
              </div>
              <h5 className="fw-bold mb-1">100% Authentic</h5>
              <p className="small text-secondary mb-0">Directly sourced original products</p>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="glass-card p-4 h-100 prism-edge d-flex flex-column align-items-center justify-content-center">
              <div className="icon-tile text-pink mb-3">
                <SupportIcon size={28} />
              </div>
              <h5 className="fw-bold mb-1">24/7 VIP Support</h5>
              <p className="small text-secondary mb-0">Dedicated assistance anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- Stats Ticker Bar ----------------------- */}
      <div className="container mb-5">
        <div className="glass-card p-4 rounded-4 prism-edge">
          <div className="row text-center g-3 align-items-center">
            <div className="col-md-3 col-6">
              <div className="stat-number">500+</div>
              <p className="stat-label mb-0">Premium Products</p>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-number">10K+</div>
              <p className="stat-label mb-0">Happy Shoppers</p>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-number">99.8%</div>
              <p className="stat-label mb-0">Satisfaction Rate</p>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-number">24/7</div>
              <p className="stat-label mb-0">Fast Shipping</p>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- Shop By Category --------------------- */}
      <div className="container mb-5">
        <div className="text-center mb-4">
          <span className="eyebrow">EXPLORE CATALOG</span>
          <h2 className="display-6 fw-bold">Shop By Category</h2>
        </div>
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <Link to="/products" className="text-decoration-none">
              <div className="glass-card p-4 prism-edge h-100 d-flex flex-column align-items-center justify-content-center">
                <div className="icon-tile mb-3" style={{ width: "72px", height: "72px" }}>
                  <SmartphoneIcon size={34} />
                </div>
                <h4 className="fw-bold text-dark mb-1">Mobiles</h4>
                <p className="small text-secondary mb-0">Smartphones &amp; Wearables</p>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/products" className="text-decoration-none">
              <div className="glass-card p-4 prism-edge h-100 d-flex flex-column align-items-center justify-content-center">
                <div className="icon-tile mb-3" style={{ width: "72px", height: "72px" }}>
                  <LaptopIcon size={34} />
                </div>
                <h4 className="fw-bold text-dark mb-1">Electronics</h4>
                <p className="small text-secondary mb-0">Laptops, Audio &amp; Gadgets</p>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/products" className="text-decoration-none">
              <div className="glass-card p-4 prism-edge h-100 d-flex flex-column align-items-center justify-content-center">
                <div className="icon-tile mb-3" style={{ width: "72px", height: "72px" }}>
                  <FootwearIcon size={34} />
                </div>
                <h4 className="fw-bold text-dark mb-1">Shoes</h4>
                <p className="small text-secondary mb-0">Sneakers &amp; Sports Gear</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* -------------------- Featured Products ------------------- */}
      <div className="container mb-5">
        <div className="text-center mb-4">
          <span className="eyebrow">HANDPICKED SELECTION</span>
          <h2 className="display-6 fw-bold">Featured Products</h2>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
          </div>
        ) : products.length === 0 ? (
          <div className="alert alert-warning text-center rounded-4 py-4">
            No products available right now.
          </div>
        ) : (
          <>
            <div className="row g-4">
              {products.slice(0, 4).map((product) => (
                <div className="col-lg-3 col-md-6" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5 shadow">
                View All Products <ArrowRightIcon size={18} className="ms-1" />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* -------------------- Latest Products ---------------- */}
      {products.length > 4 && (
        <div className="container mb-5">
          <div className="text-center mb-4">
            <span className="eyebrow">FRESH ARRIVALS</span>
            <h2 className="display-6 fw-bold">Latest Arrivals</h2>
          </div>
          <div className="row g-4">
            {products.slice(4, 8).map((product) => (
              <div key={product._id} className="col-lg-3 col-md-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
