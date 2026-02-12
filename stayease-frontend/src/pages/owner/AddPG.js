import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoomForm from "./Room";
import "./AddPG.css";

function AddPG() {
  const navigate = useNavigate();

  const [pg, setPg] = useState({
    name: "",
    address: "",
    city: "",
    deposit: "",
    pgType: "",
    food: "",
    amenities: "",
    rules: "",
    contact: "",

    singleSharingRent: "",
    doubleSharingRent: "",
    tripleSharingRent: "",

    rooms: []
  });

  const handleChange = (e) => {
    setPg({ ...pg, [e.target.name]: e.target.value });
  };

  // ✅ DUPLICATE ROOM CHECK
  const handleAddRoom = (room) => {
    const exists = pg.rooms.some(
      (r) => r.roomNo.trim() === room.roomNo.trim()
    );

    if (exists) {
      alert(`Room number ${room.roomNo} already exists ❌`);
      return;
    }

    setPg({ ...pg, rooms: [...pg.rooms, room] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pg.rooms.length === 0) {
      alert("Please add at least one room ❌");
      return;
    }

    // ✅ BUILD BACKEND-READY PAYLOAD
    const payload = {
      name: pg.name,
      address: pg.address,
      city: pg.city,
      deposit: Number(pg.deposit),
      pgType: pg.pgType,
      food: pg.food,
      amenities: pg.amenities,
      rules: pg.rules,
      contact: pg.contact,

      singleSharingRent: Number(pg.singleSharingRent),
      doubleSharingRent: Number(pg.doubleSharingRent),
      tripleSharingRent: Number(pg.tripleSharingRent),

      rooms: pg.rooms.map((r) => ({
        roomNumber: r.roomNo,               // ✅ backend field
        sharing: Number(r.sharing),
        rent:
          r.sharing === "1"
            ? Number(pg.singleSharingRent)
            : r.sharing === "2"
            ? Number(pg.doubleSharingRent)
            : Number(pg.tripleSharingRent),
        totalBeds: Number(r.totalBeds),
        availableBeds: Number(r.availableBeds)
      }))
    };

    try {
      await axios.post("http://localhost:8080/api/pgs/add", payload);
      alert("PG Added Successfully ✅");
      navigate("/owner");
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data) {
        alert(err.response.data.message || "Validation failed ❌");
      } else if (err.request) {
        alert("Server not responding ❌");
      } else {
        alert("Something went wrong ❌");
      }
    }
  };

  return (
    <div className="addpg-main">
      <div className="addpg-card">

        <h2>Add New PG</h2>

        <form onSubmit={handleSubmit} className="addpg-form">

          <input name="name" placeholder="PG Name" required onChange={handleChange} />
          <textarea name="address" placeholder="Address" required onChange={handleChange} />
          <input name="city" placeholder="City" required onChange={handleChange} />

          <select name="pgType" required onChange={handleChange}>
            <option value="">PG Type</option>
            <option>Boys</option>
            <option>Girls</option>
            <option>Both</option>
          </select>

          <input type="number" name="deposit" placeholder="Deposit ₹" required onChange={handleChange} />

          <select name="food" required onChange={handleChange}>
            <option value="">Food Facility</option>
            <option>Yes</option>
            <option>No</option>
          </select>

          <input name="contact" placeholder="Contact Number" required onChange={handleChange} />

          <textarea name="amenities" placeholder="Amenities" onChange={handleChange} />
          <textarea name="rules" placeholder="Rules" onChange={handleChange} />

          <h3>Rent Settings</h3>

          <input type="number" name="singleSharingRent" placeholder="1 Sharing Rent" required onChange={handleChange} />
          <input type="number" name="doubleSharingRent" placeholder="2 Sharing Rent" required onChange={handleChange} />
          <input type="number" name="tripleSharingRent" placeholder="3 Sharing Rent" required onChange={handleChange} />

          <RoomForm onAddRoom={handleAddRoom} />

          {pg.rooms.length > 0 && (
            <div className="room-list">
              <h3>Added Rooms</h3>
              {pg.rooms.map((r, i) => (
                <div key={i} className="room-item">
                  🏠 Room {r.roomNo} | {r.sharing}-Sharing
                </div>
              ))}
            </div>
          )}

          <button className="addpg-btn">Add PG</button>

        </form>
      </div>
    </div>
  );
}

export default AddPG;
