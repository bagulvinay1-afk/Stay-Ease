import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OwnerDashboard.css";

function OwnerDashboard() {

  const [owner, setOwner] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role.id !== 2) {
      navigate("/login");
    } else {
      setOwner(user);
    }
  }, [navigate]);

  return (
    <div className="owner-main">

      {/* Top Bar */}
      <div className="owner-topbar">
  <div className="owner-center">
    <h4>StayEase Owner Panel</h4>
    <p>Welcome, {owner.fullName}</p>
  </div>

  <button className="logout-btn" onClick={() => {
    localStorage.clear();
    navigate("/login");
  }}>
    Logout
  </button>
</div>

      {/* Cards */}
      <div className="owner-container">

        <OwnerCard
          title="Add PG"
          desc="Add new PG details"
          btn="ADD"
          onClick={() => navigate("/owner/add-pg")}
        />

        <OwnerCard
          title="View PG List"
          desc="View all your PGs"
          btn="VIEW"
          onClick={() => navigate("/owner/ViewPGList")}
        />

        <OwnerCard
          title="Bookings"
          desc="Check tenant bookings"
          btn="VIEW"
          onClick={() => navigate("/owner-bookings")}
        />

        <OwnerCard
          title="Tenants"
          desc="View all tenants"
          btn="VIEW"
          onClick={() => navigate("/owner-tenants")}
        />

        <OwnerCard
          title="Earnings"
          desc="Check monthly earnings"
          btn="VIEW"
          onClick={() => navigate("/owner-earnings")}
        />

        <OwnerCard
          title="Terms & Conditions"
          desc="Add PG rules & terms"
          btn="ADD"
          onClick={() => navigate("/AddTermsConditions")}
        />

      </div>
    </div>
  );
}

function OwnerCard({ title, desc, btn, onClick }) {
  return (
    <div className="owner-card">
      <h5>{title}</h5>
      <p>{desc}</p>
      <button onClick={onClick}>{btn}</button>
    </div>
  );
}

export default OwnerDashboard;
