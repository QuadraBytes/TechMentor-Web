import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="logo">
          <div className="logo-icon">📚</div>
          TechMentor
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/contact">Contact</Link>
          <div className="user-icon">
          </div>
        </div>
      </div>
    </nav>
  );
};
