import { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ShoppingBagIcon, TruckIcon, CheckIcon, ArrowRightIcon } from "../components/Icons";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const isAdmin = user?.role === "admin" || user?.isAdmin;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/orders`);
        setOrders(data);
      } catch (error) {
        console.log("Error loading orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status: newStatus });
      toast.success("Order status updated successfully");
      setOrders(orders.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return <span className="badge bg-success px-3 py-1.5 fs-6">Delivered ✓</span>;
      case "Shipped":
        return <span className="badge bg-primary px-3 py-1.5 fs-6">Shipped 🚚</span>;
      case "Processing":
        return <span className="badge bg-info text-dark px-3 py-1.5 fs-6">Processing ⚙️</span>;
      default:
        return <span className="badge bg-warning text-dark px-3 py-1.5 fs-6">Pending ⏳</span>;
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span className="eyebrow">ORDER HISTORY</span>
          <h1 className="display-6 fw-bold mb-0">My Orders</h1>
        </div>
        <span className="badge bg-primary fs-6 px-3 py-2">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="glass-card text-center py-5 rounded-4 prism-edge">
          <div className="icon-tile mx-auto mb-3 text-cyan" style={{ width: "72px", height: "72px" }}>
            <ShoppingBagIcon size={36} />
          </div>
          <h3 className="fw-bold mb-2">No Orders Found</h3>
          <p className="text-secondary mb-4">You haven't placed any orders yet.</p>
          <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5">
            Start Shopping <ArrowRightIcon size={18} className="ms-1" />
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {orders.map((order) => (
            <div key={order._id} className="glass-card p-4 rounded-4 prism-edge">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 border-bottom border-secondary border-opacity-25 pb-3 mb-3">
                <div>
                  <small className="text-secondary d-block font-monospace">
                    ORDER ID: #{order._id?.slice(-8).toUpperCase()}
                  </small>
                  <h5 className="fw-bold text-dark mb-0 mt-1">Customer: {order.user}</h5>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="text-end">
                    <small className="text-secondary d-block">Total Amount</small>
                    <span className="fw-bold text-success fs-5">
                      ₹{order.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              </div>

              {/* Items List */}
              <div className="row g-3 align-items-center">
                <div className="col-md-8">
                  <h6 className="fw-bold text-dark mb-2">Ordered Items:</h6>
                  <div className="d-flex flex-column gap-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="d-flex align-items-center gap-3 p-2 rounded-3 bg-light border border-light">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded-2"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                          />
                        )}
                        <span className="fw-medium text-dark flex-grow-1">{item.name}</span>
                        <span className="badge bg-secondary">Qty: {item.qty}</span>
                        <span className="text-success font-monospace">
                          ₹{(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-3 rounded-4 bg-light border border-light">
                    <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                      <TruckIcon size={16} className="text-cyan" /> Shipping Address
                    </h6>
                    <p className="small text-secondary mb-1">{order.address}</p>
                    <p className="small text-secondary mb-0">City: {order.city}</p>
                  </div>

                  {/* Admin status update controls */}
                  {isAdmin && (
                    <div className="mt-3">
                      <label className="form-label small text-secondary">Update Order Status (Admin)</label>
                      <select
                        className="form-select form-select-sm rounded-pill"
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;