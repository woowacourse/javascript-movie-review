interface Props {
  searchInputSubmit: (query: string) => void;
}

export default class SearchBox {
  #searchBoxElement = document.createElement('form');

  #searchInputSubmit: Props['searchInputSubmit'];

  constructor({ searchInputSubmit }: Props) {
    this.#searchInputSubmit = searchInputSubmit;
    this.#searchBoxElement.classList.add('search-box');
    this.#generateInput();
    this.#generateButton();
    this.#addFormEvent();
  }

  #generateInput() {
    const input = document.createElement('input');

    input.type = 'text';
    input.placeholder = '검색';
    input.name = 'query';

    this.#searchBoxElement.appendChild(input);
  }

  #generateButton() {
    const button = document.createElement('button');

    button.classList.add('search-button');
    button.textContent = '검색';

    this.#searchBoxElement.appendChild(button);
  }

  #handleSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    this.#searchInputSubmit(target.query.value);
  }

  #addFormEvent() {
    this.#searchBoxElement.addEventListener('submit', this.#handleSubmit.bind(this));
  }

  get element() {
    return this.#searchBoxElement;
  }
}
