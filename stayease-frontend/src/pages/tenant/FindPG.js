import { useEffect, useState } from "react";
import "./FindPG.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FindPG() {

  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  // ✅ FETCH ALL PGs
  useEffect(() => {
    fetchPGs();
  }, []);

  const fetchPGs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/pgs");
      setPgs(res.data);
    } catch (error) {
      console.error("Error fetching PGs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SEARCH PGs
  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/pgs/search?name=${name}&location=${location}`
      );
      setPgs(res.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ GET MIN RENT FROM ROOMS
  const getMinRent = (rooms) => {
  if (!rooms || rooms.length === 0) return null;
  return Math.min(...rooms.map(room => room.rent)); // ✅ FIX
};

  return (
    <div className="findpg-page">

      {/* ===== TOP SEARCH BAR ===== */}
      <div className="findpg-topbar">
        <h2>🔍 Search Properties</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search PG name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* ===== PG LIST ===== */}
      <div className="pg-container">

        {loading && <p className="loading">Loading PGs...</p>}

        {!loading && pgs.length === 0 && (
          <p className="empty">No PGs found</p>
        )}

        <div className="pg-grid">
          {pgs.map((pg) => (
            <div className="pg-card" key={pg.id}>

              <img
                src={pg.imageUrl || "https://via.placeholder.com/400x200"}
                alt="pg"
              />

              <div className="pg-info">
                <h3>{pg.name}</h3>
                <p className="location">📍 {pg.city}</p>
                <p className="desc">{pg.description || "Comfortable stay with modern facilities"}</p>

                <div className="pg-footer">
                  <span>
                    {getMinRent(pg.rooms)
                      ? `₹${getMinRent(pg.rooms)} / bed`
                      : "Rent not available"}
                  </span>

                  <button onClick={() => navigate(`/pg/${pg.id}`)}>
                    View Details
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default FindPG;