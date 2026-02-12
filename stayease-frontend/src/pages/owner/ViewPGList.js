import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewPGList.css";

function ViewPGList() {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPgs();
  }, []);

  const fetchPgs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/pgs");
      setPgs(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Failed to load PGs ");
      setLoading(false);
    }
  };

  const deletePg = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PG?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/pgs/${id}`);
      alert("PG deleted successfully ");
      fetchPgs();
    } catch (err) {
      console.log(err);
      alert("Delete failed ");
    }
  };

  const deleteRoom = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/rooms/${roomId}`);
      alert("Room deleted ");
      fetchPgs();
    } catch (err) {
      console.log(err);
      alert("Failed to delete room ");
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading PGs...</h2>;

  return (
    <div className="pglist-main">
      <h2>🏠 All PG Listings</h2>

      {pgs.length === 0 ? (
        <p style={{ textAlign: "center" }}>No PGs available</p>
      ) : (
        <div className="pg-grid">
          {pgs.map((pg) => (
            <div className="pg-card" key={pg.id}>
              <h3>{pg.name}</h3>

              <div className="pg-info">
                <p><b>City:</b> {pg.city}</p>
                <p><b>Address:</b> {pg.address}</p>
                <p><b>Type:</b> {pg.pgType}</p>
                <p><b>Deposit:</b> ₹{pg.deposit}</p>
                <p><b>Food:</b> {pg.food}</p>
                <p><b>Contact:</b> {pg.contact}</p>
                <p><b>Amenities:</b> {pg.amenities || "Not mentioned"}</p>
                <p><b>Rules:</b> {pg.rules || "Not mentioned"}</p>
              </div>

              <h4 className="room-title">🛏 Room Details</h4>

              {pg.rooms && pg.rooms.length > 0 ? (
                <div className="table-wrapper">
                  <table className="room-table">
                    <thead>
                      <tr>
                        <th>Room No</th>
                        <th>Sharing</th>
                        <th>Rent/Bed</th>
                        <th>Beds</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pg.rooms.map((room) => (
                        <tr key={room.id}>
                          <td>{room.roomNumber}</td>
                          <td>{room.sharing}</td>
                          <td>₹{room.rentPerBed}</td>
                          <td>{room.availableBeds}/{room.totalBeds}</td>
                          <td className="room-actions">
                            <button
                              className="room-edit"
                              onClick={() => navigate(`/owner/edit-room/${room.id}`)}
                            >
                              Edit
                            </button>
                            <button
                              className="room-delete"
                              onClick={() => deleteRoom(room.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-rooms">No rooms added</p>
              )}

              <div className="pg-actions">
                <button onClick={() => navigate(`/owner/edit-pg/${pg.id}`)}>Edit PG</button>
                
                <button
  className="add-room-btn"
  onClick={() => navigate(`/owner/add-room/${pg.id}`)}
>
  ➕ Add Room
</button>
                <button className="danger" onClick={() => deletePg(pg.id)}>Delete PG</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewPGList;