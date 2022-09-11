// eslint-disable-next-line quotes
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line quotes
import logo from "./img/logo.png";
// eslint-disable-next-line quotes
import "./Navigation.css";
import { logoutUser } from '../../store/userSlice/userSlice';

function Navigation() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <div className="header_navigathion">
          <NavLink className="header_nav_log_placer" to="/">
            <img src={logo} alt="placer" />
          </NavLink>
        <div>
          {!isUser
          && <>
              <button className="header_button_reg">
                <NavLink className="header_registragion font_button_small" to="/login">
                  Войти
                </NavLink>
              </button>
              <button className="header_button_reg">
                <NavLink className="header_registragion font_button_small" to="/registration">
                  Регистрация
                </NavLink>
              </button>
            </>}
          {isUser && <button onClick={logout} className="header_button_reg font_button_small">Выйти</button>}
        </div>
      </div>
      <div className="nav_center">
        <div className="font_button">Места</div>
        <div className="font_button">Проекты</div>
        <div className="font_button">Блог</div>
      </div>
    </div>
  );
}

export default Navigation;
