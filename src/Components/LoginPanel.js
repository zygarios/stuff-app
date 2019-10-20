import React, { useState } from "react";
import "../Sass/LoginPanel.scss";

function LoginPanel() {
  const [isLoginPanelShow, setIsLoginPanelShow] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleSignUp = e => {
    setIsLoginPanelShow(state => !state);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  return (
    <div className="login-panel">
      <form action="" className="login-panel__form">
        <h1 className="login-panel__title">Welcome to WebStuff</h1>
        {!isLoginPanelShow && (
          <>
            <label htmlFor="username" className="login-panel__username-title">
              Username
            </label>
            <input
              type="username"
              id="username"
              className="login-panel__username-input"
              value={usernameValue}
              onChange={e => setUsernameValue(e.target.value)}
            />
          </>
        )}

        <label htmlFor="email" className="login-panel__email-title">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="login-panel__email-input"
          value={emailValue}
          onChange={e => setEmailValue(e.target.value)}
        />
        <label htmlFor="password" className="login-panel__password-title">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login-panel__password-input"
          value={passwordValue}
          onChange={e => setPasswordValue(e.target.value)}
        />
        <button
          className="login-panel__login-button"
          onClick={handleSubmitForm}>
          {isLoginPanelShow ? "Sign in" : "Sign up"}
        </button>
        <p className="login-panel__sign-up-title">
          If you {isLoginPanelShow && "don`t"} have an account,
          <span className="login-panel__sign-up-link" onClick={handleSignUp}>
            {isLoginPanelShow ? " sign up!" : " sign in!"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginPanel;
