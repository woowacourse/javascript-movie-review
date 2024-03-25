import createElement from '../../utils/createElement';

const NETWORK_ERROR_MESSAGE = '⛔️ 네트워크 오프라인이 감지되었습니다';

const renderHandler = () => {
  const div = createElement('div', {
    className: 'network-status-alert-container',
    textContent: NETWORK_ERROR_MESSAGE,
  });

  document.body.appendChild(div);
};

export default renderHandler;
