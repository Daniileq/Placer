import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  async function loginSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const response = await fetch('/auth/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.message === 'success') {
      navigate('/');
    } else {
      document.querySelector('.helpText').innerText = data.message;
    }
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Вход</h1>
          <br />
          <form className="loginForm" onSubmit={loginSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              pattern="^\S+@\S+\.\S+$"
              title='Почта должна быть указана в формате email@mail.com'
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы"
              required
            />
            <div className="helpText" />
            <button type="submit">
              Войти
            </button>
          </form>
        </header>
      </div>
    </>
  );
}

export default Login;
