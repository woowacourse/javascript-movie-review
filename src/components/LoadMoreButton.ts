import { $ } from '../utils/domSelector';

class LoadMoreButton {
  #element = document.createElement('button');

  render(name: string) {
    const parentElement = $('.item-view');

    this.#element.textContent = name;
    this.#element.classList.add('btn', 'primary', 'full-width');

    parentElement.appendChild(this.#element);
    console.log('rendered button is...', $('.btn.primary'));
    console.log('render OK', this.#element);
    //const template = `<button class="btn primary full-width">더 보기</button>`;
  }

  addClickEventHandler(onClickButton: CallableFunction) {
    this.#element.addEventListener('click', () => {
      onClickButton();
    });
  }
}

export default LoadMoreButton;
