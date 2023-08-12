import './main.scss';
import { renderRegistrationPage } from './modules/main/registration-page/registrationPage';

const body = document.querySelector('body');
body?.appendChild(renderRegistrationPage());
