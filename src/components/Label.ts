import { createElementWithAttribute } from '../utils';

interface LabelProps {
  forId: string;
  textContent: string;
  className?: string;
}

class Label {
  #element: HTMLElement;

  constructor(props: LabelProps) {
    this.#element = this.#makeLabel(props);
  }

  get element() {
    return this.#element;
  }

  #makeLabel = ({ forId, textContent, className }: LabelProps) => {
    const $label = createElementWithAttribute('label', {
      forId,
    });
    if (className) $label.classList.add(className);

    $label.textContent = textContent;

    return $label;
  };
}

export default Label;
