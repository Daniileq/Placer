/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useEffect } from 'react';
import './UserSettingsPage.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser, disableHelpMessage } from '../../store/userSlice/userSlice';
import avatar from './images/avatar.png';

function UserSettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const helpMessage = useSelector((state) => state.user.helpMessage);

  useEffect(() => () => {
    dispatch(disableHelpMessage());
  }, [dispatch]);

  const settingsSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch(changeUser({ data, userId: user.id }));
    navigate('/profile');
  };

  return (
    <>
      <div className="profile_container">
        <div className="profile_content">
          <div className="backbtn">
            <NavLink to="/profile">
              Назад
            </NavLink>
          </div>
          <div className="profile">
            <div className="user_info">
              {user.photo && (
                <img src={user.photo} alt="фото" className="user_photo" />
              )}
              {!user.photo && (
                <img src={avatar} alt="фото" className="user_photo" />
              )}
            </div>
            <div className="user_data">
              <form onSubmit={settingsSubmit} className="user_settings_form">
                <h4>Редактирование пользователя</h4>

                <input
                  name="photo"
                  className="photoInput"
                  type="file"
                  accept="image/*,.png,.jpg,.jpeg"
                />

                <label htmlFor="nameInput">Имя</label>
                <input
                  type="text"
                  name="displayName"
                  id="nameInput"
                  placeholder="Имя"
                  defaultValue={user.displayName}
                  required
                />

                <label htmlFor="emailInput">Email</label>
                <input
                  type="email"
                  name="email"
                  id="emailInput"
                  placeholder="Email"
                  pattern="^\S+@\S+\.\S+$"
                  title="Почта должна быть указана в формате email@mail.com"
                  defaultValue={user.email}
                  required
                />

                <label htmlFor="loginInput">Login</label>
                <input
                  type="text"
                  name="login"
                  id="loginInput"
                  placeholder="Login"
                  defaultValue={user.login}
                  required
                />

                <label htmlFor="cityInput">Город</label>
                <select name="city" id="cityInput" defaultValue={user.city}>
                  <option>Санкт-Петербург</option>
                  <option>Москва</option>
                  <option>Казань</option>
                  <option>Саратов</option>
                  <option>Челябинск</option>
                  <option>Калининград</option>
                  <option>Великий Новгород</option>
                </select>

                <label htmlFor="sexInput">Пол</label>
                <select name="sex" id="sexInput" defaultValue={user.sex}>
                  <option>Мужской</option>
                  <option>Женский</option>
                  <option>Небинарный</option>
                </select>

                <label htmlFor="aboutInput">Возраст</label>
                <input
                  type="number"
                  name="age"
                  id="aboutInput"
                  placeholder="Возраст"
                  defaultValue={user.age}
                />

                <label htmlFor="aboutInput">Расскажи о себе</label>
                <textarea
                  type="text"
                  name="about"
                  id="aboutInput"
                  className="about_input"
                  placeholder="О себе"
                  defaultValue={user.about}
                />

                <label htmlFor="passwordInput">Пароль</label>
                <input
                  type="password"
                  name="password"
                  id="passwordInput"
                  placeholder="Новый пароль"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы"
                />

                <label htmlFor="repeatPassInput">Повторите пароль</label>
                <input
                  type="password"
                  name="repeatPass"
                  id="repeatPassInput"
                  placeholder="Повторите пароль"
                />
                {helpMessage && <div className="helpText">{helpMessage}</div>}

                <button className="user_settings_btn" type="submit">
                  Сохранить
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSettingsPage;
