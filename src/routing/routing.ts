import { renderNotFound } from '../modules/main/404/404-page';
import { renderLoginPage } from '../modules/main/login-page/loginPage';
import { renderMainPage } from '../modules/main/main-page/mainPage';
import { renderRegistrationPage } from '../modules/main/registration-page/registrationPage';

const ROUTES: { [key: string]: () => HTMLElement } = {
  login: renderLoginPage,
  registration: renderRegistrationPage,
  '': renderMainPage,
};

export function routing() {
  window.addEventListener('hashchange', changePage);

  window.addEventListener('load', changePage);
}

export function changePage() {
  const route = window.location.hash.slice(1);
  const body = document.querySelector('body');
  if (body) body.innerHTML = '';
  if (route in ROUTES) body?.appendChild(ROUTES[route]());
  else body?.appendChild(renderNotFound());
}
