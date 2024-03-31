function toast(errorMessage: string, target: HTMLElement = document.body) {
  const toastElement = document.createElement('div');
  toastElement.classList.add('toast');
  toastElement.textContent = errorMessage;
  toastElement.setAttribute('aria-live', 'assertive');

  target.appendChild(toastElement);

  setTimeout(() => toastElement.remove(), 2500);
}

export default toast;
