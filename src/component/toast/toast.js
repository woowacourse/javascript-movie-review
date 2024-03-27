function toast(errorMessage) {
  const toastElement = document.createElement('div');
  toastElement.classList.add('toast');
  toastElement.textContent = errorMessage;
  toastElement.setAttribute('aria-live', 'assertive');

  document.body.appendChild(toastElement);

  setTimeout(() => toastElement.remove(), 2500);
}

export default toast;
