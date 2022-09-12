// eslint-disable-next-line quotes
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
// eslint-disable-next-line quotes
import logo from './img/logo.png';
// eslint-disable-next-line quotes
import './Navigation.css';
import { logoutUser } from '../../store/userSlice/userSlice';

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUser = useSelector((state) => state.user.isUser);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="nav_container">
      <div className="header_navigathion">
        <NavLink className="header_nav_log_placer" to="/">
          <img src={logo} alt="placer" />
        </NavLink>
        <div className="nav_center">
          <NavLink to="/" className="font_button">Места</NavLink>
          {isUser && <NavLink to="/profile" className="font_button">Профиль</NavLink>}
          <NavLink to="#" className="font_button">Блог</NavLink>
        </div>
        <div>
          {!isUser && (
            <>
              <button className="header_button_reg" onClick={() => navigate('/login')}>
                  Войти
              </button>
              <button className="header_button_reg" onClick={() => navigate('/registration')}>
                  Регистрация
              </button>
            </>
          )}
          {isUser && (
            <>
              <NavLink className="" to="/myplace">
                Добавить место
              </NavLink>
              <button
                onClick={logout}
                className="header_button_reg font_button_small"
              >
                Выйти
              </button>{' '}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
