import { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ShoppingBagIcon, TruckIcon, ArrowRightIcon, CheckIcon, SparklesIcon } from "../components/Icons";

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

  const updateStatus = async (orderId, status) => {
    try {
      const { data } = await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status });
      setOrders(orders.map((o) => (o._id === orderId ? data : o)));
      toast.success(`Order Status updated to '${status}' 📦`);
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const downloadInvoice = (order) => {
    const invoiceWindow = window.open("", "_blank");
    if (!invoiceWindow) {
      toast.error("Please allow popups to download invoice PDF");
      return;
    }

    const itemsHtml = (order.items || [])
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.qty}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">₹${item.price?.toLocaleString()}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">₹${(
          item.price * item.qty
        ).toLocaleString()}</td>
      </tr>
    `
      )
      .join("");

    const invoiceContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>ShopSphere Tax Invoice - #${order._id?.slice(-8).toUpperCase()}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a; margin: 0; padding: 40px; background: #fff; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px; }
          .brand { font-size: 28px; font-weight: 800; color: #0f172a; }
          .badge { background: #2563eb; color: #fff; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          .info-grid { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .info-box { width: 48%; background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; }
          .info-box h4 { margin-top: 0; margin-bottom: 10px; color: #2563eb; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background: #0f172a; color: #fff; padding: 12px; text-align: left; }
          .total-box { text-align: right; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
          .total-amount { font-size: 24px; font-weight: bold; color: #16a34a; }
          .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">ShopSphere</div>
            <small style="color: #64748b;">Official Tax Invoice &amp; Receipt</small>
          </div>
          <div>
            <span class="badge">${order.status?.toUpperCase() || "PAID"}</span>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-box">
            <h4>Order Details</h4>
            <p style="margin: 4px 0;"><strong>Invoice No:</strong> INV-${order._id?.slice(-8).toUpperCase()}</p>
            <p style="margin: 4px 0;"><strong>Order Date:</strong> ${new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
            <p style="margin: 4px 0;"><strong>Payment Status:</strong> Razorpay Secured (Paid)</p>
          </div>
          <div class="info-box">
            <h4>Shipping Customer</h4>
            <p style="margin: 4px 0;"><strong>Name:</strong> ${order.user || "Customer"}</p>
            <p style="margin: 4px 0;"><strong>Address:</strong> ${order.address || "N/A"}</p>
            <p style="margin: 4px 0;"><strong>City:</strong> ${order.city || "N/A"}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="total-box">
          <p style="margin: 4px 0;">Subtotal: ₹${order.totalPrice?.toLocaleString()}</p>
          <p style="margin: 4px 0;">Shipping &amp; Handling: <span style="color: #16a34a; font-weight: bold;">FREE</span></p>
          <p style="margin: 8px 0;" class="total-amount">Total Paid: ₹${order.totalPrice?.toLocaleString()}</p>
        </div>

        <div class="footer">
          Thank you for shopping with ShopSphere! Guaranteed 100% authentic products.<br/>
          Need assistance? Contact support@shopsphere.com
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    invoiceWindow.document.write(invoiceContent);
    invoiceWindow.document.close();
  };

  const getStatusStepIndex = (status) => {
    switch (status) {
      case "Pending": return 1;
      case "Processing": return 2;
      case "Shipped": return 3;
      case "Delivered": return 4;
      default: return 1;
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
        <p className="mt-3 text-secondary">Loading order history...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span className="eyebrow">ACCOUNT HISTORY</span>
          <h1 className="display-6 fw-bold mb-0 text-dark">Order History</h1>
        </div>
        <span className="badge bg-primary fs-6 px-3 py-2">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card text-center py-5 rounded-4 prism-edge">
          <div className="icon-tile mx-auto mb-3" style={{ width: "72px", height: "72px" }}>
            <ShoppingBagIcon size={36} className="text-secondary" />
          </div>
          <h3 className="fw-bold mb-2">No Orders Found</h3>
          <p className="text-secondary mb-4">You haven't placed any orders yet.</p>
          <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5">
            Start Shopping <ArrowRightIcon size={18} className="ms-1" />
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {orders.map((order) => {
            const currentStep = getStatusStepIndex(order.status);

            return (
              <div key={order._id} className="glass-card p-4 rounded-4 prism-edge">
                {/* Header info */}
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 border-bottom border-light pb-3 mb-3">
                  <div>
                    <small className="text-secondary d-block font-monospace">
                      ORDER ID: #{order._id?.slice(-8).toUpperCase()}
                    </small>
                    <h5 className="fw-bold text-dark mb-0 mt-1">Customer: {order.user}</h5>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div className="text-end">
                      <small className="text-secondary d-block">Total Paid</small>
                      <span className="fw-bold text-success fs-5">
                        ₹{order.totalPrice?.toLocaleString()}
                      </span>
                    </div>

                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill d-flex align-items-center gap-1"
                      onClick={() => downloadInvoice(order)}
                    >
                      📄 Download Invoice
                    </button>
                  </div>
                </div>

                {/* Visual Order Progress Tracker */}
                <div className="p-3 mb-4 rounded-4 bg-light border border-light">
                  <span className="fw-bold text-dark small mb-3 d-block">
                    🚚 Order Tracking Progress ({order.status || "Placed"})
                  </span>
                  <div className="d-flex justify-content-between align-items-center position-relative px-2">
                    {/* Connecting background bar */}
                    <div
                      className="position-absolute"
                      style={{
                        top: "50%",
                        left: "10%",
                        right: "10%",
                        height: "4px",
                        background: "#e2e8f0",
                        transform: "translateY(-50%)",
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${((currentStep - 1) / 3) * 100}%`,
                          background: "#16a34a",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>

                    {/* Step 1: Placed */}
                    <div className="text-center position-relative" style={{ zIndex: 2 }}>
                      <div
                        className={`rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold ${
                          currentStep >= 1 ? "bg-success text-white" : "bg-white text-secondary border"
                        }`}
                        style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}
                      >
                        {currentStep >= 1 ? <CheckIcon size={16} /> : "1"}
                      </div>
                      <small className="d-block mt-1 fw-bold text-dark">Placed</small>
                    </div>

                    {/* Step 2: Processing */}
                    <div className="text-center position-relative" style={{ zIndex: 2 }}>
                      <div
                        className={`rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold ${
                          currentStep >= 2 ? "bg-success text-white" : "bg-white text-secondary border"
                        }`}
                        style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}
                      >
                        {currentStep >= 2 ? <CheckIcon size={16} /> : "2"}
                      </div>
                      <small className="d-block mt-1 fw-bold text-dark">Processing</small>
                    </div>

                    {/* Step 3: Shipped */}
                    <div className="text-center position-relative" style={{ zIndex: 2 }}>
                      <div
                        className={`rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold ${
                          currentStep >= 3 ? "bg-success text-white" : "bg-white text-secondary border"
                        }`}
                        style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}
                      >
                        {currentStep >= 3 ? <CheckIcon size={16} /> : "3"}
                      </div>
                      <small className="d-block mt-1 fw-bold text-dark">Shipped</small>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="text-center position-relative" style={{ zIndex: 2 }}>
                      <div
                        className={`rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold ${
                          currentStep >= 4 ? "bg-success text-white" : "bg-white text-secondary border"
                        }`}
                        style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}
                      >
                        {currentStep >= 4 ? <CheckIcon size={16} /> : "4"}
                      </div>
                      <small className="d-block mt-1 fw-bold text-dark">Delivered</small>
                    </div>
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
                        <TruckIcon size={16} className="text-primary" /> Shipping Address
                      </h6>
                      <p className="small text-secondary mb-1">{order.address}</p>
                      <p className="small text-secondary mb-0">City: {order.city}</p>
                    </div>

                    {/* Admin status update controls */}
                    {isAdmin && (
                      <div className="mt-3">
                        <label className="form-label small text-secondary">Update Status (Admin)</label>
                        <select
                          className="form-select form-select-sm rounded-pill"
                          value={order.status || "Pending"}
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
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrders;