import "./PgRoomBooking.css";

const PgRoomBooking = () => {
  return (
    <div className="booking-container">
      <div className="booking-card">

        {/* Top Section */}
        <div className="top-section">
          <img
            src="https://images.unsplash.com/photo-1501117716987-c8e1ecb210b9"
            alt="PG"
            className="pg-image"
          />

          <div className="pg-info">
            <h2>Grukrupa Girls PG</h2>
            <p><b>Location:</b> Beed</p>
            <p><b>Address:</b> Near Bus Stand, Beed</p>

            <div className="owner-info">
              <p><b>Owner Name:</b> Manisha</p>
              <p><b>Contact:</b> 9876543210</p>
              <p><b>Email:</b> stayease@gmail.com</p>
            </div>
          </div>
        </div>

        <hr />

        {/* Bottom Section */}
        <div className="bottom-section">
          {/* Room Details */}
          <div className="room-details">
            <h3>Room Details</h3>
            <p><b>Room No:</b> 102 (Shared)</p>
            <p><b>Room For:</b> Girls</p>
            <p><b>Price:</b> ₹5000 / bed</p>
            <p><b>Total Beds:</b> 3</p>

            <select>
              <option>Select Bed</option>
              <option>Bed 1</option>
              <option>Bed 2</option>
              <option>Bed 3</option>
            </select>
          </div>

          {/* Booking Section */}
          <div className="booking-details">
            <h3>Booking Details</h3>

            <div className="row">
              <select>
                <option>Start Month</option>
                <option>Jan</option>
                <option>Feb</option>
              </select>

              <select>
                <option>Start Year</option>
                <option>2025</option>
                <option>2026</option>
              </select>
            </div>

            <div className="row">
              <select>
                <option>End Month</option>
                <option>Jun</option>
                <option>Dec</option>
              </select>

              <select>
                <option>End Year</option>
                <option>2025</option>
                <option>2026</option>
              </select>
            </div>

            <div className="btn-group">
              <button className="check-btn">Check Availability</button>
              <button className="book-btn">Book Room</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PgRoomBooking;