import { AlertModal, NullElementError, RefreshButton } from '../components';

const ElementFinder = {
  /**
   * document.querySelector로 특정 element를 찾고, 그에 따른 결과를 반환하며 element가 없는 경우 modal-container의 존재 여부에 따라 element를 찾지 못했다는 알림을 보내는 기능
   * @param selectors  찾고 자 하는 요소의 selectors
   */
  findElementBySelector<T extends HTMLElement>(
    selectors: string,
  ): T | undefined {
    const $element = document.querySelector(selectors) as T | null;
    if ($element) return $element;
    // element가 없을 경우 modal-container가 있다면 alert modal을 통해서 알림
    if (document.querySelector('.modal-container')) {
      this.renderAlertModalForNullEl(selectors);
      return;
    }
    // element가 없는 경우 modal-container가 없다면 alert를 통해서 알림
    this.alertNullElement(selectors);
    return;
  },

  /**
   * 찾는 element가 없는 경우, alert modal을 통해서 사용자가 새로고침을 할 수 있도록 유도하는 기능
   * @param elementInfo
   */
  renderAlertModalForNullEl(elementInfo: string) {
    const $alertContentsElement = document.createElement('div');
    const $nullElementError = new NullElementError().element;
    const $refreshButton = new RefreshButton().element;

    $alertContentsElement.appendChild($nullElementError);

    console.error(`${elementInfo}를 찾을 수 없습니다.`);
    new AlertModal({ $alertContentsElement, $button: $refreshButton });
  },

  /**
   * 찾는 element가 없는 경우, alert를 통해서 해당 사실을 알리는 기능
   */
  alertNullElement(selector: string) {
    const message = `${selector}를 찾을 수 없습니다. 새로고침 해주세요.`;
    alert(message);
  },
};

export default ElementFinder;
