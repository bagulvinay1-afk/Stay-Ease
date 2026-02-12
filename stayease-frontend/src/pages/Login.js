import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ---------------- VALIDATION ----------------
  const validate = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address");
      return false;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 characters");
      return false;
    }

    setError("");
    return true;
  };

  // ---------------- LOGIN ----------------
  const login = async () => {
    if (!validate()) return;

    try {
      const res = await api.post("/auth/login", { email, password });

      if (typeof res.data === "string") {
        setError(res.data);
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data));

      const role_id = res.data.role.id;

      alert("Login successful");

      if (role_id === 3) navigate("/tenant");
      else if (role_id === 1) navigate("/admin");
      else if (role_id === 2) navigate("/owner");
      else alert("Unknown role");

    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="title">Welcome to StayEase</h2>
        <p className="subtitle">Login to manage your PG easily</p>

        {error && <div className="error-box">{error}</div>}

        <div className="field">
          <label>EMAIL ADDRESS</label>
          <div className="input-box">
            <span>📧</span>
            <input 
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>PASSWORD</label>
          <div className="input-box">
            <span>🔒</span>
            <input 
              type="password"
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <p className="forgot">Forgot password?</p>

        <button className="login-main-btn" onClick={login}>LOGIN</button>

        <div className="or">OR</div>

        <p className="signup">
          New to StayEase? 
          <span onClick={() => navigate("/register")}> Create Account</span>
        </p>

      </div>
    </div>
  );
}

export default Login;