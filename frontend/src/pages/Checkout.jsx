import { useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const payNow = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/api/payment/create-order`, { amount: totalPrice, });
      const options = {
        key: "rzp_test_SzqgmJdlfylllC",
        amount: data.amount,
        currency: data.currency,
        name: "ShopSphere",
        description: "Order Payment",
        order_id: data.id,
        handler: async function () {
          try {
            await axios.post(`${API_URL}/api/orders`,
              {
                user: name,
                items: cart,
                totalPrice,
                address,
                city,
              }
            );
            alert("Payment Successful & Order Placed");
            clearCart();
            navigate("/");
          } catch (error) {
            alert(error.response?.data?.message);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };
  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <h4 className="mb-4">
        Total Amount: ₹ {totalPrice}
      </h4>
      <form>
        <input type="text" className="form-control mb-3" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}required/>

        <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}required/>

        <input type="text" className="form-control mb-3" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}required/>

        <input type="text" className="form-control mb-3" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}required/>
        <button type="button" className="btn btn-success" onClick={payNow}>
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default Checkout;