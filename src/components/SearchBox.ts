interface Props {
  onClick: (query: string) => void;
}

export default class SearchBox {
  #SearchBoxElement = document.createElement('div');

  #onClick: Props['onClick'];

  constructor({ onClick }: Props) {
    this.#onClick = onClick;
    this.#SearchBoxElement.classList.add('search-box');
    this.#generateInput();
    this.#generateButton();
  }

  #generateInput() {
    const input = document.createElement('input');

    input.type = 'text';
    input.placeholder = '검색';

    this.#SearchBoxElement.appendChild(input);
    this.#addEnterEvent(input);
  }

  #generateButton() {
    const button = document.createElement('button');

    button.classList.add('search-button');
    button.textContent = '검색';

    this.#SearchBoxElement.appendChild(button);

    this.#addButtonClickEvent(button);
  }

  #addButtonClickEvent(button: HTMLButtonElement) {
    button.addEventListener('click', () => {
      const inputData = this.#SearchBoxElement.querySelector('input');

      if (inputData) {
        this.#onClick(inputData.value);
      }
    });
  }

  #addEnterEvent(input: HTMLInputElement) {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.#onClick(input.value);
      }
    });
  }

  get element() {
    return this.#SearchBoxElement;
  }
}
