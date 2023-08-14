export function renderNotFound() {
  const page = document.createElement('div');

  const title = document.createElement('h1');
  title.classList.add('404-title');
  title.textContent = '404';
  page.appendChild(title);

  const text = document.createElement('div');
  text.classList.add('404-text');
  text.textContent = 'Sorry, the page was not found';
  page.appendChild(text);

  return page;
}
