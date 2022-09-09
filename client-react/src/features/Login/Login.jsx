function Login() {
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
