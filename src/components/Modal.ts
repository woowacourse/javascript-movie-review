import Component from '../type/Component';

export default class Modal implements Component {
  private $element;

  constructor($parent: Element) {
    this.$element = document.createElement('div');
    this.$element.id = 'modal';
    this.$element.className = 'modal hide';

    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  render() {
    this.$element.innerHTML = this.template();
    this.setEvent();
  }

  template() {
    return /* html */ `
    <div class="modal-backdrop"></div>
    <div class="modal-container"></div>`;
  }

  setEvent() {}
}
