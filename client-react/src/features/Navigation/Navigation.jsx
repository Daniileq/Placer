// eslint-disable-next-line quotes
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate, Link } from 'react-router-dom';
// eslint-disable-next-line quotes
import logo from './img/logo.png';
// eslint-disable-next-line quotes
import './Navigation.css';
import { logoutUser } from '../../store/userSlice/userSlice';

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUser = useSelector((state) => state.user.isUser);
  const { login } = useSelector((state) => state.user.data);

  const logout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className="nav_container">
      <div className="header_navigathion">
        <Link className="header_nav_log_placer" to="/">
          <img src={logo} alt="placer" />
        </Link>
        <div className="nav_center">
          <NavLink to="/" className="font_button">Места</NavLink>
          {isUser && <NavLink to={`/${login}`} className="font_button">Профиль</NavLink>}
          {isUser && <NavLink to="/favorites" className="font_button">Избранное</NavLink>}
          {isUser && <NavLink to="/togo" className="font_button">Хочу пойти</NavLink>}
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
              <button
                onClick={logout}
                className="header_button_reg font_button_small"
              >
                Выйти
              </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
