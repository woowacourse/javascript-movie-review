import DetailMovieCard from '../DetailMovieCard/DetailMovieCard';

import Component from '../../type/Component';
import { DetailMovie } from '../../type/Movie';
import { StarCount } from '../../domain/PersonalVoteHandler';

import errorImg from '../../assets/error.jpg';

import './modal.css';

const errorTemplate = (statusCode: number, statusMessage: string) => {
  return `
  <div class="error-container">
    <h1 class="error-heading">죄송합니다. 상세 정보를 불러올 수 없습니다.</h1>
    <p>관리자에게 문의해주세요.</p>
    <p class="error-code">error code: ${statusCode}</p>
    <p class="error-message">${statusMessage}</p>
    <img class="error-img" src=${errorImg} alt="error-img" />
  </div>`;
};

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
    <div class="modal-container">
      <button class="modal-close-button">✖</button>
    </div>`;
  }

  setEvent() {
    this.bindBackdropClickEvent();
    this.bindCloseButtonClickEvent();
  }

  bindBackdropClickEvent() {
    const $modalBackdrop = this.$element.querySelector('.modal-backdrop');
    if (!$modalBackdrop) return;

    $modalBackdrop.addEventListener('click', () => {
      this.clearContent();
      this.closeModal();
    });
  }

  bindCloseButtonClickEvent() {
    const $modalCloseButton = this.$element.querySelector('.modal-close-button');
    if (!$modalCloseButton) return;

    $modalCloseButton.addEventListener('click', () => {
      this.clearContent();
      this.closeModal();
    });
  }

  renderContent(detailMovieData: DetailMovie, starCount: StarCount) {
    this.openModal();
    const $container = this.$element.querySelector('.modal-container');
    if (!$container) return;

    const detailMovieCard = new DetailMovieCard($container);
    detailMovieCard.render(detailMovieData, starCount);
  }

  renderErrorTemplate(statusCode: number, statusMessage: string) {
    this.openModal();
    const $container = this.$element.querySelector('.modal-container');
    if (!$container) return;

    $container.insertAdjacentHTML('beforeend', errorTemplate(statusCode, statusMessage));
  }

  openModal() {
    this.$element.classList.remove('hide');
  }

  closeModal() {
    this.$element.classList.add('hide');
  }

  clearContent() {
    const $container = this.$element.querySelector('.modal-container');
    if (!$container) return;

    $container.lastChild?.remove();
  }
}
