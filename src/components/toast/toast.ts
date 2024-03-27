const toast = (errorMessage: string) => {
  const toastElement = document.createElement('div');
  toastElement.classList.add('toast');
  toastElement.textContent = errorMessage;
  toastElement.setAttribute('aria-live', 'assertive');

  const body = document.querySelector('body');
  if (!body) return;
  body.appendChild(toastElement);

  setTimeout(() => toastElement.remove(), 2500);
};

export default toast;
