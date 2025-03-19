import Footer from '../../component/footer/Footer';
import Header from '../../component/header/Header';
import { renderInnerContentsByRoute } from '../../route/router';

class Layout {
  #container;
  #header;
  #footer;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('layout');

    this.#header = new Header();
    this.#footer = new Footer();

    this.render();
  }

  get element() {
    return this.#container;
  }

  render() {
    if (this.#header.element) this.#container.appendChild(this.#header.element);
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content');
    contentContainer.appendChild(renderInnerContentsByRoute());
    this.#container.appendChild(contentContainer);
    if (this.#footer.element) this.#container.appendChild(this.#footer.element);

    document.querySelector('body')?.appendChild(this.#container);
  }
}

export default Layout;
