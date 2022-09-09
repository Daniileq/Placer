// eslint-disable-next-line quotes
import { NavLink } from "react-router-dom";
// eslint-disable-next-line quotes
import logo from "./img/logo.png";
// eslint-disable-next-line quotes
import "./Navigation.css";

function Navigation() {
  return (
    <div>
      <div className="header_navigathion">
        <div className="">
          <NavLink className="header_nav_log_placer" to="/">
            <img src={logo} alt="placer" />
          </NavLink>
        </div>
        <div>
          <button className="header_button_reg">
            <NavLink className="header_registragion" to="/">
              Регистрация
            </NavLink>
          </button>
        </div>
      </div>
      <div className="nav_center">
        <div>Места</div>
        <div>Projects</div>
        <div>Blog</div>
        <div>Войти</div>
      </div>
    </div>
  );
}

export default Navigation;
