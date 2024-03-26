import { getDomElement } from '../../util/DOM';

const ToastPopup = (message: string) => {
  const toastMessage = getDomElement('#toast_message');
  toastMessage.textContent = message;
  toastMessage.classList.add('active');
  setTimeout(function () {
    toastMessage.classList.remove('active');
  }, 2000);
};

export default ToastPopup;
