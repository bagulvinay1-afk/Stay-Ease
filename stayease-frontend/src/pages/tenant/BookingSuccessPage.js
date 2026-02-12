import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSuccessPage.css";

function BookingSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    pg,
    roomType,
    duration,
    total,
    paymentId,
    razorpayPaymentId,
  } = location.state || {};

  if (!pg) {
    return <h2 className="center">No booking found</h2>;
  }

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2>Booking Confirmed!</h2>

        <div className="pg-info">
          <img
            src={pg.image || "https://via.placeholder.com/150"}
            alt="PG"
          />
          <div>
            <h3>{pg.name}</h3>
            <p>📍 {pg.location}</p>
            <p>🛏 Room Type: <b>{roomType}</b></p>
            <p>📆 Duration: {duration}</p>
          </div>
        </div>

        <hr />

        <div className="payment-info">
          <p><b>Amount Paid:</b> ₹{total}</p>
          <p><b>Payment ID:</b> {razorpayPaymentId}</p>
        </div>

        <div className="success-actions">
          <button onClick={() => navigate("/tenant/my-stay")}>
            Go to My Stay
          </button>

          

          <button className="secondary">
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessPage;
