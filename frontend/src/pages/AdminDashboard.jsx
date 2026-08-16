import { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ShoppingBagIcon, SparklesIcon, PlusIcon } from "../components/Icons";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: productsData } = await axios.get(`${API_URL}/api/products`);
        const { data: ordersData } = await axios.get(`${API_URL}/api/orders`);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.log("Error loading admin dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;
  const shippedOrders = orders.filter((order) => order.status === "Shipped").length;
  const deliveredOrders = orders.filter((order) => order.status === "Delivered").length;

  const chartData = [
    { name: "Products", value: products.length },
    { name: "Orders", value: orders.length },
    { name: "Delivered", value: deliveredOrders },
  ];

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span className="eyebrow">CONTROL CENTER</span>
          <h1 className="display-6 fw-bold mb-0">Admin Analytics Dashboard</h1>
        </div>
        <Link to="/add-product" className="btn btn-primary rounded-pill d-flex align-items-center gap-1 shadow">
          <PlusIcon size={18} /> Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
        </div>
      ) : (
        <>
          {/* KPI Top Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="glass-card p-4 rounded-4 prism-edge text-center">
                <span className="text-secondary small d-block font-monospace mb-1">TOTAL CATALOG</span>
                <h2 className="display-6 fw-bold text-cyan mb-0">{products.length} Products</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="glass-card p-4 rounded-4 prism-edge text-center">
                <span className="text-secondary small d-block font-monospace mb-1">TOTAL ORDERS</span>
                <h2 className="display-6 fw-bold text-violet mb-0">{orders.length} Orders</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="glass-card p-4 rounded-4 prism-edge text-center">
                <span className="text-secondary small d-block font-monospace mb-1">TOTAL REVENUE</span>
                <h2 className="display-6 fw-bold text-emerald mb-0">₹{totalRevenue?.toLocaleString()}</h2>
              </div>
            </div>
          </div>

          {/* Analytics Chart */}
          <div className="glass-card p-4 rounded-4 prism-edge mb-4">
            <h4 className="fw-bold mb-4">Overview Chart</h4>
            <div style={{ height: "320px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="#8e8aa8" />
                  <YAxis stroke="#8e8aa8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e2e8f0",
                      borderRadius: "12px",
                      color: "#0f172a",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                    }}
                  />
                  <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Breakdown Cards */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="glass-card p-3 rounded-4 border-warning text-center">
                <span className="text-warning small font-monospace">PENDING</span>
                <h3 className="fw-bold mb-0 mt-1">{pendingOrders}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="glass-card p-3 rounded-4 border-primary text-center">
                <span className="text-cyan small font-monospace">SHIPPED</span>
                <h3 className="fw-bold mb-0 mt-1">{shippedOrders}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="glass-card p-3 rounded-4 border-success text-center">
                <span className="text-success small font-monospace">DELIVERED</span>
                <h3 className="fw-bold mb-0 mt-1">{deliveredOrders}</h3>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="glass-card p-4 rounded-4 prism-edge mb-4">
            <h4 className="fw-bold mb-3 text-dark">Recent Orders</h4>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="fw-bold text-dark">{order.user}</td>
                      <td className="text-success font-monospace">₹{order.totalPrice?.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${
                          order.status === "Delivered" ? "bg-success" :
                          order.status === "Shipped" ? "bg-primary" : "bg-warning text-dark"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <Link to="/orders" className="btn btn-sm btn-outline-light rounded-pill">
                          Manage Status
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Products List Table */}
          <div className="glass-card p-4 rounded-4 prism-edge">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0 text-dark">Products Inventory</h4>
              <Link to="/add-product" className="btn btn-sm btn-primary rounded-pill">
                Add Product
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="fw-bold text-dark">{product.name}</td>
                      <td><span className="badge bg-primary">{product.category}</span></td>
                      <td className="text-success font-monospace">₹{product.price?.toLocaleString()}</td>
                      <td>
                        {product.countInStock > 0 ? (
                          <span className="badge bg-success">{product.countInStock} Available</span>
                        ) : (
                          <span className="badge bg-danger">Out of Stock</span>
                        )}
                      </td>
                      <td>
                        <Link to={`/edit-product/${product._id}`} className="btn btn-sm btn-outline-light rounded-pill">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;