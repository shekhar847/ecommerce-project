import { useEffect, useState } from "react";
import axios from "axios";

import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,} from "recharts";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: productsData } = await axios.get("http://localhost:5000/api/products");
        const { data: ordersData } = await axios.get("http://localhost:5000/api/orders");
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;
  const shippedOrders = orders.filter((order) => order.status === "Shipped").length;
  const deliveredOrders = orders.filter((order) => order.status === "Delivered").length;
  const chartData = [
    {
      name: "Products",
      value: products.length,
    },
    {
      name: "Orders",
      value: orders.length,
    },
    {
      name: "Revenue",
      value: totalRevenue,
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Admin Dashboard
      </h2>
      {/* --------------------Top Cards--------------------- */}
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 text-center shadow">
            <h4>📦 Products</h4>
            <h2>{products.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center shadow">
            <h4>🛒 Orders</h4>
            <h2>{orders.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center shadow">
            <h4>💰 Revenue</h4>
            <h2>₹ {totalRevenue}</h2>
          </div>
        </div>
      </div>
      {/* --------------------Analytics chart---------------- */}
      <h3 className="mt-5 mb-3">
        📊 Analytics Dashboard
      </h3>
      <div className="card p-3 shadow mb-4" style={{ height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0d6efd"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* --------------------Status Cards--------------------- */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3 text-center bg-warning">
            <h5>Pending Orders</h5>
            <h3>{pendingOrders}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center bg-primary text-white">
            <h5>Shipped Orders</h5>
            <h3>{shippedOrders}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center bg-success text-white">
            <h5>Delivered Orders</h5>
            <h3>{deliveredOrders}</h3>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      {/* --------------------Orders Table--------------------- */}
      <h3>Recent Orders</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user}</td>
              <td>₹ {order.totalPrice}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* --------------------Products Table--------------------- */}
      <h3 className="mt-4">
        Products
      </h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹ {product.price}</td>
              <td>{product.countInStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;