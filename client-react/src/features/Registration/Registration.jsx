import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { regUser, disableHelpMessage } from '../../store/userSlice/userSlice';
import './Registration.css';

function Registration() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const helpMessage = useSelector((state) => state.user.helpMessage);
  const navigate = useNavigate();

  // Удаление helpMessage при размонтировании компонента
  useEffect(() => () => {
    dispatch(disableHelpMessage());
  }, [dispatch]);

  function regSubmit(event) {
    event.preventDefault();
    const data = {
      displayName: event.target.displayName.value,
      email: event.target.email.value,
      login: event.target.login.value,
      city: event.target.city.value,
      password: event.target.password.value,
      repeatPass: event.target.repeatPass.value,
    };
    dispatch(regUser(data));
  }

  useEffect(() => {
    if (isUser) {
      navigate('/');
    }
  }, [isUser, navigate]);

  return (
    <div className='registration_container'>
      <div className='registration_form_div'>
        <form className="registration_form" onSubmit={regSubmit}>
          <h4>Регистрация</h4>

          <label htmlFor="nameInput">Имя</label>
          <input type="text" name="displayName" id='nameInput' placeholder="Имя" required />

          <label htmlFor="emailInput" >Email</label>
          <input
            type="email"
            name="email"
            id='emailInput'
            placeholder="Email"
            pattern="^\S+@\S+\.\S+$"
            title='Почта должна быть указана в формате email@mail.com'
            required
          />

          <label htmlFor="loginInput">Login</label>
          <input type="text" name="login" id='loginInput' placeholder="Login" required />

          <label htmlFor="cityInput">Город</label>
          <select className='select-css' id='cityInput' name="city">
            <option>Санкт-Петербург</option>
            <option>Москва</option>
            <option>Казань</option>
            <option>Саратов</option>
            <option>Челябинск</option>
            <option>Калининград</option>
            <option>Великий Новгород</option>
          </select>

          <label htmlFor="passwordInput">Пароль</label>
          <input
            type="password"
            name="password"
            id='passwordInput'
            placeholder="Пароль"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы"
            required
          />

          <label htmlFor="repeatPassInput">Повторите пароль</label>
          <input
            type="password"
            name="repeatPass"
            id='repeatPassInput'
            placeholder="Повторите пароль"
            required
          />
          { helpMessage && <div className="helpText">{helpMessage}</div>}
          <button className='registration_btn' type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
