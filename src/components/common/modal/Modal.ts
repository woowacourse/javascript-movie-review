import { dom } from '../../../utils/dom';
import './Modal.css';

const OPEN_CSS = 'modal-open';

class Modal {
  $target: HTMLDivElement = document.createElement('div');
  $container: HTMLDivElement;
  $backdrop: HTMLDivElement;

  constructor() {
    this.$target.innerHTML = this.#template();
    this.$container = dom.getElement(this.$target, '.modal-container');
    this.$backdrop = dom.getElement(this.$target, '.modal-backdrop');
    this.$backdrop.addEventListener('click', () => {
      this.close();
    });

    this.$target.classList.add('modal');
  }

  #template() {
    return `<div class="modal-container"></div>
        <div class="modal-backdrop"></div>`;
  }

  close() {
    this.$target.classList.remove(OPEN_CSS);
  }

  open() {
    this.$target.classList.add(OPEN_CSS);
  }

  toggle() {
    if (this.$target.classList.contains(OPEN_CSS)) {
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
