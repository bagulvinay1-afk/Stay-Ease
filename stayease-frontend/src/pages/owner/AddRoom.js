import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddRoom.css";

function AddRoom() {
  const { pgId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomNumber: "",
    sharing: "",
    rent: "",
    totalBeds: "",
    availableBeds: ""
  });

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (Number(room.availableBeds) > Number(room.totalBeds)) {
      alert("Available beds cannot be more than total beds ❌");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/rooms/pg/${pgId}`,
        room
      );

      alert("Room added successfully ✅");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to add room ❌");
    }
  };

  return (
    <div className="add-room-container">

      <div className="add-room-header">
        <h2>➕ Add Room</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="add-room-form">

        <input
          name="roomNumber"
          value={room.roomNumber}
          onChange={handleChange}
          placeholder="Room Number"
          required
        />

        <select
          name="sharing"
          value={room.sharing}
          onChange={handleChange}
          required
        >
          <option value="">Select Sharing</option>
          <option value="1">1 Sharing</option>
          <option value="2">2 Sharing</option>
          <option value="3">3 Sharing</option>
        </select>

        <input
          type="number"
          name="rent"
          value={room.rent}
          onChange={handleChange}
          placeholder="Rent per Bed (₹)"
          required
        />

        <input
          type="number"
          name="totalBeds"
          value={room.totalBeds}
          onChange={handleChange}
          placeholder="Total Beds"
          required
        />

        <input
          type="number"
          name="availableBeds"
          value={room.availableBeds}
          onChange={handleChange}
          placeholder="Available Beds"
          required
        />

        <button type="submit" className="add-btn">
          Add Room
        </button>

      </form>
    </div>
  );
}

export default AddRoom;
