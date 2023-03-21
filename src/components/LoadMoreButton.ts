import { $ } from '../utils/domSelector';

type LoadMoreButtonConstructorType = {
  parentElement: HTMLElement;
  name: string;
};

class LoadMoreButton {
  private $parentElement;
  private element = document.createElement('div');
  private isDisabled = false;

  constructor({ parentElement, name }: LoadMoreButtonConstructorType) {
    this.$parentElement = parentElement;
    this.render(name);
  }

  private render(name: string) {
    this.element.classList.add('show-more-button-wrapper');
    this.element.innerHTML = `
      <button class="btn primary full-width">${name}</button>
      <span class="button-error-message"></span>`;

    this.$parentElement.appendChild(this.element);
  }

  disableButtonWithErrorMessage(message: string) {
    this.isDisabled = true;
    $('.btn', this.element).setAttribute('disabled', '');
    $('.button-error-message', this.element).innerText = message;
  }

  enableButton() {
    this.isDisabled = false;
    $('.btn', this.element).removeAttribute('disabled');
    $('.button-error-message', this.element).innerText = '';
  }

  addClickEventHandler(onClickLoadMoreButton: CallableFunction) {
    this.element.addEventListener('click', () => {
      if (this.isDisabled) return;

      onClickLoadMoreButton();
    });
  }
}

export default LoadMoreButton;
