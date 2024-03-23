import AlertModal from '../components/modal/AlertModal';
import RefreshButton from '../components/RefreshButton';

export const renderAlertModalForNullEl = (elementInfo: string) => {
  const $alertContentsElement = document.createElement('div');
  const $errorText = document.createElement('p');
  const $refreshText = document.createElement('p');
  const $refreshButton = new RefreshButton().element;

  $errorText.textContent = '레이아웃 오류입니다.';
  $refreshText.textContent = '페이지를 새로 고침해주세요.';
  $alertContentsElement.appendChild($errorText);
  $alertContentsElement.appendChild($refreshText);

  console.error(`${elementInfo}를 찾을 수 없습니다.`);
  new AlertModal({ $alertContentsElement, $button: $refreshButton });
};
