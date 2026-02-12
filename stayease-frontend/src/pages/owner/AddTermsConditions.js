import { useEffect, useState } from "react";
import axios from "axios";
import "./AddTermsConditions.css";

function AddTermsConditions() {
  const [pgs, setPgs] = useState([]);
  const [selectedPg, setSelectedPg] = useState("");
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPgs();
  }, []);

  const fetchPgs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/pgs");
      setPgs(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load PGs ❌");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPg || !terms.trim()) {
      alert("Please select PG and enter terms & conditions");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:8080/api/pgs/${selectedPg}/terms`, {
        termsAndConditions: terms,
      });
      alert("Terms & Conditions saved successfully ✅");
      setTerms("");
      setSelectedPg("");
    } catch (err) {
      console.log(err);
      alert("Failed to save terms ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="terms-main">
      <h2>📜 Add PG Terms & Conditions</h2>

      <form className="terms-card" onSubmit={handleSubmit}>
        <label>Select PG</label>
        <select
          value={selectedPg}
          onChange={(e) => setSelectedPg(e.target.value)}
        >
          <option value="">-- Select PG --</option>
          {pgs.map((pg) => (
            <option key={pg.id} value={pg.id}>
              {pg.name} - {pg.city}
            </option>
          ))}
        </select>

        <label>Terms & Conditions</label>
        <textarea
          rows="8"
          placeholder="Example:
• Rent must be paid before 5th of every month
• No smoking & alcohol inside PG
• Visitors allowed till 9 PM
• Maintain cleanliness..."
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Terms & Conditions"}
        </button>
      </form>
    </div>
  );
}

export default AddTermsConditions;