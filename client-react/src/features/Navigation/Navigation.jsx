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
        <div className="">
          <NavLink className="header_nav_log_placer" to="/">
            <img src={logo} alt="placer" />
          </NavLink>
        </div>
        <div>
          {!isUser
          && <>
              <button className="header_button_reg">
                <NavLink className="header_registragion" to="/login">
                  Войти
                </NavLink>
              </button>
              <button className="header_button_reg">
                <NavLink className="header_registragion" to="/registration">
                  Регистрация
                </NavLink>
              </button>
            </>}
          {isUser && <button onClick={logout} className="header_button_reg">Выйти</button>}
        </div>
      </div>
      <div className="nav_center">
        <div>Места</div>
        <div>Проекты</div>
        <div>Блог</div>
      </div>
    </div>
  );
}

export default Navigation;
