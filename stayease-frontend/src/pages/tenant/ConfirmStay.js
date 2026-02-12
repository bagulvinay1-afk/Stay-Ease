import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmStay.css";

function ConfirmStay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pg } = location.state || {};

  const [roomType, setRoomType] = useState("Double");
  const [duration, setDuration] = useState("Monthly");

  if (!pg) {
    return <h2 className="center">No PG selected</h2>;
  }

  const rentMap = {
    Single: pg.singleRent || 1,
    Double: pg.doubleRent || 1,
    Triple: pg.tripleRent || 1,
  };

  const deposit = pg.deposit || 1;
  const rent = rentMap[roomType];
  const total = rent + deposit;

  return (
    <div className="confirm-container">
      {/* Header */}
      <div className="confirm-header">
        <h2>Confirm Your Stay</h2>
        <p>{pg.name}</p>
      </div>

      {/* Main Card */}
      <div className="confirm-card">
        {/* Left */}
        <div className="left-section">
          <img
            src={pg.imageUrl || "/default-pg.jpg"}
            alt="PG"
            className="pg-image"
          />

          <h3>{pg.name}</h3>
          <p>📍 {pg.address}</p>

          <div className="tags">
            {pg.food && <span>🍽 Food</span>}
            <span>📶 Wi-Fi</span>
            <span>🧺 Laundry</span>
          </div>

          {/* Room Type */}
          <div className="box">
            <h4>Select Room Type</h4>

            {["Single", "Double", "Triple"].map((type) => (
              <label key={type} className="radio">
                <input
                  type="radio"
                  name="room"
                  checked={roomType === type}
                  onChange={() => setRoomType(type)}
                />
                {type} – ₹{rentMap[type]}
              </label>
            ))}
          </div>

          {/* Duration */}
          <div className="box">
            <h4>Stay Duration</h4>
            {["Monthly", "3 Months", "6 Months"].map((d) => (
              <label key={d} className="radio">
                <input
                  type="radio"
                  name="duration"
                  checked={duration === d}
                  onChange={() => setDuration(d)}
                />
                {d}
              </label>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="right-section">
          <h4>Price Breakdown</h4>

          <div className="price-row">
            <span>Monthly Rent</span>
            <span>₹{rent}</span>
          </div>

          <div className="price-row">
            <span>Deposit</span>
            <span>₹{deposit}</span>
          </div>

          <hr />

          <div className="price-total">
            <span>Total Payable</span>
            <span>₹{total}</span>
          </div>

         <button
  className="pay-btn"
  onClick={() =>
    navigate("/tenant/payment", {
      state: {
        pg,
        roomType,
        duration,
        rent,
        deposit,
        total,
      },
    })
  }
>
  Proceed to Payment
</button>

          <button
            className="contact-btn"
            onClick={() => window.location.href = `tel:${pg.contact}`}
          >
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmStay;
