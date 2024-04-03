import './displayErrorMessage.css';
import ERROR_MESSAGE from '../../constants/message';

const createErrorMessage = () => {
  const $errMsg = document.createElement('p');
  $errMsg.classList.add('err-msg');
  return $errMsg;
};

const displayErrorMessage = (status: number) => {
  const $itemView = document.querySelector('.item-view');

  const $errMsg = createErrorMessage();
  const errText = ERROR_MESSAGE[status] || 'Unknown error';
  $errMsg.textContent = `${status}: ${errText}`;

  $itemView?.appendChild($errMsg);
};

export default displayErrorMessage;
