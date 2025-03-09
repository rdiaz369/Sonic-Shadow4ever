import { Link } from "react-router-dom";
import "../CSS/nav.css"; 

const NavBar = () => {
  return (
    <nav>
      <div className="nav-container">
        <h1 id="title">Green Hills</h1>
        <div>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/order">Order</Link></li>
            <li><Link to="/rings">Rings</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
