function onError(status: number) {
  switch (status) {
    case 400:
      alert("요청이 잘못되었습니다. 다시 한 번 확인해 주세요.🥲");
      break;

    case 403:
      alert("이 작업을 수행할 권한이 없습니다. 권한을 확인해 주세요.🥲");
      break;

    case 404:
      alert("요청하신 페이지를 찾을 수 없습니다. 주소를 확인해 주세요.🥲");
      break;

    case 500:
      alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.🥲");
      break;

    default:
      alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.🥲");
      break;
  }
}

export default onError;
