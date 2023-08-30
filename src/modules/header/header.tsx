import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { LoginPage } from '../main/login-page/loginPage';
import { RegistrationPage } from '../main/registration-page/registrationPage';
import './header.scss';
import { MainPage } from '../main/main-page/mainPage';
import { CatalogPage } from '../main/catalog-product-page/catalogProductPage';
import { Param } from '../main/catalog-product-page/param';
import { DetailedPage } from '../main/detailed-product-page/detailedProductPage';

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
    path: '/catalog',
    element: <CatalogPage type="" />,
  },
  {
    text: 'Catalog',
    path: '/catalog/:name',
    element: <Param />,
  },
  {
    text: 'Catalog',
    path: '/catalog/:name/:id',
    element: <DetailedPage />,
  },
  {
    text: 'Basket',
    path: '/basket',
    element: <MainPage />,
  },
  {
    text: 'About us',
    path: '/about',
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
        <NavLink to="/" className="link">
          Main
        </NavLink>
        <NavLink to="/catalog" className="link">
          Catalog
        </NavLink>
        <NavLink to="/about" className="link">
          About Us
        </NavLink>
        <NavLink to="/basket" className="link">
          Basket
        </NavLink>
      </nav>
      <div className="login-container">
        {isLogin ? (
          <span>Hi, {userName} </span>
        ) : (
          <>
            <NavLink to="/login" className="link">
              Login
            </NavLink>
            <NavLink to="/registration" className="link">
              Registration
            </NavLink>
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
