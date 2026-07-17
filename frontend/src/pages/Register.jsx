import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const submitHandler = async (e) => {e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      alert(data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register</h2>
      <form onSubmit={submitHandler}>
        <input type="text" className="form-control mb-3" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}required/>
        <input type="email" className="form-control mb-3" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}required/>
        <input type="password" className="form-control mb-3" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}required/>
        <button type="submit" className="btn btn-success">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;