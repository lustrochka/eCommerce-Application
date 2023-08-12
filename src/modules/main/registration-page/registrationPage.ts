import { createCustomer } from '../../../api/api-SPA';
import { getDomElement } from '../../../check-element';

const INPUTS: { [key: string]: string[] } = {
  Email: [
    '[^@\\s]+@[^@\\s]+\\.[^@\\s]+',
    'A email address should be properly formatted (e.g., example@email.com)',
    'example@email.com',
  ],
  Password: [
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^ws]).{8,}',
    'Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    '1aZ*2bA+',
  ],
  'First-Name': [
    '[A-Za-z]+',
    'First name must contain at least one character and no special characters or numbers',
    'Alex',
  ],
  'Last-Name': [
    '[A-Za-z]+',
    'Last name must contain at least one character and no special characters or numbers',
    'Adamovich',
  ],
  'Date-of-birth': ['', 'You should have at least 13 years'],
  Street: ['\\S+', 'Street must contain at least one character', 'Skaryny'],
  City: ['[A-Za-z]+', 'City must contain at least one character and no special characters or numbers', 'Minsk'],
  'Postal-Code': ['', 'Postal code must follow the format for the country'],
};
const COUNTRIES: { [key: string]: string[] } = {
  Belarus: ['2[1-4][0-7]\\d{3}', '220000'],
  Poland: ['\\d{2}-\\d{3}', '00-000'],
  Russia: ['[1-9]\\d{5}', '101000'],
};

export function renderRegistrationPage() {
  const page = document.createElement('div');
  page.classList.add('registration-page');

  const title = document.createElement('h1');
  title.classList.add('registration-title');
  title.textContent = 'Registration';
  page.appendChild(title);

  const form = document.createElement('form');
  form.classList.add('registration-form');
  page.appendChild(form);
  let item: keyof typeof INPUTS;
  for (item in INPUTS) {
    const text = item.split('-').join(' ');

    const label = document.createElement('label');
    label.setAttribute('for', `${item}`);
    label.textContent = `${text}`;
    form.appendChild(label);

    const input = document.createElement('input');
    input.classList.add('registration-input');
    input.setAttribute('id', `${item}`);
    input.setAttribute('name', `${text}`);
    input.required = true;
    form.appendChild(input);
    if (item == 'Date-of-birth') {
      input.setAttribute('type', 'date');
      input.addEventListener('change', () => {
        const message = checkAge(input.value) ? '' : `${INPUTS['Date-of-birth'][1]}`;
        input.setCustomValidity(message);
      });
    } else if (item == 'Postal-Code') {
      input.setAttribute('pattern', `${COUNTRIES['Belarus'][0]}`);
      input.placeholder = `${COUNTRIES['Belarus'][1]}`;
    } else {
      input.setAttribute('type', 'text');
      input.setAttribute('pattern', `${INPUTS[item][0]}`);
      input.placeholder = `${INPUTS[item][2]}`;
      input.addEventListener('change', () => {
        const message = input.validity.patternMismatch ? `${INPUTS[input.id][1]}` : '';
        input.setCustomValidity(message);
      });
    }
  }

  const countryLabel = document.createElement('label');
  countryLabel.setAttribute('for', 'country');
  countryLabel.textContent = 'Country';
  form.appendChild(countryLabel);

  const countryInput = document.createElement('select');
  countryInput.classList.add('registration-input');
  countryInput.setAttribute('id', 'country');
  countryInput.setAttribute('name', 'Country');
  countryInput.required = true;
  form.appendChild(countryInput);
  countryInput.addEventListener('change', () => {
    const code = getDomElement<HTMLInputElement>('#Postal-Code', form);
    code.setAttribute('pattern', `${COUNTRIES[countryInput.value][0]}`);
    code.placeholder = `${COUNTRIES[countryInput.value][1]}`;
  });

  for (const country of Object.keys(COUNTRIES)) {
    const option = document.createElement('option');
    option.setAttribute('value', `${country}`);
    option.textContent = `${country}`;
    countryInput.appendChild(option);
  }

  const button = document.createElement('button');
  button.classList.add('registration-button');
  button.textContent = 'Register';
  button.setAttribute('type', 'submit');
  form.appendChild(button);

  const errorMsg = document.createElement('div');
  errorMsg.classList.add('error-message');
  errorMsg.textContent = 'There is already an existing customer with the provided email.';
  form.appendChild(errorMsg);

  form.addEventListener('submit', (e) => {
    registerCustomer(e, form);
  });

  return page;
}

function checkAge(value: string) {
  const now = new Date();
  const birthDate = new Date(value);
  if (now.getFullYear() - birthDate.getFullYear() == 13) {
    if (now.getMonth() > birthDate.getMonth()) {
      return true;
    } else if (now.getMonth() == birthDate.getMonth()) {
      if (now.getDate() >= birthDate.getDate()) {
        return true;
      }
    }
  }
  return now.getFullYear() - birthDate.getFullYear() > 13;
}

function registerCustomer(event: Event, form: HTMLFormElement) {
  event.preventDefault();
  const data = new FormData(form);
  const dataArray = [];
  const email = data.get('Email')?.toString();
  if (email) dataArray.push(email);
  const pass = data.get('Password')?.toString();
  if (pass) dataArray.push(pass);
  const firstName = data.get('First Name')?.toString();
  if (firstName) dataArray.push(firstName);
  const lastName = data.get('Last Name')?.toString();
  if (lastName) dataArray.push(lastName);
  const birthDate = data.get('Date of birth')?.toString();
  if (birthDate) dataArray.push(birthDate);
  let response;
  if (email && pass && firstName && lastName) {
    response = createCustomer(dataArray);
    response
      .then(({ body }) => {
        const id = body.customer.id;
        console.log(id);
      })
      .catch(() => {
        getDomElement('.error-message', form).classList.add('visible');
      });
  }
}
