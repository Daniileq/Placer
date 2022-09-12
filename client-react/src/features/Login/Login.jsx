import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, disableHelpMessage } from '../../store/userSlice/userSlice';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const helpMessage = useSelector((state) => state.user.helpMessage);
  const navigate = useNavigate();

  // Удаление helpMessage при размонтировании компонента
  useEffect(() => () => {
    dispatch(disableHelpMessage());
  }, [dispatch]);

  function loginSubmit(event) {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    dispatch(loginUser(data));
  }

  useEffect(() => {
    if (isUser) {
      navigate('/');
    }
  }, [isUser, navigate]);

  return (
    <>
      <div className="App">
        <div className="login_form_conteiner">
          <form className="login_form" onSubmit={loginSubmit}>
            <h4>Вход</h4>
            <label htmlFor="emailInput" >Email</label>
              <input
                className='font_caption'
                type="email"
                name="email"
                id='emailInput'
                placeholder="Email"
                pattern="^\S+@\S+\.\S+$"
                title='Почта должна быть указана в формате email@mail.com'
                required
              />
            <label htmlFor="passwordInput">Пароль</label>
              <input
                className='font_caption'
                type="password"
                name="password"
                id='passwordInput'
                placeholder="Пароль"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы"
                required
              />
            { helpMessage && <div className="helpText">{helpMessage}</div>}
            <button className='login_btn' type="submit">
              Войти
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
