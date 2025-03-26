import { PageInstance } from './router';

export class PageRenderer {
  #currentPage: PageInstance | null = null;

  render({ $container, Page }: { $container: HTMLElement; Page: PageInstance }) {
    if (this.#currentPage?.destroy) {
      this.#currentPage.destroy();
    }

    $container.innerHTML = '';
    Page.element.classList.add('render-content');
    $container.appendChild(Page.element);
    this.#currentPage = Page;
  }
}
