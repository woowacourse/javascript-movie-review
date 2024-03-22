import './ShowErrorMessage.css';

const ShowErrorMessage = (status: number) => {
  const $itemView = document.querySelector('.item-view');

  const $errMsg = document.createElement('p');
  $errMsg.classList.add('err-msg');

  if (status >= 400 && status < 500)
    $errMsg.textContent = `${status}: Page Not Found`;
  if (status >= 500 && status < 600)
    $errMsg.textContent = `${status}: Server Error`;

  $itemView?.appendChild($errMsg);
};

export default ShowErrorMessage;
