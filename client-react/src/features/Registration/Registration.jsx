import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();

  async function regaSubmit(event) {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const email = event.target.email.value;
    const login = event.target.login.value;
    const city = event.target.city.value;
    const password = event.target.password.value;
    const repeatPass = event.target.repeatPass.value;

    const response = await fetch('/auth/registration', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        displayName,
        email,
        login,
        city,
        password,
        repeatPass,
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
      <div>
        <h1>Регистрация</h1>
        <br />
        <br />

        <form onSubmit={regaSubmit}>
          <input type="text" name="displayName" placeholder="Имя" required />
          <input
            type="email"
            name="email"
            placeholder="Email"
            pattern="^\S+@\S+\.\S+$"
            title='Почта должна быть указана в формате email@mail.com'
            required
          />
          <input type="text" name="login" placeholder="Login" required />

          <select name="city">
            <option>Санкт-Петербург</option>
            <option>Москва</option>
            <option>Казань</option>
            <option>Саратов</option>
            <option>Челябинск</option>
            <option>Калининград</option>
            <option>Великий Новгород</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы"
            required
          />
          <input
            type="password"
            name="repeatPass"
            placeholder="Повторите пароль"
            required
          />
          <div className="helpText" />
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </>
  );
}

export default Registration;
