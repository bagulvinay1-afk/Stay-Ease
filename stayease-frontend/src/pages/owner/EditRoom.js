import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditRoom.css";

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomNumber: "",
    sharing: "",
    rent: "",
    totalBeds: "",
    availableBeds: ""
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/rooms/${id}`);

      setRoom({
        roomNumber: res.data.roomNumber,
        sharing: res.data.sharing,
        rent: res.data.rent,
        totalBeds: res.data.totalBeds,
        availableBeds: res.data.availableBeds
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to load room ❌");
    }
  };

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/rooms/${id}`, room);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Failed to update room ❌");
    }
  };

  if (loading) return <h2 className="loading">Loading room...</h2>;

  return (
    <div className="edit-room-container">

      {/* 🔙 Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/owner/ViewPGList")}
      >
        ⬅ Back
      </button>

      <h2>✏️ Edit Room</h2>

      {success && (
        <div className="success-msg">
          ✅ Room updated successfully
        </div>
      )}

      <form onSubmit={handleSubmit} className="edit-room-form">
        <table className="edit-room-table">
          <tbody>

            <tr>
              <td>Room Number</td>
              <td>
                <input
                  name="roomNumber"
                  value={room.roomNumber}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Sharing</td>
              <td>
                <input
                  type="number"
                  name="sharing"
                  value={room.sharing}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Rent / Bed</td>
              <td>
                <input
                  type="number"
                  name="rent"
                  value={room.rent}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Total Beds</td>
              <td>
                <input
                  type="number"
                  name="totalBeds"
                  value={room.totalBeds}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Available Beds</td>
              <td>
                <input
                  type="number"
                  name="availableBeds"
                  value={room.availableBeds}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

          </tbody>
        </table>

        <button type="submit" className="update-btn">
          Update Room
        </button>
      </form>
    </div>
  );
}

export default EditRoom;
