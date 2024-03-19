interface Props {
  parentSelector: string;
  children: Node;
}

class BaseComponent {
  constructor() {
    this.render();
    this.setEvent();
  }

  mounted({ parentSelector, children }: Props) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    parent.append(children);
  }

  render() {}

  setEvent() {}
}

export default BaseComponent;
