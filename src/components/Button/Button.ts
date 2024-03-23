import debounce from '../../utils/debounce';
import './style.css';

interface ButtonProps {
  className: string[];
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  debounceWait?: number;
}

class Button {
  private template: HTMLButtonElement;

  constructor({ className, text, onClick, disabled, debounceWait = 3000 }: ButtonProps) {
    const button = document.createElement('button');
    button.classList.add(...className);
    button.textContent = text;

    if (onClick)
      button.addEventListener('click', debounce({ callback: onClick, wait: debounceWait }));
    if (disabled) button.disabled = disabled;
    this.template = button;
  }

  get element() {
    return this.template;
  }
}

export default Button;
