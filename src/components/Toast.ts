let removeToast: NodeJS.Timeout;

function toast(message: string | Error) {
  const $toast = document.getElementById('toast') as HTMLDivElement;

  $toast.classList.contains('reveal')
    ? (clearTimeout(removeToast),
      (removeToast = setTimeout(function () {
        $toast.classList.remove('reveal');
      }, 1000)))
    : (removeToast = setTimeout(function () {
        $toast.classList.remove('reveal');
      }, 1000));
  $toast.classList.add('reveal');
  $toast.innerText = message instanceof Error ? message.message : message;
}

export { toast };
