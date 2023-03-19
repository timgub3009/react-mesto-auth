import React from "react";
import useFormValidation from "../hooks/useFormValidation";

function Login(props) {
  const { values, handleChange, setValues } = useFormValidation({});

  React.useEffect(() => {
    setValues(values);
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault(evt);

    props.onLogin(values);
  }

  return (
    <section className="login">
      <h2 className="login__title"></h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="login" className="login__label">
          <input
            className="login__input login__input_type_email"
            type="email"
            name="login"
            id="login"
            placeholder="Email"
            value={values.email || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password" className="login__label">
          <input
            className="login__input login__input_type_password"
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            value={values.password || ''}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
