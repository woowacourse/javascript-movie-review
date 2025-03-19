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
    this.#childrenElement = childrenElement;

    this.#header = new Header();
    this.#footer = new Footer();

    this.render();
  }

  get element() {
    return this.#container;
  }

  render() {
    const body = document.querySelector('body')!;
    if (this.#header.element) body.appendChild(this.#header.element);
    body.appendChild(this.#childrenElement);
    if (this.#footer.element) body.appendChild(this.#footer.element);
  }
}

export default Layout;
