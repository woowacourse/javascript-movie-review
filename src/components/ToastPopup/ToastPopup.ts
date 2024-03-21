const ToastPopup = (message: string) => {
  const toastMessage = document.getElementById('toast_message');
  if (toastMessage) {
    toastMessage.textContent = message;
    toastMessage.classList.add('active');
    setTimeout(function () {
      toastMessage.classList.remove('active');
    }, 1000);
  }
};

export default ToastPopup;
