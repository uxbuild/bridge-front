import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Bridge Front</h1>
      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link> {/* Register button now works */}
      </div>
    </nav>
  );
};

export default Navbar;
