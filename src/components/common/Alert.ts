import { errorIcon } from '../../constant/svg';

const Alert = (message: string) => {
  const container = document.createElement('div');
  const span = document.createElement('span');
  const content = document.createElement('div');

  content.classList.add('alert-content');
  container.classList.add('alert-container');
  span.classList.add('alert-text');

  span.textContent = message;

  content.insertAdjacentHTML('afterbegin', errorIcon);
  content.appendChild(span);
  container.appendChild(content);

  return container;
};

export const showAlert = (message: string, timeout = 3000) => {
  const alert = Alert(message);

  document.querySelector('#app')?.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, timeout);
};
