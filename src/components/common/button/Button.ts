interface ButtonProps {
  id?: string;
  classNames?: string[];
  children?: Node[];
  onClick?: (event: MouseEvent) => void;
}

class Button {
  $target: HTMLButtonElement = document.createElement('button');

  constructor(props: ButtonProps) {
    if (props.id !== undefined) this.$target.id = props.id;
    this.$target.classList.add(...(props.classNames ?? []));
    this.$target.append(...(props.children ?? []));
    if (props.onClick) this.$target.addEventListener('click', props.onClick);
  }
}

export default Button;
