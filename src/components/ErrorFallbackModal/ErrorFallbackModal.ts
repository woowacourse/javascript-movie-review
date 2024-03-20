import { WarningImage } from '../../assets';
import { createElement } from '../../utils/dom/createElement/createElement';
import { on } from '../../utils/dom/eventListener/eventListener';
import { querySelector } from '../../utils/dom/selector';
import Component from '../common/Component/Component';
import Modal from '../common/Modal/Modal';

class ErrorFallbackModal extends Component {
  protected render(): void {
    new Modal(this.$element, { id: 'error-fallback-modal', children: this.createComponent() });
  }

  protected createComponent() {
    const warningImage = createElement({
      tagName: 'img',
      attributeOptions: { id: 'warning-image', class: 'warning-image', src: WarningImage, alt: '경고 이미지' },
    });
    const div = createElement({ tagName: 'div', text: '시스템 오류가 발생했습니다. \n 다시 시작해 주세요.' });
    const button = createElement({
      tagName: 'button',
      text: '다시 시작하기',
      attributeOptions: { type: 'button', id: 'reload-button', class: 'btn primary' },
    });

    return [warningImage, div, button];
  }

  protected setEvent(): void {
    const button = querySelector<HTMLButtonElement>('#reload-button', this.$element);

    on({ target: button, eventName: 'click', eventHandler: this.handleClickReloadButton.bind(this) });
  }

  private handleClickReloadButton() {
    window.location.reload();
  }
}

export default ErrorFallbackModal;
