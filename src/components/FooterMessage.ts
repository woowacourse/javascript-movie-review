import { ERROR_IMAGE_PATH } from '../constants';
import { $ } from '../utils/domSelector';

class FooterMessage {
  private $parentElement;
  private element = document.createElement('div');
  private showMoreButtonDisabled = false;

  constructor(parentElement: HTMLElement) {
    this.$parentElement = parentElement;
    this.render();
  }

  private render() {
    this.element.classList.add('footer-message-wrapper');
    this.element.innerHTML = `
        <img class="status-message-icon" src="${ERROR_IMAGE_PATH.errorOnShowMore}" />
        <span class="status-message-content"></span>`;

    this.element.setAttribute('hidden', '');
    this.$parentElement.appendChild(this.element);
  }

  showLoadingMessage(message: string) {
    const $statusMessageIcon = $('.status-message-icon', this.element);

    if ($statusMessageIcon instanceof HTMLImageElement) {
      $statusMessageIcon.src = ERROR_IMAGE_PATH.loading;
    }

    $('.status-message-content', this.element).innerText = message;
    this.element.removeAttribute('hidden');
  }

  showErrorMessage(message: string) {
    const $statusMessageIcon = $('.status-message-icon', this.element);

    if ($statusMessageIcon instanceof HTMLImageElement) {
      $statusMessageIcon.src = ERROR_IMAGE_PATH.errorOnShowMore;
    }

    $('.status-message-content', this.element).innerText = message;
    this.element.removeAttribute('hidden');
  }

  hideMessage() {
    this.element.setAttribute('hidden', '');
  }

  addClickEventHandler(onClickLoadMoreButton: CallableFunction) {
    this.element.addEventListener('click', () => {
      if (this.showMoreButtonDisabled) return;

      onClickLoadMoreButton();
    });
  }
}

export default FooterMessage;
