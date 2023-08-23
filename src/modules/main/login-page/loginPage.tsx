import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const INPUTS = [
  {
    name: 'Email',
    pattern: '[^@\\s]+@[^@\\s]+\\.[^@\\s]+',
    msg: 'A email address should be properly formatted (e.g., example@email.com)',
    placeholder: 'example@email.com',
  },
  {
    name: 'Password',
    pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}',
    msg: 'Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number',
    placeholder: '1aZ*2bA+',
  },
];

export function LoginPage() {
  const [type, setType] = useState('text');
  const [checked, setChecked] = useState(false);

  const result = INPUTS.map((INPUTS) => {
    return (
      <>
        <label htmlFor={INPUTS.name}>{INPUTS.name}</label>
        <input
          className="login-input"
          id={INPUTS.name}
          name={INPUTS.name}
          required
          type={INPUTS.name === 'Password' ? type : 'text'}
          pattern={INPUTS.pattern}
          placeholder={INPUTS.placeholder}
          onChange={(e) => {
            const message = e.target.validity.patternMismatch ? `${INPUTS.msg}` : '';
            e.target.setCustomValidity(message);
          }}
        />
      </>
    );
  });

  return (
    <div className="login-page">
      <h1 className="login-title">Sign in</h1>
      <form className="login-form">
        {result}
        <div>
          <label htmlFor="hide">Hide password</label>
          <input
            className="login-input"
            id="hide"
            type="checkbox"
            checked={checked}
            onChange={() => {
              checked ? setType('text') : setType('password');
              setChecked(!checked);
            }}
          />
        </div>
        <button className="login-button" type="submit">
          Sign in
        </button>
      </form>
      <NavLink to="/registration">
        <button className="navigation-button">Registration</button>
      </NavLink>
    </div>
  );
}
