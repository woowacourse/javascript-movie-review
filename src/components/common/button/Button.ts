interface ButtonProps {
  id?: string;
  classNames?: string[];
  children?: Node[];
  onClick?: (event: MouseEvent) => void;
}

class Button {
  readonly $target: HTMLButtonElement = document.createElement('button');

  constructor(props: ButtonProps) {
    this.$target.classList.add(...(props.classNames ?? []));
    this.$target.append(...(props.children ?? []));
    if (props.id !== undefined) {
      this.$target.id = props.id;
    }
    if (props.onClick) {
      this.$target.addEventListener('click', props.onClick);
    }
  }
}

export default Button;
