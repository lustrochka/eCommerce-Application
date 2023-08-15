import './header.scss';

export const links = [
  {
    text: 'Catalog',
    href: '#',
  },
  {
    text: 'Basket',
    href: '#',
  },
  {
    text: 'About us',
    href: '#',
  },
];

export const renderHeader = () => {
  const body = document.body;
  const headerWrap = document.createElement('div');
  headerWrap.classList.add('header-wrap');
  body.append(headerWrap);
  const header = document.createElement('header');
  header.classList.add('header');
  body.append(header);

  const nav = document.createElement('nav');
  nav.classList.add('nav');
  header.append(nav);

  const list = document.createElement('ul');
  list.classList.add('nav-wrap');
  nav.append(list);

  links.forEach((item) => createNavLink(list, item.text, item.href));
};

export function createNavLink(parent: HTMLElement, text: string, href: string) {
  const li = document.createElement('li');
  li.classList.add('link-wrap');
  parent.append(li);

  const link = document.createElement('a');
  link.classList.add('link');
  link.innerText = text;
  link.href = href;

  li.append(link);
}
