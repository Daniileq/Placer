import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { regUser, disableHelpMessage } from '../../store/userSlice/userSlice';
import './Registration.css';

function Registration() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const helpMessage = useSelector((state) => state.user.helpMessage);
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);

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

  const toggleBtn = () => {
    setState((prev) => !prev);
  };

  const toggleBtn2 = () => {
    setState2((prev) => !prev);
  };

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
            <option>Грозный</option>
            <option>Калининград</option>
            <option>Великий Новгород</option>
          </select>

          <label htmlFor="passwordInput">Пароль</label>
          <div className='password_input'>
          <input
            type={state ? 'text' : 'password'}
            name="password"
            id='passwordInput'
            placeholder="Пароль"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы"
            required
          />
            <button type='button' onClick={toggleBtn} className="password_btn">
              { state ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }
            </button>
          </div>

            <label htmlFor="repeatPassInput">Повторите пароль</label>
            <div className='password_input'>
            <input
              type={state2 ? 'text' : 'password'}
              name="repeatPass"
              id='repeatPassInput'
              placeholder="Повторите пароль"
              required
            />
            <button type='button' onClick={toggleBtn2} className="password_btn">
                { state2 ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }
            </button>
          </div>

          { helpMessage && <div className="helpText">{helpMessage}</div>}
          <button className='registration_btn font_button' type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
