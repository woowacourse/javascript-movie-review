interface ButtonProps {
  size: 'small' | 'medium';
  innerText: string;
  onClick: Function;
}

class Button {
  #button;
  #onClick;

  constructor({ size, innerText, onClick }: ButtonProps) {
    this.#button = document.createElement('button');
    this.#button.classList.add(`button--${size}`);
    this.#button.classList.add(`text-button--${size}`);
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
