import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditPG.css";

function EditPG() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pg, setPg] = useState({
    name: "",
    city: "",
    address: "",
    pgType: "",
    deposit: "",
    food: "",
    contact: "",
    amenities: "",
    rules: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPg();
  }, []);

  const fetchPg = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/pgs/${id}`);
      setPg(res.data);
      setLoading(false);
    } catch (err) {
      alert("Failed to load PG details");
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setPg({ ...pg, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/pgs/${id}`, pg);
      navigate("/owner/ViewPGList");
    } catch (err) {
      alert("Update failed");
      console.log(err);
    }
  };

  if (loading) return <h2>Loading PG...</h2>;

  return (
    <div className="edit-pg-container">

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h2>✏️ Edit PG</h2>

      <form onSubmit={handleSubmit} className="edit-pg-form">
        <input name="name" value={pg.name} onChange={handleChange} required />
        <input name="city" value={pg.city} onChange={handleChange} required />
        <input name="address" value={pg.address} onChange={handleChange} required />

        <select name="pgType" value={pg.pgType} onChange={handleChange}>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
        </select>

        <input type="number" name="deposit" value={pg.deposit} onChange={handleChange} />
        <select name="food" value={pg.food} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input name="contact" value={pg.contact} onChange={handleChange} />
        <input name="amenities" value={pg.amenities} onChange={handleChange} />
        <input name="rules" value={pg.rules} onChange={handleChange} />

        <button type="submit">Update PG</button>
      </form>
    </div>
  );
}

export default EditPG;