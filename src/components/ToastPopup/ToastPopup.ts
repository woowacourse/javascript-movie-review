import { getDomElement } from '../../util/DOM';

const ToastPopup = (message: string, activeTime: number) => {
  const toastMessage = getDomElement('#toast_message');
  toastMessage.textContent = message;
  toastMessage.classList.add('active');
  setTimeout(function () {
    toastMessage.classList.remove('active');
  }, activeTime);
};

export default ToastPopup;
