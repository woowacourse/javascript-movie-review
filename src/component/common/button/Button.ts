interface ButtonProps extends Partial<HTMLButtonElement> {
  size: 'small' | 'full';
}

class Button {
  #button: HTMLButtonElement;
  #restProps;

  constructor({ size, ...rest }: ButtonProps) {
    this.#button = document.createElement('button');
    this.#button.classList.add(`button--${size}`);
    this.#button.classList.add(`text-button--${size}`);

    this.#restProps = rest;

    this.applyPropsToButton();
  }

  applyPropsToButton() {
    Object.entries(this.#restProps).forEach(([key, value]) => {
      if (key in this.#button) {
        (this.#button as any)[key] = value;
        return;
      }
      this.#button.setAttribute(key, String(value));
    });
  }

  get element() {
    return this.#button;
  }
}

export default Button;
