import React from 'react';
import { NotFound } from '../modules/main/404/404-page';
import { LoginPage } from '../modules/main/login-page/loginPage';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RegistrationPage } from '../modules/main/registration-page/registrationPage';
import { MainPage } from '../modules/main/main-page/mainPage';

export function Routing() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
