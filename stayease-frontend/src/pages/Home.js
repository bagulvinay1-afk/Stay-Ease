import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to StayEase</h1>
        <p>Simple & smart way to manage local PGs</p>

        <button onClick={() => navigate("/find-pg")}>
          Explore PGs
        </button>
      </section>

      <section className="info">
        <div className="card">
          <h2>Our Mission</h2>
          <p>
            To make PG management simple, organized,
            and stress-free for both owners and students.
          </p>
        </div>

        <div className="card">
          <h2>Our Vision</h2>
          <p>
            To connect local PGs digitally and create
            a trusted accommodation platform.
          </p>
        </div>

        <div className="card">
          <h2>Why StayEase?</h2>
          <p>
            Easy room tracking, student records, and
            smooth communication in one system.
          </p>
        </div>
        <section id="home">...</section>
<section id="mission">...</section>
<section id="vision">...</section>
<section id="contact">...</section>

      
          </section>  {/* end of info section */}

          {/* FOOTER */}
      <footer className="footer">
        <div className="footer-contact">
          <p>
            <span>📧 support@stayease.com</span> | 
            <span>📞 +91 98765 43210</span> | 
            <span>💬 WhatsApp: +91 98765 43210</span>
          </p>
        </div>
        <div className="footer-copy">
          <p>© {new Date().getFullYear()} StayEase. All rights reserved.</p>
        </div>
      </footer>

  </div>   // <-- existing closing div of home

    
    
  );
}

export default Home;