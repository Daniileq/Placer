/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import './UserSettingsPage.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../../store/userSlice/userSlice';

function UserSettingsPage() {
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const helpMessage = useSelector((state) => state.user.helpMessage);

  function settingsSubmit(event) {
    event.preventDefault();
    const data = {
      id: user.id,
      displayName: event.target.displayName.value,
      email: event.target.email.value,
      login: event.target.login.value,
      city: event.target.city.value,
      sex: event.target.sex.value,
      age: event.target.age.value,
      about: event.target.about.value,
      password: event.target.password.value,
      repeatPass: event.target.repeatPass.value,
    };
    console.log(data);
    dispatch(changeUser(data));
  }

  return (
        <>
      <div>
        <form onSubmit={settingsSubmit} className="user_settings_form">
          <h4>Настройки пользователя</h4>

          <div className='avatar'>
            {
              avatar
                ? <img className='user_photo' src={avatar} alt='avatar' />
                : <img className='user_photo' src='avatar.png' alt='avatar' />
            }
          </div>

          {/* <button onClick={handlePick}>Выбрать фото</button>
          <input
            name="photo"
            className='photoInput'
            type="file"
            accept='image/*,.png,.jpg,.jpeg'
            ref={filePicker}
            onChange={(e) => selectedFile(e.target.files[0]) }
          />
          <br />
          <button type="submit" onClick={handleUpload}>Сохранить</button> */}

          <label htmlFor="nameInput">Имя</label>
          <input type="text" name="displayName" id='nameInput' placeholder="Имя" defaultValue={user.displayName} required />

          <label htmlFor="emailInput" >Email</label>
          <input
            type="email"
            name="email"
            id='emailInput'
            placeholder="Email"
            pattern="^\S+@\S+\.\S+$"
            title='Почта должна быть указана в формате email@mail.com'
            defaultValue={user.email}
            required
          />

          <label htmlFor="loginInput">Login</label>
          <input type="text" name="login" id='loginInput' placeholder="Login" defaultValue={user.login} required />

          <label htmlFor="cityInput">Город</label>
          <select name="city" id='cityInput' defaultValue={user.city}>
            <option>Санкт-Петербург</option>
            <option>Москва</option>
            <option>Казань</option>
            <option>Саратов</option>
            <option>Челябинск</option>
            <option>Калининград</option>
            <option>Великий Новгород</option>
          </select>

          <label htmlFor="sexInput">Пол</label>
          <select name="sex" id='sexInput' defaultValue={user.sex}>
            <option>Мужской</option>
            <option>Женский</option>
            <option>Небинарный</option>
          </select>

          <label htmlFor="aboutInput">Возраст</label>
          <input type="number" name="age" id='aboutInput' placeholder="Возраст" defaultValue={user.age} />

          <label htmlFor="aboutInput">Расскажи о себе</label>
          <textarea type="text" name="about" id='aboutInput' className='about_input' placeholder="О себе" defaultValue={user.about} />

          <label htmlFor="passwordInput">Пароль</label>
          <input
            type="password"
            name="password"
            id='passwordInput'
            placeholder="Новый пароль"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы"
          />

          <label htmlFor="repeatPassInput">Повторите пароль</label>
          <input
            type="password"
            name="repeatPass"
            id='repeatPassInput'
            placeholder="Повторите пароль"
          />
          { helpMessage && <div className="helpText">{helpMessage}</div>}

          <button className='user_settings_btn' type='submit'>Сохранить</button>
        </form>

      </div>
    </>
  );
}

export default UserSettingsPage;
