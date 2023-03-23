import Component from '../type/Component';

export default class Modal implements Component {
  private $element;

  constructor($parent: Element, private childComponent: new ($parent: Element) => any) {
    this.$element = document.createElement('div');
    this.$element.id = 'modal';
    this.$element.className = 'modal hide';

    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  render() {
    this.$element.innerHTML = this.template();
    this.setEvent();
    this.renderContent();
  }

  template() {
    return /* html */ `
    <div class="modal-backdrop"></div>
    <div class="modal-container"></div>`;
  }

  setEvent() {}

  renderContent() {
    const $container = this.$element.querySelector('.modal-container');
    if (!$container) return;

    new this.childComponent($container).render();
  }

  openModal() {
    this.$element.classList.remove('hide');
  }
}
