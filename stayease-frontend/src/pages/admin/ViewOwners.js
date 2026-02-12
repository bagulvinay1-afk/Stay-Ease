import { useEffect, useState } from "react";
import axios from "axios";

function ViewOwners() {

  const [owners, setOwners] = useState([]);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(""); // delete | block | unblock
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/owners");
    setOwners(res.data);
  };

  // ---------- OPEN MODAL ----------
  const openModal = (owner, action) => {
    setSelectedOwner(owner);
    setActionType(action);
    setShowModal(true);
  };

  // ---------- CONFIRM ACTION ----------
  const confirmAction = async () => {
    try {
      if (actionType === "delete") {
        await axios.delete(`http://localhost:8080/api/admin/owners/${selectedOwner.id}`);
        setMsg("Owner deleted successfully");
        setType("success");
      }

      if (actionType === "block") {
        await axios.put(`http://localhost:8080/api/admin/owners/${selectedOwner.id}/status/false`);
        setMsg("Owner blocked successfully");
        setType("warning");
      }

      if (actionType === "unblock") {
        await axios.put(`http://localhost:8080/api/admin/owners/${selectedOwner.id}/status/true`);
        setMsg("Owner unblocked successfully");
        setType("success");
      }

      fetchOwners();
    } catch (err) {
      setMsg("Action failed");
      setType("danger");
    }

    setShowModal(false);
    autoClear();
  };

  const autoClear = () => {
    setTimeout(() => {
      setMsg("");
      setType("");
    }, 3000);
  };

  return (
    <div className="container mt-4">

      <h3 className="fw-bold mb-3">PG Owners</h3>

      {msg && (
        <div className={`alert alert-${type} alert-dismissible fade show`}>
          {msg}
          <button className="btn-close" onClick={() => setMsg("")}></button>
        </div>
      )}

      <table className="table table-bordered table-hover shadow">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th width="260">Action</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {owners.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.fullname}</td>
              <td>{o.email}</td>
              <td>{o.phone}</td>
              <td>
                {o.active ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Blocked</span>
                )}
              </td>
              <td>
                {o.active ? (
                  <button
                    onClick={() => openModal(o, "block")}
                    className="btn btn-warning btn-sm me-2">
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => openModal(o, "unblock")}
                    className="btn btn-success btn-sm me-2">
                    Unblock
                  </button>
                )}

                <button
                  onClick={() => openModal(o, "delete")}
                  className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------- MODAL ---------------- */}
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
                  Are you sure you want to {actionType.toUpperCase()} this owner?
                </p>
                <p className="text-muted">{selectedOwner?.fullname}</p>
              </div>

              <div className="modal-footer justify-content-center">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmAction}>
                  Yes, Confirm
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ViewOwners;
