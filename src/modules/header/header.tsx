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

const linksArr: link[] = [
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
const loginArr: link[] = [
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
        <BrowserRouter>
          <NavLink to="/">Main</NavLink>
          <NavLink to="/">Catalog</NavLink>
          <NavLink to="/">About Us</NavLink>
          <NavLink to="/">Basket</NavLink>
          <Routes>
            {linksArr.map((item, index) => (
              <Route path={item.path} element={item.element} key={index} />
            ))}
          </Routes>
        </BrowserRouter>
      </nav>
      <div className="login-container">
        {isLogin ? (
          <span>Hi, {userName} </span>
        ) : (
          <BrowserRouter>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/registration">Registration</NavLink>
            <Routes>
              {loginArr.map((item, index) => (
                <Route path={item.path} element={item.element} key={index} />
              ))}
            </Routes>
          </BrowserRouter>
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
