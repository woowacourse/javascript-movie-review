import { AlertModal, NullElementError, RefreshButton } from '../components';

export const renderAlertModalForNullEl = (elementInfo: string) => {
  const $alertContentsElement = document.createElement('div');
  const $nullElementError = new NullElementError().element;
  const $refreshButton = new RefreshButton().element;

  $alertContentsElement.appendChild($nullElementError);

  console.error(`${elementInfo}를 찾을 수 없습니다.`);
  new AlertModal({ $alertContentsElement, $button: $refreshButton });
};
