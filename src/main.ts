import Header from './component/header/Header.ts';
import Footer from './component/footer/Footer.ts';

addEventListener('load', () => {
  const body = document.querySelector('body');

  const header = new Header();
  const footer = new Footer();

  if (header.element && footer.element) {
    body?.appendChild(header.element);
    body?.appendChild(footer.element);
  }
});
