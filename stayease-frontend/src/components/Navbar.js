import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const isTenantPage = location.pathname.startsWith("/tenant");
  const isOwnerPage = location.pathname.startsWith("/owner");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        StayEase
      </div>

      <ul className="nav-links">
        <li onClick={() => navigate("/")}>Home</li>
        <li>Mission</li>
        <li>Vision</li>
        <li>Contact</li>
      </ul>

      <div className="nav-right">
        {user && (isTenantPage || isOwnerPage) ? (
          <div className="user-section">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <span className="user-name">Hi, {user.name}</span>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
