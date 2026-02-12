import { useEffect, useState } from "react";
import axios from "axios";

function ViewPG() {

  const [pgs, setPgs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedPg, setSelectedPg] = useState(null);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchPgs();
  }, []);

  const fetchPgs = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/pgs");
    
    setPgs(res.data);
  };

  const openModal = (pg, action) => {
    setSelectedPg(pg);
    setActionType(action);
    setShowModal(true);
  };

  const confirmAction = async () => {
    try {

      if (actionType === "approve") {
        await axios.put(`http://localhost:8080/api/admin/pgs/${selectedPg.id}/approve`);
        setMsg("PG Approved Successfully");
        setType("success");
      }

      if (actionType === "reject") {
        await axios.put(`http://localhost:8080/api/admin/pgs/${selectedPg.id}/reject`);
        setMsg("PG Rejected Successfully");
        setType("warning");
      }

      if (actionType === "delete") {
        await axios.delete(`http://localhost:8080/api/admin/pgs/${selectedPg.id}`);
        setMsg("PG Deleted Successfully");
        setType("danger");
      }

      fetchPgs();
    } catch (err) {
      setMsg("Action Failed");
      setType("danger");
    }

    setShowModal(false);
    autoClear();
  };

  const autoClear = () => {
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="container mt-4">

      <h3 className="fw-bold mb-3">Manage PGs</h3>

      {msg && <div className={`alert alert-${type}`}>{msg}</div>}

      <table className="table table-bordered table-hover shadow">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>PG Name</th>
            <th>City</th>
            <th>Rent</th>
            <th>Status</th>
            <th width="280">Action</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {pgs.map(pg => (
            <tr key={pg.id}>
              <td>{pg.id}</td>
              <td>{pg.name}</td>
              <td>{pg.city}</td>
              <td>₹ {pg.rent}</td>
              <td>
                {pg.status === "PENDING" && <span className="badge bg-warning">Pending</span>}
                {pg.status === "APPROVED" && <span className="badge bg-success">Approved</span>}
                {pg.status === "REJECTED" && <span className="badge bg-danger">Rejected</span>}
              </td>

              <td>
                {pg.status === "PENDING" && (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => openModal(pg, "approve")}>
                      Approve
                    </button>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => openModal(pg, "reject")}>
                      Reject
                    </button>
                  </>
                )}

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => openModal(pg, "delete")}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- MODAL ---------- */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Confirm Action</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body text-center">
                <p className="fw-bold">
                  Are you sure you want to {actionType.toUpperCase()} this PG?
                </p>
                <p className="text-muted">{selectedPg?.name}</p>
              </div>

              <div className="modal-footer justify-content-center">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmAction}>
                  Confirm
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ViewPG;
