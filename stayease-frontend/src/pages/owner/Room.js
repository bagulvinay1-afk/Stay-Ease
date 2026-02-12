import { useState } from "react";
import "./Room.css";

function RoomForm({ onAddRoom }) {
  const [room, setRoom] = useState({
    roomNo: "",
    sharing: "",
    rentPerBed: "",
    totalBeds: "",
    availableBeds: ""
  });

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const addRoom = () => {
    if (
      !room.roomNo ||
      !room.sharing ||
      !room.rentPerBed ||
      !room.totalBeds ||
      !room.availableBeds
    ) {
      alert("Please fill all room fields ❌");
      return;
    }

    onAddRoom(room);

    setRoom({
      roomNo: "",
      sharing: "",
      rentPerBed: "",
      totalBeds: "",
      availableBeds: ""
    });
  };

  return (
    <div className="room-form-box">
      <h3>➕ Add Room</h3>

      <div className="room-grid">
        <input name="roomNo" placeholder="Room No" value={room.roomNo} onChange={handleChange} />
        <input name="sharing" placeholder="Sharing (1/2/3)" value={room.sharing} onChange={handleChange} />
        <input name="rentPerBed" placeholder="Rent per bed" value={room.rentPerBed} onChange={handleChange} />
        <input name="totalBeds" placeholder="Total beds" value={room.totalBeds} onChange={handleChange} />
        <input name="availableBeds" placeholder="Available beds" value={room.availableBeds} onChange={handleChange} />
      </div>

      <button type="button" onClick={addRoom}>
        Add Room
      </button>
    </div>
  );
}

export default RoomForm;
