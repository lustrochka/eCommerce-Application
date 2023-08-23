import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { LoginPage } from '../main/login-page/loginPage';
import { RegistrationPage } from '../main/registration-page/registrationPage';
import './header.scss';
import { MainPage } from '../main/main-page/mainPage';

type link = {
  text: string;
  path: string;
  element: React.JSX.Element;
};

export const linksArr: link[] = [
  {
    text: 'Main',
    path: '/',
    element: <MainPage />,
  },
  {
    text: 'Catalog',
    path: '/',
    element: <MainPage />,
  },
  {
    text: 'Basket',
    path: '/',
    element: <MainPage />,
  },
  {
    text: 'About us',
    path: '/',
    element: <MainPage />,
  },
];
export const loginArr: link[] = [
  {
    text: 'Login',
    path: '/login',
    element: <LoginPage />,
  },
  {
    text: 'Registration',
    path: '/registration',
    element: <RegistrationPage />,
  },
];

export const Header = () => {
  const [isLogin, setLogin] = useState(false);
  const userName = 'User';
  return (
    <header className="header">
      <nav>
        <NavLink to="/">Main</NavLink>
        <NavLink to="/">Catalog</NavLink>
        <NavLink to="/">About Us</NavLink>
        <NavLink to="/">Basket</NavLink>
      </nav>
      <div className="login-container">
        {isLogin ? (
          <span>Hi, {userName} </span>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/registration">Registration</NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export const createNavLinks = (list: link[]) => {
  return list.map((item, index) => (
    <NavLink to={item.path} key={index}>
      {item.text}
    </NavLink>
  ));
};
