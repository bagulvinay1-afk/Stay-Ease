import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("tenant");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validate = () => {

    if (!fullName || !email || !password || !phone || !address) {
      setError("All fields are required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email");
      return false;
    }

    if (phone.length !== 10) {
      setError("Phone number must be 10 digits");
      return false;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 characters");
      return false;
    }

    setError("");
    return true;
  };

  const register = async () => {

    if (!validate()) return;

    try {
      await api.post(`/auth/register/${role}`, {
        fullName,
        email,
        password,
        phone,
        address
      });

      alert("Registration successful");
      navigate("/login");

    } catch (err) {
      console.log(err);
      setError("Registration failed (email may already exist)");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="title">Create Account</h2>
        <p className="subtitle">Join StayEase today</p>

        {error && <div className="error-box">{error}</div>}

        <div className="input-box"><input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} /></div>
        <div className="input-box"><input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div className="input-box"><input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /></div>
        <div className="input-box"><input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} /></div>
        <div className="input-box"><input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} /></div>

        <select className="role-box" value={role} onChange={e => setRole(e.target.value)}>
          <option value="tenant">Tenant</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </select>

        <button className="login-main-btn" onClick={register}>REGISTER</button>

        <p className="signup">
          Already have an account? 
          <span onClick={() => navigate("/login")}> Login</span>
        </p>

      </div>
    </div>
  );
}

export default Register;