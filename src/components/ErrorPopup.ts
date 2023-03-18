class ErrorPopup {
  pop(errorMessage: string) {
    const $popup = document.createElement('div');
    $popup.classList.add('popup');

    $popup.innerText = errorMessage;
    document.querySelector('.popup-container')?.append($popup);

    setTimeout(() => {
      $popup.dataset.fadeOut = '';
      setTimeout(() => {
        $popup.remove();
      }, 1000);
    }, 5000);
  }
}

export default ErrorPopup;
