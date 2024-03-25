interface Props {
  onClick: (query: string) => void;
}

export default class SearchBox {
  searchBoxElement = document.createElement('form');

  #onClick: Props['onClick'];

  constructor({ onClick }: Props) {
    this.#onClick = onClick;
    this.searchBoxElement.classList.add('search-box');
    this.#generateInput();
    this.#generateButton();
    this.#addFormEvent();
  }

  #generateInput() {
    const input = document.createElement('input');

    input.type = 'text';
    input.placeholder = '검색';
    input.name = 'query';

    this.searchBoxElement.appendChild(input);
  }

  #generateButton() {
    const button = document.createElement('button');

    button.classList.add('search-button');
    button.textContent = '검색';

    this.searchBoxElement.appendChild(button);
  }

  #addFormEvent() {
    this.searchBoxElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;

      this.#onClick(target.query.value);
    });
  }

  get element() {
    return this.searchBoxElement;
  }
}
