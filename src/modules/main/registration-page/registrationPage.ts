import { createCustomer } from '../../../api/api-SPA';
import { getDomElement } from '../../../check-element';

const COUNTRIES: { [key: string]: string[] } = {
  Belarus: ['2[1-4][0-7]\\d{3}', '220000'],
  Poland: ['\\d{2}-\\d{3}', '00-000'],
  Russia: ['[1-9]\\d{5}', '101000'],
};

export function renderRegistrationPage() {
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
  };

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
    form.appendChild(renderLabel(item));
    form.appendChild(renderInput(item, INPUTS));
  }

  const adresses = document.createElement('div');
  adresses.classList.add('adresses-block');
  form.appendChild(adresses);

  adresses.appendChild(renderAdress('shipping'));
  adresses.appendChild(renderAdress('billing'));

  const checkbox = getDomElement('#both-checkbox', adresses);
  checkbox.addEventListener('change', () => {
    setBilingAdress(adresses);
  });

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

function renderLabel(value: string) {
  const text = value.split('-').join(' ');

  const label = document.createElement('label');
  label.setAttribute('for', `${value}`);
  label.textContent = `${text}`;

  return label;
}

function renderInput(value: string, valuesArr: { [key: string]: string[] }) {
  const text = value.split('-').join(' ');

  const input = document.createElement('input');
  input.classList.add('registration-input');
  input.setAttribute('id', `${value}`);
  input.setAttribute('name', `${text}`);
  input.required = true;
  if (value == 'Date-of-birth') {
    input.setAttribute('type', 'date');
    input.addEventListener('change', () => {
      const message = checkAge(input.value) ? '' : `${valuesArr['Date-of-birth'][1]}`;
      input.setCustomValidity(message);
    });
  } else if (value == 'Postal-Code') {
    input.setAttribute('pattern', `${COUNTRIES['Belarus'][0]}`);
    input.placeholder = `${COUNTRIES['Belarus'][1]}`;
  } else {
    input.setAttribute('type', 'text');
    input.setAttribute('pattern', `${valuesArr[value][0]}`);
    input.placeholder = `${valuesArr[value][2]}`;
    input.addEventListener('change', () => {
      const message = input.validity.patternMismatch ? `${valuesArr[input.id][1]}` : '';
      input.setCustomValidity(message);
    });
  }
  return input;
}

function renderAdress(type: string) {
  const ADRESS_INPUTS = {
    Street: ['\\S+', 'Street must contain at least one character', 'Skaryny'],
    City: ['[A-Za-z]+', 'City must contain at least one character and no special characters or numbers', 'Minsk'],
    'Postal-Code': ['', 'Postal code must follow the format for the country'],
  };

  const adressBlock = document.createElement('form');
  adressBlock.classList.add('adress-block');
  adressBlock.setAttribute('id', `${type}-adress`);

  const title = document.createElement('div');
  title.classList.add('adress-title');
  title.textContent = `${type}-adress`;
  adressBlock.appendChild(title);

  for (const item in ADRESS_INPUTS) {
    adressBlock.appendChild(renderLabel(item));
    adressBlock.appendChild(renderInput(item, ADRESS_INPUTS));
  }
  const countryLabel = document.createElement('label');
  countryLabel.setAttribute('for', 'country');
  countryLabel.textContent = 'Country';
  adressBlock.appendChild(countryLabel);

  const countryInput = document.createElement('select');
  countryInput.classList.add('registration-input');
  countryInput.setAttribute('id', 'country');
  countryInput.setAttribute('name', 'Country');
  countryInput.required = true;
  adressBlock.append(countryInput);
  countryInput.addEventListener('change', () => {
    const code = getDomElement<HTMLInputElement>('#Postal-Code', adressBlock);
    code.setAttribute('pattern', `${COUNTRIES[countryInput.value][0]}`);
    code.placeholder = `${COUNTRIES[countryInput.value][1]}`;
  });

  for (const country of Object.keys(COUNTRIES)) {
    const option = document.createElement('option');
    option.setAttribute('value', `${country}`);
    option.textContent = `${country}`;
    countryInput.appendChild(option);
  }

  adressBlock.appendChild(renderCheckbox(type, 'Set as default adress'));
  if (type == 'shipping') {
    const checkbox = renderCheckbox('both', 'Set as billing adress');
    adressBlock.appendChild(checkbox);
  }

  return adressBlock;
}

function renderCheckbox(type: string, text: string) {
  const checkboxBlock = document.createElement('form');

  const label = document.createElement('label');
  label.setAttribute('for', `${type}`);
  label.textContent = `${text}`;
  checkboxBlock.appendChild(label);

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', `${type}-checkbox`);
  checkboxBlock.appendChild(checkbox);

  return checkboxBlock;
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
    const errorMsg = getDomElement('.error-message', form);
    response
      .then(({ body }) => {
        const id = body.customer.id;
        console.log(id);
        errorMsg.classList.remove('visible');
      })
      .catch(() => {
        errorMsg.classList.add('visible');
      });
  }
}

function setBilingAdress(block: HTMLElement) {
  const checkbox = getDomElement<HTMLInputElement>('#both-checkbox', block);
  const billingAdress = getDomElement<HTMLFormElement>('#billing-adress', block);
  const shippingAdress = getDomElement<HTMLFormElement>('#shipping-adress', block);
  if (checkbox.checked) {
    for (let i = 2; i < 7; i += 2) {
      const child = shippingAdress.children[i];
      const secondChild = billingAdress.children[i];
      if (child instanceof HTMLInputElement && secondChild instanceof HTMLInputElement) {
        secondChild.value = child.value;
      }
    }
    (billingAdress.children[8] as HTMLInputElement).value = (shippingAdress.children[8] as HTMLInputElement).value;
  } else {
    for (let i = 2; i < 7; i += 2) {
      const child = billingAdress.children[i];
      if (child instanceof HTMLInputElement) {
        child.value = '';
      }
    }
    (billingAdress.children[8] as HTMLInputElement).value = 'Belarus';
  }
}
