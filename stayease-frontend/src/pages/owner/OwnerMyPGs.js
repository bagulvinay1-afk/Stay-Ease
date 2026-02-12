import React from "react";

function OwnerMyPGs() {
  return (
    <div className="owner-main">
      
      <div className="owner-top">
        <h3>My PGs</h3>
        <button className="btn btn-success">+ Add New PG</button>
      </div>

      <div className="card custom-card">
        <div className="card-header">PG List</div>
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>PG Name</th>
                <th>Location</th>
                <th>Rooms</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Shanti PG</td>
                <td>Pune</td>
                <td>10</td>
                <td>25</td>
                <td><span className="badge-active">Active</span></td>
                <td>
                  <button className="btn-soft-primary me-2">Edit</button>
                  <button className="btn-soft-danger">Delete</button>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default OwnerMyPGs;