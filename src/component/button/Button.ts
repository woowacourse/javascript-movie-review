interface ButtonProps {
  cssType: string;
  innerText: string;
  onClick: Function;
}

class Button {
  #button;
  #onClick;

  constructor({ cssType, innerText, onClick }: ButtonProps) {
    this.#button = document.createElement('button');
    this.#button.classList.add(`button--${cssType}`);
    this.#button.classList.add(`text-button--${cssType}`);
    this.#button.innerText = innerText;

    this.#onClick = onClick;
    this.#bindEvent();
  }

  get element() {
    return this.#button;
  }

  #bindEvent = () => {
    this.#button.addEventListener('click', () => {
      this.#onClick();
    });
  };
}

export default Button;
