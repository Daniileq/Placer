/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Settings.css';

function Settings() {
  const [avatar, setAvatar] = useState(null);
  const user = useSelector((state) => state.user.data);

  function settingsSubmit(event) {
    event.preventDefault();
    const data = {
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
  }

  return (
        <>
      <div>
        <h2>Настройки пользователя</h2>
        <br />
        <br />

        <form onSubmit={settingsSubmit} className="userSettingsForm">

          <div className='avatar'>
            {
              avatar
                ? <img className='avatar' src={avatar} alt='avatar' />
                : <img className='avatar' src='avatar.png' alt='avatar' />
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

          <input type="text" name="displayName" placeholder="Имя" defaultValue={user.displayName} required />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            pattern="^\S+@\S+\.\S+$"
            title='Почта должна быть указана в формате email@mail.com'
            defaultValue={user.email}
            required
          />
          <br />
          <input type="text" name="login" placeholder="Login" defaultValue={user.login} required />
          <br />
          <select name="city">
            <option>Санкт-Петербург</option>
            <option>Москва</option>
            <option>Казань</option>
            <option>Саратов</option>
            <option>Челябинск</option>
            <option>Калининград</option>
            <option>Великий Новгород</option>
          </select>
          <br />
          <select name="sex">
            <option>Мужской</option>
            <option>Женский</option>
            <option>Небинарный</option>
            <option></option>
          </select>
          <br />
          <input type="text" name="age" placeholder="Возраст" defaultValue={user.age} />
          <br />
          <input type="text" name="about" placeholder="О себе" defaultValue={user.about} />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы"
            required
          />
          <br />
          <input
            type="password"
            name="repeatPass"
            placeholder="Повторите пароль"
            required
          />
          {/* { helpMessage && <div className="helpText">{helpMessage}</div>} */}
          <br />
          <button type='submit'>Сохранить</button>
        </form>
      </div>
    </>
  );
}

export default Settings;
