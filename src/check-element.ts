export function getDomElement<T extends HTMLElement>(selector: string, parent: HTMLElement): T {
  const element = parent.querySelector<T>(selector);
  if (!element) {
    throw new Error(`${selector} is null`);
  }
  return element;
}
