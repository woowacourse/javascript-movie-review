import { dom } from '../../../utils/dom';
import './Modal.css';

const OPEN_CLASS_NAME = 'modal-open';

class Modal {
  readonly $target: HTMLDivElement = document.createElement('div');
  readonly $container: HTMLDivElement;
  readonly $backdrop: HTMLDivElement;

  constructor() {
    this.$target.innerHTML = this.#template();
    this.$target.tabIndex = 0;
    this.$container = dom.getElement(this.$target, '.modal-container');
    this.$backdrop = dom.getElement(this.$target, '.modal-backdrop');
    this.$backdrop.addEventListener('click', this.close.bind(this));

    this.$target.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      this.close();
    });

    this.$target.classList.add('modal');
  }

  #template() {
    return `<div class="modal-container"></div>
        <div class="modal-backdrop"></div>`;
  }

  close() {
    this.$target.classList.remove(OPEN_CLASS_NAME);
  }

  open() {
    this.$target.classList.add(OPEN_CLASS_NAME);
    this.$target.focus();
  }

  toggle() {
    if (this.$target.classList.contains(OPEN_CLASS_NAME)) {
      this.close();
    } else {
      this.open();
    }
  }

  appendAll(nodes: Node[]) {
    this.$container.append(...nodes);
  }

  append(node: Node) {
    this.$container.append(node);
  }

  replace(node: Node) {
    this.$container.replaceChildren(node);
  }
}

const instance = new Modal();
export default instance;
