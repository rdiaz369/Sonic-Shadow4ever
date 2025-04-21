import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="nav-container">
        <h1 id="title">Green Hills</h1>
        <div>
          <ul className="nav-list">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            {/* <li><Link to="/characters">Characters</Link></li> */}
            <li><Link to="/order">Order</Link></li>
            <li><Link to="/rings">Rings</Link></li>
            <li><Link to="/profile">Profile</Link></li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
