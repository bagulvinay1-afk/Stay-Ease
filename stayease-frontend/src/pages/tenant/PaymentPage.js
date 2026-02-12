import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import axios from "axios";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { pg, roomType, duration, rent, deposit, total } =
    location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  if (!pg) {
    return <h2 className="center">No booking data found</h2>;
  }

  const handlePayment = async () => {
    // 1️⃣ Create Razorpay order via backend
    const res = await axios.post(
      "http://localhost:8080/api/payments/create-order",
      {
        amount: total,
        paymentMode: paymentMethod,
      }
    );

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_SBC0p7jaIn6tem", // ✅ ONLY Key ID
      amount: res.data.amount,
      currency: "INR",
      name: "StayEase PG",
      description: "PG Booking Payment",
      order_id: res.data.orderId,

      handler: async function (response) {
        // 2️⃣ Inform backend about success
        await axios.post(
          "http://localhost:8080/api/payments/success",
          {
            paymentId: res.data.paymentId,
            razorpayPaymentId: response.razorpay_payment_id,
          }
        );

        // 3️⃣ Navigate to success page
        navigate("/tenant/booking-success", {
  state: {
    pg,
    roomType,
    duration,
    total,
    paymentId: res.data.paymentId,
    razorpayPaymentId: response.razorpay_payment_id,
  },
});

      },

      theme: {
        color: "#4f46e5",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-page">
      <h2 className="payment-title">💳 Complete Your Payment</h2>

      <div className="payment-container">
        {/* LEFT : SUMMARY */}
        <div className="summary-card">
          <h3>Booking Summary</h3>

          <p><b>PG:</b> {pg.name}</p>
          <p><b>Room Type:</b> {roomType}</p>
          <p><b>Duration:</b> {duration}</p>

          <div className="price-row">
            <span>Rent</span>
            <span>₹{rent}</span>
          </div>

          <div className="price-row">
            <span>Deposit</span>
            <span>₹{deposit}</span>
          </div>

          <hr />

          <div className="price-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* RIGHT : PAYMENT */}
        <div className="payment-card">
          <h3>Select Payment Method</h3>

          {["UPI", "DEBIT", "CREDIT", "NET"].map((mode) => (
            <label className="radio-option" key={mode}>
              <input
                type="radio"
                name="paymentMethod"
                value={mode}
                checked={paymentMethod === mode}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {mode}
            </label>
          ))}

          <button className="pay-btn" onClick={handlePayment}>
            Pay ₹{total}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
