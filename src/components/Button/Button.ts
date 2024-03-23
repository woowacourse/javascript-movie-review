import './style.css';

interface ButtonProps {
  className: string[];
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

class Button {
  private template: HTMLButtonElement;

  constructor({ className, text, onClick, disabled }: ButtonProps) {
    const button = document.createElement('button');
    button.classList.add(...className);
    button.textContent = text;

    if (onClick) button.addEventListener('click', onClick);
    if (disabled) button.disabled = disabled;
    this.template = button;
  }

  get element() {
    return this.template;
  }
}

export default Button;
