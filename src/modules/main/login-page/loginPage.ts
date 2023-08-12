import { getDomElement } from '../../../check-element';

const INPUTS: { [key: string]: string[] } = {
  Email: [
    '[^@\\s]+@[^@\\s]+\\.[^@\\s]+',
    'A email address should be properly formatted (e.g., example@email.com)',
    'example@email.com',
  ],
  Password: [
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}',
    'Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number',
    '1aZ*2bA+',
  ],
};

export function renderLoginPage() {
  const page = document.createElement('div');
  page.classList.add('login-page');

  const title = document.createElement('h1');
  title.classList.add('login-title');
  title.textContent = 'Sign in';
  page.appendChild(title);

  const form = document.createElement('form');
  form.classList.add('login-form');
  page.appendChild(form);

  for (const item in INPUTS) {
    form.appendChild(renderLabel(item));
    form.appendChild(renderInput(item));
  }

  const hideBlock = document.createElement('div');
  form.appendChild(hideBlock);

  const label = renderLabel('hide');
  label.textContent = 'Hide Password';
  hideBlock.appendChild(label);

  const input = document.createElement('input');
  input.classList.add('login-input');
  input.setAttribute('id', 'hide');
  input.setAttribute('type', 'checkbox');
  hideBlock.appendChild(input);
  input.addEventListener('click', () => {
    const password = getDomElement('#Password', form);
    if (input.checked) {
      password.setAttribute('type', 'password');
    } else {
      password.setAttribute('type', 'text');
    }
  });

  const button = document.createElement('button');
  button.classList.add('login-button');
  button.textContent = 'Sign in';
  button.setAttribute('type', 'submit');
  form.appendChild(button);

  const navButton = document.createElement('button');
  navButton.classList.add('navigation-button');
  navButton.textContent = 'Registration';
  navButton.setAttribute('data-direction', 'registration');
  page.appendChild(navButton);

  return page;
}

function renderLabel(value: string) {
  const label = document.createElement('label');
  label.setAttribute('for', `${value}`);
  label.textContent = `${value}`;

  return label;
}

function renderInput(value: string) {
  const input = document.createElement('input');
  input.classList.add('login-input');
  input.setAttribute('id', `${value}`);
  input.setAttribute('name', `${value}`);
  input.required = true;
  input.setAttribute('type', 'text');
  input.setAttribute('pattern', `${INPUTS[value][0]}`);
  input.placeholder = `${INPUTS[value][2]}`;
  input.addEventListener('change', () => {
    const message = input.validity.patternMismatch ? `${INPUTS[input.id][1]}` : '';
    input.setCustomValidity(message);
  });
  return input;
}
