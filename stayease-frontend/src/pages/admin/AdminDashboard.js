import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";   // adjust path if needed

function AdminDashboard() {

  const [counts, setCounts] = useState({
    totalPGs: 0,
    totalOwners: 0,
    totalTenants: 0,
    pendingApprovals: 0
  });

  const [error, setError] = useState("");

  // ---------------- LOAD DASHBOARD COUNTS ----------------
  useEffect(() => {
    const loadCounts = async () => {
      try {
        const res = await api.get("/admin/dashboard-counts");
        setCounts(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load dashboard data");
      }
    };

    loadCounts();
  }, []);

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <span className="badge bg-primary p-2">StayEase Admin Panel</span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Stats cards */}
      <div className="row text-center">

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5>Total PGs</h5>
              <h2 className="text-primary">{counts.totalPGs}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5>Total Owners</h5>
              <h2 className="text-success">{counts.totalOwners}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5>Total Tenants</h5>
              <h2 className="text-warning">{counts.totalTenants}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5>Pending Approvals</h5>
              <h2 className="text-danger">{counts.pendingApprovals}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="row mt-4">

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5>Add PG Owner</h5>
              <p>Create and manage PG owners</p>
              <Link to="/admin/add-owner" className="btn btn-primary">
                Add Owner
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5>Manage Owners</h5>
              <p>View, block or remove owners</p>
              <Link to="/admin/manage-owners" className="btn btn-primary">
                View Owners
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5>Manage PGs</h5>
              <p>Approve or reject PG listings</p>
              <Link to="/admin/manage-pg" className="btn btn-primary">
                View PGs
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
