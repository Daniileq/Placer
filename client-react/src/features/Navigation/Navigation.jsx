import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  NavLink, useNavigate, Link, useLocation,
} from 'react-router-dom';
import logo from './img/logo.svg';
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

  const location = useLocation();

  useEffect(() => {
    if (!document.querySelector('#menu__toggle').checked) {
      return;
    }
    document.querySelector('.menu__btn').click();
  }, [location]);

  return (
    <div className="nav_container">
      <div className="header_navigation">
        <input
          id="menu__toggle"
          type="checkbox"
        />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>
        <Link className="header_nav_log_placer" to="/">
          <img src={logo} alt="placer" />
        </Link>
        <ul className='menu__box'>
          {isUser ? (
            <>
              <li className='menu__item'><NavLink to="/" className="header_links font_button">Места</NavLink></li>
              <li className='menu__item'><NavLink to={`/${login}`} className="header_links font_button">Профиль</NavLink></li>
              <li className='menu__item'><NavLink to="/favorites" className="header_links font_button">Любимые места</NavLink></li>
              <li className='menu__item'><NavLink to="/togo" className="header_links font_button">Хочу пойти</NavLink></li>
            </>
          ) : (
            <li className='menu__item no_user_place'><NavLink to="/" className="header_links font_button">Места</NavLink></li>
          )}
          {!isUser && (
            <>
              <li className='menu__item'>
                <button className="auth_button font_button" onClick={() => navigate('/login')}>
                  Войти
                </button>
              </li>
              <li className='menu__item reg_button'>
                <button className="auth_button font_button" onClick={() => navigate('/registration')}>
                  Регистрация
                </button>
              </li>
            </>
          )}
          {isUser && (
            <li className='menu__item exit_button'>
              <button
                onClick={logout}
                className="auth_button font_button"
              >
                Выйти
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
