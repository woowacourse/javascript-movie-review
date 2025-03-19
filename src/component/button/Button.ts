interface ButtonProps {
  cssType: string;
  innerText: string;
}

class Button {
  #button;

  constructor({ cssType, innerText }: ButtonProps) {
    this.#button = document.createElement('button');
    this.#button.classList.add(`button--${cssType}`);
    this.#button.classList.add(`text-button--${cssType}`);
    this.#button.innerText = innerText;

    this.render();
  }

  render() {}

  get element() {
    return this.#button;
  }
}

export default Button;
