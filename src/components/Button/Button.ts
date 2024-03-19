import './style.css';

interface ButtonProps {
  className: string[];
  text: string;
  onClick?: () => void;
}

const Button = {
  createElements({ className, text, onClick }: ButtonProps) {
    const button = document.createElement('button');
    button.classList.add(...className);
    button.textContent = text;

    if (onClick) this.setEventListener(button, onClick);
    return button;
  },

  setEventListener(button: HTMLButtonElement, onClick: () => void) {
    button.addEventListener('click', onClick);
  },
};

export default Button;
