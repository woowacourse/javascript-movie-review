const errorIcon = `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3992 18.0625L11.6492 1.1875C11.5039 0.936719 11.2531 0.8125 11 0.8125C10.7469 0.8125 10.4937 0.936719 10.3508 1.1875L0.600765 18.0625C0.312484 18.5641 0.673421 19.1875 1.24998 19.1875H20.75C21.3265 19.1875 21.6875 18.5641 21.3992 18.0625ZM10.25 7.75C10.25 7.64687 10.3344 7.5625 10.4375 7.5625H11.5625C11.6656 7.5625 11.75 7.64687 11.75 7.75V12.0625C11.75 12.1656 11.6656 12.25 11.5625 12.25H10.4375C10.3344 12.25 10.25 12.1656 10.25 12.0625V7.75ZM11 16C10.7056 15.994 10.4253 15.8728 10.2192 15.6625C10.0131 15.4522 9.89771 15.1695 9.89771 14.875C9.89771 14.5805 10.0131 14.2978 10.2192 14.0875C10.4253 13.8772 10.7056 13.756 11 13.75C11.2944 13.756 11.5747 13.8772 11.7808 14.0875C11.9868 14.2978 12.1023 14.5805 12.1023 14.875C12.1023 15.1695 11.9868 15.4522 11.7808 15.6625C11.5747 15.8728 11.2944 15.994 11 16Z" fill="#EA0202"/>
</svg>`;

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

export const showAlert = (message: string) => {
  const alert = Alert(message);

  document.querySelector('#app')?.appendChild(alert);

  setTimeout(() => {
    alert.classList.add('hidden');
  }, 3000);
};
