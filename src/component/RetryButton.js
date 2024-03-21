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
  button.style.backgroundSize = 'cover';
  button.style.backgroundColor = 'white';
  button.style.backgroundPosition = '4px 3px';

  button.style.borderRadius = '50%';
  button.style.width = '50px';
  button.style.height = '50px';
  button.style.cursor = 'pointer';
  button.style.border = 'none';

  return button;
}

export default createRetryButton;
