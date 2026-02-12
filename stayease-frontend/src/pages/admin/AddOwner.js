import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddOwner() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.fullName || !form.email || !form.password || !form.phone) {
      setError("All fields are required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Enter valid email");
      return false;
    }

    if (form.password.length < 5) {
      setError("Password must be at least 5 characters");
      return false;
    }

    setError("");
    return true;
  };

  const registerOwner = async () => {
    if (!validate()) return;

    try {
      await api.post("/auth/register/owner", form);

      setMsg(`✅ ${form.fullName} added successfully`);

      setTimeout(() => {
        navigate("/admin");
      }, 2000);

    } catch (err) {
      console.log(err);
      setError("Owner registration failed");
    }
  };

  return (
    <div className="container mt-5 col-md-5">

      <h3 className="text-center fw-bold mb-3">Add PG Owner</h3>

      {msg && <div className="alert alert-success text-center">{msg}</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <input className="form-control mt-2" placeholder="Full Name"
        name="fullName" onChange={handleChange} />

      <input className="form-control mt-2" placeholder="Email"
        name="email" onChange={handleChange} />

      <input type="password" className="form-control mt-2" placeholder="Password"
        name="password" onChange={handleChange} />

      <input className="form-control mt-2" placeholder="Phone"
        name="phone" onChange={handleChange} />

      <textarea className="form-control mt-2" placeholder="Address"
        name="address" onChange={handleChange}></textarea>

      <button className="btn btn-primary w-100 mt-3" onClick={registerOwner}>
        Register Owner
      </button>

    </div>
  );
}

export default AddOwner;
