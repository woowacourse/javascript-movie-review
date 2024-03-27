const RetryButtonClickEvent = new Event('retryButtonClickEvent');

function createRetryButton() {
  const retryButton = createRetryButtonElement();

  retryButton.addEventListener('click', () => retryButton.dispatchEvent(RetryButtonClickEvent));
  return retryButton;
}

function createRetryButtonElement() {
  const button = document.createElement('button');
  button.className = 'retry-button';

  return button;
}

export default createRetryButton;
