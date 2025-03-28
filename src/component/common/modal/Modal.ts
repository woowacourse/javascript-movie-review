export class Modal {
  #background: HTMLElement;
  #content: HTMLElement;

  constructor() {
    this.#background = document.createElement('div');
    this.#background.classList.add('modal-background');
    this.#background.id = 'modalBackground';

    this.#content = document.createElement('div');

    this.render();
    this.#bindEvent();
  }

  get element() {
    return this.#background;
  }

  render() {
    this.#background.innerHTML = `
  <div class="modal">
    <button class="close-modal" id="closeModal">
      <img src="./modal_button_close.png" />
    </button>
    ${this.#content.outerHTML}
  </div>

    `;
  }

  open() {
    document.body.classList.add('modal-open');
    this.#background.classList.add('active');
  }

  close() {
    document.body.classList.remove('modal-open');
    this.#background.classList.remove('active');
  }

  setContent(content: HTMLElement) {
    this.#content = content;
    this.render();
    this.#bindButtonClickEvent();
  }

  #bindEvent() {
    this.#bindButtonClickEvent();
    this.#bindKeyUpEvent();
    this.#bindBackgroundClickEvent();
  }

  #bindButtonClickEvent() {
    this.#background.querySelector('#closeModal')?.addEventListener('click', () => {
      this.close();
    });
  }

  #bindKeyUpEvent() {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') this.close();
    });
  }

  #bindBackgroundClickEvent() {
    this.#background.addEventListener('click', () => {
      this.close();
    });
  }
}
