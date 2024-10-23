import style from "../styles/navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <ul>
        <li>
          <h1>InfoCards</h1>
        </li>
        <li>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            Create Card
          </NavLink>
        </li>
        <li>
          <NavLink to="/read">All Cards</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
