export function renderMainPage() {
  const page = document.createElement('div');

  const regLink = document.createElement('a');
  regLink.textContent = 'Registration page';
  regLink.href = '#registration';
  page.appendChild(regLink);

  const loginLink = document.createElement('a');
  loginLink.textContent = 'Login page';
  loginLink.href = '#login';
  page.appendChild(loginLink);

  return page;
}
