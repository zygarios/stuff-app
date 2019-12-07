import React, { useState } from "react";
import GetStarted from "./GetStarted";
import "../Sass/LoginPanel.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
const serverLoginURL = "https://jimmyspage.pl/api/login";
const serverRegisterURL = "https://jimmyspage.pl/api/register";

function LoginPanel() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [isRegisterStatus, setIsRegisterStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const history = useHistory();

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
      .catch(({ response }) => {
        const errors = response.data.errors;
        if (errors.password) {
          setAlertMessage(errors.password[0]);
        } else if (errors.email) {
          setAlertMessage(errors.email[0]);
        } else {
          setAlertMessage("Problemy z serwerem");
        }
      });
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
        history.push("/home");
      })
      .catch(({ response }) => {
        const errors = response.data.errors;
        if (errors.password) {
          setAlertMessage(errors.password[0]);
        } else if (errors.email) {
          setAlertMessage(errors.email[0]);
        } else {
          setAlertMessage("Problemy z serwerem");
        }
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
          <span className="login-panel__line" />
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
            Hasło
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
          <span className="login-panel__line" />
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
        <footer className="login-panel__credits">
          Created by: Bartosz Zygmunt & Mariusz Dąbal
        </footer>
      </div>
      <GetStarted />
    </div>
  );
}

export default LoginPanel;
