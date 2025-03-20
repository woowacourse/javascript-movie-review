import Footer from '../../component/footer/Footer';
import Header from '../../component/header/Header';
import { renderContent, renderInnerContentsByRoute } from '../../route/router';

class Layout {
  #container;
  #header;
  #footer;
  #contentContainer;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('layout');

    this.#header = new Header();
    this.#footer = new Footer();

    this.#contentContainer = document.createElement('div');
    this.#contentContainer.classList.add('content');

    this.#container.appendChild(this.#header.element);
    this.#container.appendChild(this.#contentContainer);
    this.#container.appendChild(this.#footer.element);

    document.querySelector('body')?.appendChild(this.#container);

    this.render();
  }

  get element() {
    return this.#container;
  }

  async render() {
    await renderContent();
  }
}

export default Layout;
