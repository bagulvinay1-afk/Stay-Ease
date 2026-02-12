import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TenantDashboard.css";
import { useNavigate } from "react-router-dom";

function TenantDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // 🔥 later replace hardcoded 1 with user.id
    axios
      .get(`http://localhost:8080/api/tenant/dashboard/${user.id}`)
      .then(res => setDashboard(res.data))
      .catch(err => console.log(err));
  }, [user, navigate]);

  if (!dashboard) {
    return <h3 className="loading">Loading dashboard...</h3>;
  }

  return (
    <div className="tenant-dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="gradient-text">StayEase Tenant Panel</h1>
        <p>Welcome, {user.name}</p>
      </div>

      {/* GRID */}
      <div className="dashboard-grid">

        {/* MY STAY */}
        <div className="dashboard-card">
          <h3>My Stay</h3>
          <p>{dashboard.pgName}</p>
          <span>{dashboard.location} | {dashboard.roomType}</span>
          <button onClick={() => navigate("/tenant/my-stay")}>VIEW</button>
        </div>

        {/* NEXT RENT */}
        <div className="dashboard-card highlight">
          <h3>Next Rent Due</h3>
          <h2>₹{dashboard.nextRent}</h2>
          <span>Due on: {dashboard.dueDate}</span>
          <button onClick={() => navigate("/tenant/pay-rent")}>PAY RENT</button>
        </div>

        {/* PAYMENTS */}
        <div className="dashboard-card">
          <h3>Payments</h3>
          <p>View payment history</p>
          <button onClick={() => navigate("/tenant/payments")}>VIEW</button>
        </div>

        {/* COMPLAINT */}
        <div className="dashboard-card">
          <h3>Raise Complaint</h3>
          <p>Maintenance & issues</p>
          <button onClick={() => navigate("/tenant/complaints")}>ADD</button>
        </div>

        {/* AGREEMENT */}
        <div className="dashboard-card">
          <h3>My Agreement</h3>
          <p>Rental agreement</p>
          <button onClick={() => navigate("/tenant/agreement")}>VIEW</button>
        </div>

        {/* FOOD MENU */}
        <div className="dashboard-card">
          <h3>Food Menu</h3>
          <p>View weekly menu</p>
          <button>VIEW</button>
        </div>

      </div>
    </div>
  );
}

export default TenantDashboard;
