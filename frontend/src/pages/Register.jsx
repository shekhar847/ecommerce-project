import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { SparklesIcon, ArrowRightIcon } from "../components/Icons";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.warning("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      toast.success(data.message || "Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: "75vh" }}>
      <div className="glass-card p-4 p-md-5 rounded-5 prism-edge max-w-md w-100 shadow-lg">
        <div className="text-center mb-4">
          <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: "54px", height: "54px", background: "var(--prism-gradient)" }}>
            <SparklesIcon size={28} className="text-dark" />
          </div>
          <h2 className="fw-bold text-white mb-1">Create Account</h2>
          <p className="text-secondary small">Join ShopSphere for VIP deals &amp; express checkout</p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Create strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-accent btn-lg w-100 rounded-pill fw-bold shadow py-3 mb-3 d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <>
                <span>Register Account</span> <ArrowRightIcon size={18} />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-3 pt-3 border-top border-secondary border-opacity-25">
          <p className="text-secondary small mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan fw-bold text-decoration-none ms-1">
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;