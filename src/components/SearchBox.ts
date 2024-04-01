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

    this.#searchBoxElement.appendChild(container);
  }

  #generateButton() {
    const button = document.createElement('button');

    button.classList.add('search-button');
    button.textContent = '검색';

    this.#searchBoxElement.appendChild(button);
  }

  #addFormEvent() {
    this.#searchBoxElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;

      const input = document.querySelector('input[name=query]');

      if (input?.getBoundingClientRect().width === 0) {
        input.classList.add('search-open');
      } else {
        this.#onSearch(target.query.value);
      }
    });
  }

  get element() {
    return this.#searchBoxElement;
  }
}
