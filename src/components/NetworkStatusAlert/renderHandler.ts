import createElement from '../../utils/createElement';

const NETWORK_ERROR_MESSAGE = '⛔️ 네트워크에 연결할 수 없습니다. 인터넷 연결 상태를 확인해주세요!';

const renderHandler = () => {
  const div = createElement('div', {
    className: 'network-status-alert-container',
    textContent: NETWORK_ERROR_MESSAGE,
  });

  document.body.appendChild(div);
};

export default renderHandler;
