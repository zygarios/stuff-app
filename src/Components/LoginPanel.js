import React, { useState } from "react";
import "../Sass/LoginPanel.scss";
import axios from "axios";

const serverLoginURL = "https://jimmyspage.pl/api/login";
const serverRegisterURL = "https://jimmyspage.pl/api/register";

function LoginPanel(props) {
  const [emailValue, setEmailValue] = useState("white.cary@example.net");
  const [passwordValue, setPasswordValue] = useState("password");
  const [nameValue, setNameValue] = useState("");
  const [isRegisterStatus, setIsRegisterStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleRegisterRequest = () => {
    const loginForm = new FormData();
    loginForm.set("name", nameValue);
    loginForm.set("email", emailValue);
    loginForm.set("password", passwordValue);
    axios
      .post(serverRegisterURL, loginForm, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => handleLoginRequest())
      .catch(err => setAlertMessage("coś nie działa"));
  };

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
      .catch(err => {
        setAlertMessage("coś nie działa");
      });
  };

  const handleSubmitLoginForm = e => {
    e.preventDefault();
    if (isRegisterStatus) {
      handleRegisterRequest();
    } else {
      handleLoginRequest();
    }
  };
  return (
    <div className="login-panel">
      <div className="login-panel__container">
        <form className="login-panel__form" onSubmit={handleSubmitLoginForm}>
          <h1 className="login-panel__title">Zakładka</h1>
          {isRegisterStatus && (
            <label htmlFor="name" className="login-panel__name-title">
              Imię
              <input
                type="name"
                id="name"
                className="login-panel__name-input"
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                placeholder="Imię użytkownika"
              />
            </label>
          )}
          <label htmlFor="email" className="login-panel__email-title">
            Email
            <input
              type="email"
              id="email"
              autoFocus
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
          {alertMessage && <p className="login-panel__alert">{alertMessage}</p>}
          <button className="login-panel__login-button">
            {isRegisterStatus ? "Zarejestruj" : "Zaloguj"}
          </button>
          <p className="login-panel__sign-title">
            {isRegisterStatus ? "Jeśli masz konto, " : "Jeśli nie masz konta, "}
            <span
              className="login-panel__sign-link"
              onClick={() => {
                setIsRegisterStatus(state => !state);
                setAlertMessage("");
              }}>
              {isRegisterStatus ? "zaloguj się!" : "zarejestruj się!"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPanel;
