import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PgDetails.css";

function PgDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/pgs/${id}`)
      .then((res) => {
        console.log("PG DETAILS 👉", res.data);
        setPg(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h3 className="center">Loading PG details...</h3>;
  if (!pg) return <h3 className="center">PG not found</h3>;

  return (
    <div className="pg-details-page">

      {/* Header */}
      <div className="pg-header">
        <h1>{pg.name}</h1>
        <p>📍 {pg.city}, {pg.address}</p>
        <span className="pg-type">{pg.pgType}</span>
      </div>

      {/* Basic Info */}
      <div className="pg-info-card">
        <p><b>Deposit:</b> ₹{pg.deposit}</p>
        <p><b>Food Available:</b> {pg.food ? "Yes" : "No"}</p>
        <p><b>Contact:</b> {pg.contact}</p>
      </div>

      {/* Amenities */}
      <div className="pg-section">
        <h3>Amenities</h3>
        <p>{pg.amenities || "Not mentioned"}</p>
      </div>

      {/* Rules */}
      <div className="pg-section">
        <h3>PG Rules</h3>
        <p>{pg.rules || "No rules specified"}</p>
      </div>

      {/* Rooms */}
      <div className="pg-section">
        <h3>Room Details</h3>

        {pg.rooms && pg.rooms.length > 0 ? (
          <table className="room-table">
            <thead>
              <tr>
                <th>Room No</th>
                <th>Sharing</th>
                <th>Rent / Bed</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {pg.rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.sharing}</td>
                  <td>₹{room.rent}</td>
                  <td>
                    {room.availableBeds} / {room.totalBeds}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rooms available</p>
        )}
      </div>

      {/* Actions */}
      <div className="pg-actions">
        <a href={`tel:${pg.contact}`} className="call-btn">
          📞 Call Owner
        </a>

        <button
  className="book-btn"
  onClick={() =>
    navigate("/tenant/confirm-stay", { state: { pg } })
  }
>
 🔐 Login to Book
</button>

        
      </div>

    </div>
  );
}

export default PgDetails;