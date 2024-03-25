import './Button.css';

interface ButtonProps {
  id?: string;
  classNames?: string[];
  children?: Node[];
  onClick?: (event: MouseEvent) => void;
}

class Button {
  $target: HTMLButtonElement = document.createElement('button');

  constructor(props: ButtonProps) {
    if (typeof props.id === 'undefined') return;
    this.$target.id = props.id;
    this.$target.classList.add(...(props.classNames ?? []));
    this.$target.append(...(props.children ?? []));
    this.setEvent(props.onClick);
  }

  setEvent(onClick?: (event: MouseEvent) => void) {
    this.$target.addEventListener('click', e => {
      if (typeof onClick === 'undefined') return;
      this.$target.disabled = true;
      onClick(e);
      this.$target.disabled = false;
    });
  }
}

export default Button;
