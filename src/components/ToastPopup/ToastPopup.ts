const ToastPopup = (message: string) => {
  const toastMessage = document.getElementById('toast_message');

  if (toastMessage) {
    toastMessage.classList.add('active');
    toastMessage.textContent = message;

    setTimeout(function () {
      toastMessage.classList.remove('active');
    }, 1000);
  }
};

export default ToastPopup;
