export function onError(status: number | string) {
  let message = "";
  switch (status) {
    case 400:
      message = "요청이 잘못되었습니다. 다시 한 번 확인해 주세요.🥲";
      break;

    case 403:
      message = "이 작업을 수행할 권한이 없습니다. 권한을 확인해 주세요.🥲";
      break;

    case 404:
      message = "요청하신 페이지를 찾을 수 없습니다. 주소를 확인해 주세요.🥲";
      break;

    case 500:
      message = "서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.🥲";
      break;

    default:
      message = "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.🥲";
      break;
  }

  function showError(message: string) {
    const errorBox = document.createElement("div");
    errorBox.innerText = message;
    errorBox.style.position = "fixed";
    errorBox.style.top = "20px";
    errorBox.style.left = "50%";
    errorBox.style.transform = "translateX(-50%)";
    errorBox.style.background = "red";
    errorBox.style.color = "white";
    errorBox.style.padding = "10px";
    errorBox.style.borderRadius = "5px";
    errorBox.style.zIndex = "9999";
    document.body.appendChild(errorBox);

    setTimeout(() => errorBox.remove(), 3000);
  }
  showError(message);
}

export default onError;
