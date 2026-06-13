import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders");
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <h4>No Orders Found</h4>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card p-3 my-3">
            <h5>{order.user}</h5>
            <p>
              Address: {order.address}
            </p>
            <p>
              City: {order.city}
            </p>
            <p>
              Total: ₹ {order.totalPrice}
            </p>
            <p>
              Status:
              <span className={`badge ms-2 ${order.status === "Pending" ? "bg-warning text-dark" : order.status === "Processing" ? "bg-info" : order.status === "Shipped" ? "bg-primary" : "bg-success"}`}>
                {order.status}
              </span>
            </p>
            <select className="form-select mt-2" value={order.status} onChange={async (e) => {
                try {
                  await axios.put(`http://localhost:5000/api/orders/${order._id}/status`,{status: e.target.value,});
                  alert("Order Status Updated");
                  window.location.reload();
                } catch (error) {
                  alert(
                    error.response?.data?.message ||
                    "Failed to update status"
                  );
                }
              }}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <h6>Items:</h6>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.name} × {item.qty}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;