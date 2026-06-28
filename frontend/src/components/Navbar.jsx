import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>AI Interview Platform</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/create-interview">
          <button>Create Interview</button>
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;