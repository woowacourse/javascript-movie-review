import retryIcon from '../asset/retry.svg';

const RetryButtonClickEvent = new Event('retryButtonClickEvent');

function createRetryButton() {
  const retryButton = renderRetryButton();

  retryButton.addEventListener('click', () => retryButton.dispatchEvent(RetryButtonClickEvent));
  return retryButton;
}

function renderRetryButton() {
  const button = document.createElement('button');
  button.className = 'retry-button';

  button.style.background = `no-repeat url(${retryIcon})`;

  return button;
}

export default createRetryButton;
