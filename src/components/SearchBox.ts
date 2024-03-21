interface Props {
  onClick: (query: string) => void;
}

export default class SearchBox {
  #SearchBoxElement = document.createElement('form');

  #onClick: Props['onClick'];

  constructor({ onClick }: Props) {
    this.#onClick = onClick;
    this.#SearchBoxElement.classList.add('search-box');
    this.#generateInput();
    this.#generateButton();
    this.#addFormEvent();
  }

  #generateInput() {
    const input = document.createElement('input');

    input.type = 'text';
    input.placeholder = '검색';
    input.name = 'query';

    this.#SearchBoxElement.appendChild(input);
  }

  #generateButton() {
    const button = document.createElement('button');

    button.classList.add('search-button');
    button.textContent = '검색';

    this.#SearchBoxElement.appendChild(button);
  }

  #addFormEvent() {
    this.#SearchBoxElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;

      this.#onClick(target.query.value);
    });
  }

  get element() {
    return this.#SearchBoxElement;
  }
}
