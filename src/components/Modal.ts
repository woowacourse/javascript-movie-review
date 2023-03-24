import DetailMovieCard from './DetailMovieCard';

import Component from '../type/Component';
import { DetailMovie } from '../type/Movie';

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

  setEvent() {
    this.bindBackdropClickEvent();
  }

  bindBackdropClickEvent() {
    const $modalBackdrop = this.$element.querySelector('.modal-backdrop');
    if (!$modalBackdrop) return;

    $modalBackdrop.addEventListener('click', this.closeModal.bind(this));
  }

  renderContent(detailMovieData: DetailMovie) {
    const $container = this.$element.querySelector('.modal-container');
    if (!$container) return;

    this.openModal();
    new DetailMovieCard().render($container, detailMovieData);
  }

  renderErrorTemplate(statusCode: number, statusMessage: string) {
    this.openModal();
  }

  openModal() {
    this.$element.classList.remove('hide');
  }

  closeModal() {
    this.$element.classList.add('hide');
  }
}
