import searchButton from '../images/search_button.png';

interface Props {
  onSearch: (query: string) => void;
}

export default class SearchBox {
  #searchBoxElement = document.createElement('form');

  #onSearch: Props['onSearch'];

  constructor({ onSearch }: Props) {
    this.#onSearch = onSearch;
    this.#searchBoxElement.classList.add('search-box');
    this.#generateInput();
    this.#generateButton();
    this.#addFormEvent();
  }

  #generateInput() {
    const container = document.createElement('div');
    const input = document.createElement('input');

    container.classList.add('search-container');
    input.type = 'text';
    input.placeholder = '검색';
    input.name = 'query';
    input.classList.add('search-input');
    container.appendChild(input);

    this.#observeSize(input);
    this.#searchBoxElement.appendChild(container);
  }

  #generateButton() {
    const button = document.createElement('button');
    const img = document.createElement('img');

    button.classList.add('search-button');
    img.src = searchButton;
    img.id = 'search-button-img';
    button.appendChild(img);

    this.#searchBoxElement.appendChild(button);
  }

  #addFormEvent() {
    this.#searchBoxElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const input = document.querySelector('input[name=query]');

      if (input?.classList.contains('search-close')) {
        input.classList.add('search-open');
        input.classList.remove('search-close');
      } else {
        this.#onSearch(target.query.value);
      }
    });
  }

  #observeSize(element: HTMLElement) {
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;

      if (width < 834) {
        element.classList.add('search-close');
        element.classList.remove('search-open');
        element.classList.remove('search-input');
      } else {
        element.classList.remove('search-close');
        element.classList.add('search-input');
      }
    });

    observer.observe(document.documentElement);
  }

  get element() {
    return this.#searchBoxElement;
  }
}
