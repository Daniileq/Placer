/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './UserSettingsPage.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeUser,
  changeUserPhoto,
  disableHelpMessage,
} from '../../store/userSlice/userSlice';
import avatar from './images/avatar.png';

function UserSettingsPage() {
  const [upload, setUpload] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const helpMessage = useSelector((state) => state.user.helpMessage);

  useEffect(
    () => () => {
      dispatch(disableHelpMessage());
    },
    [dispatch],
  );

  const photoUpload = (event) => {
    // setUpload(event.target.files[0]);
    const data = new FormData();
    data.append('photo', event.target.files[0]);
    dispatch(changeUserPhoto({ data, userId: user.id }));
  };

  const settingsSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch(changeUser({ data, userId: user.id }));
  };

  return (
    <>
      <div className="profile_container">
        <div className="profile_content">
          <div className="backbtn">
            <NavLink to={`/${user.login}`}>Назад</NavLink>
          </div>
          <div className="profile">
            <div className="user_info">
              <div className="photo_container">
                {user.photo && <img src={user.photo} alt="фото" className='user_change_photo' />}
                {!user.photo && <img src={avatar} alt="фото" className='user_change_photo' />}

                <div className="input-file-row">
                <label className="input-file">
                  <input
                    name="photo"
                    className="photoInput"
                    type="file"
                    accept="image/*,.png,.jpg,.jpeg"
                    onChange={photoUpload}
                  />
                  <span>+</span>
                  </label>
                  {/* <div className="input-file-list"></div> */}
                </div>
              </div>
              {/* <button onClick={photoUpload} className="user_settings_btn" type="button">
                Изменить фото
              </button> */}
            </div>
            <div className="user_data">
              <form onSubmit={settingsSubmit} className="user_settings_form">
                <h4 className="my_data">Редактирование пользователя</h4>

                <div className="field">
                  <label htmlFor="nameInput">Имя:</label>
                  <input
                    type="text"
                    name="displayName"
                    id="nameInput"
                    placeholder="Имя"
                    defaultValue={user.displayName}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="emailInput">Email:</label>
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
                </div>

                <div className="field">
                  <label htmlFor="loginInput">Login:</label>
                  <input
                    type="text"
                    name="login"
                    id="loginInput"
                    placeholder="Login"
                    defaultValue={user.login}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="cityInput">Город:</label>
                  <select name="city" id="cityInput" defaultValue={user.city}>
                    <option>Санкт-Петербург</option>
                    <option>Москва</option>
                    <option>Казань</option>
                    <option>Саратов</option>
                    <option>Челябинск</option>
                    <option>Калининград</option>
                    <option>Великий Новгород</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="sexInput">Пол:</label>
                  <select name="sex" id="sexInput" defaultValue={user.sex}>
                    <option>Мужской</option>
                    <option>Женский</option>
                    <option>Небинарный</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="aboutInput">Возраст:</label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    name="age"
                    id="aboutInput"
                    placeholder="Возраст"
                    defaultValue={user.age}
                  />
                </div>

                <div className="field">
                  <label htmlFor="tgUsername">Ссылка на телеграмм:</label>
                  <input
                    type="text"
                    name="tgUsername"
                    id="tgUsername"
                    placeholder="Ссылка на телеграмм"
                    defaultValue={user.tgUsername}
                  />
                </div>

                <div className="field">
                  <label htmlFor="aboutInput">О себе:</label>
                  <textarea
                    type="text"
                    name="about"
                    id="aboutInput"
                    className="about_input"
                    placeholder="О себе"
                    defaultValue={user.about}
                  />
                </div>

                <div className="field">
                  <label htmlFor="passwordInput">Пароль:</label>
                  <input
                    type="password"
                    name="password"
                    id="passwordInput"
                    placeholder="Новый пароль"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы"
                  />
                </div>

                <div className="field">
                  <label htmlFor="repeatPassInput">Повторите пароль:</label>
                  <input
                    type="password"
                    name="repeatPass"
                    id="repeatPassInput"
                    placeholder="Повторите пароль"
                  />
                </div>

                {helpMessage && (
                  <div className="helpText" style={{ color: 'red' }}>
                    {helpMessage}
                  </div>
                )}

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
