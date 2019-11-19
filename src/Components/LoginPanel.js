import React, { useState } from "react";
import "../Sass/LoginPanel.scss";
import axios from "axios";

const serverLoginURL = "https://jimmyspage.pl/api/login";

function LoginPanel(props) {
  const [emailValue, setEmailValue] = useState("hrosenbaum@example.net");
  const [passwordValue, setPasswordValue] = useState("password");

  const handleLoginRequest = () => {
    axios
      .post(serverLoginURL, {
        username: emailValue,
        password: passwordValue
      })
      .then(res => {
        const token = res.data.access_token;
        localStorage.setItem("access_token", token);
        props.history.push("/home");
      })
      .catch(err => console.log(err));
  };

  const handleSubmitLoginForm = e => {
    e.preventDefault();
    handleLoginRequest();
  };

  return (
    <div className="login-panel">
      <form className="login-panel__form" onSubmit={handleSubmitLoginForm}>
        <h1 className="login-panel__title">Zakładka</h1>
        <label htmlFor="email" className="login-panel__email-title">
          Email
          <input
            type="email"
            id="email"
            className="login-panel__email-input"
            value={emailValue}
            onChange={e => setEmailValue(e.target.value)}
            placeholder="Adres email"
          />
        </label>
        <label htmlFor="password" className="login-panel__password-title">
          Password
          <input
            type="password"
            id="password"
            className="login-panel__password-input"
            value={passwordValue}
            onChange={e => setPasswordValue(e.target.value)}
            placeholder="Hasło"
          />
        </label>
        <button className="login-panel__login-button">Zaloguj</button>
        <p className="login-panel__sign-up-title">
          Jeśli nie masz konta,
          <span className="login-panel__sign-up-link"> zarejestruj się!</span>
        </p>
      </form>
    </div>
  );
}

export default LoginPanel;
