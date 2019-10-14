import React from 'react';
import '../Sass/LoginPanel.scss';
// import { Route, Link, NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginPanel() {
  return (
    <div className="login-panel">
      <form action="" className="login-panel__form">
        <h1 className="login-panel__title">Welcome to WebStuff</h1>
        <label htmlFor="login" className="login-panel__username-title">
          Username
        </label>
        <input
          type="login"
          id="login"
          className="login-panel__username-input"
        />
        <label htmlFor="password" className="login-panel__password-title">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login-panel__password-input"
        />
        <button className="login-panel__login-button">Sign in</button>
        <p className="login-panel__sign-up-title">
          If you dont have an account,
          <Link className="login-panel__sign-up-link"> sign up!</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPanel;
