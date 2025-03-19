// import Footer from '../../component/footer/Footer';
import Footer from '../../component/footer/Footer';
import Header from '../../component/header/Header';

interface LayoutProps {
  childrenElement: Element;
}

class Layout {
  #container;
  #childrenElement;
  #header;
  #footer;

  constructor({ childrenElement }: LayoutProps) {
    this.#container = document.createElement('div');
    this.#container.classList.add('layout');

    this.#childrenElement = childrenElement;

    this.#header = new Header();
    this.#footer = new Footer();

    this.render();
  }

  get element() {
    return this.#container;
  }

  render() {
    if (this.#header.element) this.#container.appendChild(this.#header.element);
    this.#container.appendChild(this.#childrenElement);
    if (this.#footer.element) this.#container.appendChild(this.#footer.element);

    document.querySelector('body')?.appendChild(this.#container);
  }
}

export default Layout;
