import Modal from '../component/modal/Modal';
import { PageInstance } from './router';

export class PageRenderer {
  #currentPage: PageInstance | null = null;
  #modal: Modal = new Modal();

  render({ $container, Page }: { $container: HTMLElement; Page: PageInstance }) {
    if (this.#currentPage?.destroy) {
      this.#currentPage.destroy();
    }

    $container.innerHTML = '';
    Page.element.classList.add('render-content');
    $container.appendChild(Page.element);
    $container.appendChild(this.#modal.element);
    this.#currentPage = Page;
  }
}
