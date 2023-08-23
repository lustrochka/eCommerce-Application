import React from 'react';
import { NotFound } from '../modules/main/404/404-page';
import { LoginPage } from '../modules/main/login-page/loginPage';
import { MainPage } from '../modules/main/main-page/mainPage';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RegistrationPage } from '../modules/main/registration-page/registrationPage';

export function Routing() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
