import './Button.css';

interface Props {
  text: string;
  clickEvent: () => void;
  id?: string;
}

class Button {
  text: string;
  clickEvent: () => void;
  buttonBox = document.createElement('button');
  id?: string;

  constructor({ text, clickEvent, id }: Props) {
    this.text = text;
    this.clickEvent = clickEvent;
    if (id) {
      this.id = id;
    }
  }

  render() {
    this.buttonBox.classList.add('button');
    this.buttonBox.textContent = this.text;
    this.buttonBox.addEventListener('click', () => this.clickEvent());
    if (this.id) {
      this.buttonBox.id = this.id;
    }

    return this.buttonBox;
  }
}

export default Button;
