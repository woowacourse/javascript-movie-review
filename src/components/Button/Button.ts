import './Button.css';

interface Props {
  text: string;
  onClick: () => void;
  id?: string;
}

class Button {
  text: string;
  onClick: () => void;
  buttonBox = document.createElement('button');
  id?: string;

  constructor({ text, onClick: onClick, id }: Props) {
    this.text = text;
    this.onClick = onClick;
    if (id) {
      this.id = id;
    }
  }

  render() {
    this.buttonBox.classList.add('button');
    this.buttonBox.textContent = this.text;
    this.buttonBox.addEventListener('click', () => this.onClick());
    if (this.id) {
      this.buttonBox.id = this.id;
    }

    return this.buttonBox;
  }
}

export default Button;
