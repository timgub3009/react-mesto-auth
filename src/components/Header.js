import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      <nav className="header__nav">
        <p className="header__login">{props.email}</p>
        <NavLink to={props.link} className="header__link">
          {props.title}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
