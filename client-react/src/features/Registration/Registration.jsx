function Registration() {
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
