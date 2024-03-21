const errorMessage = {
  apiError(statusCode: number) {
    const movieItems = document.querySelector('main');

    if (statusCode >= 500) {
      const templates = /* html */ `
        <div>서버 에러가 발생했습니다.</div>
        <div>잠시 후 다시 이용해주세요.</div>
      `;
      movieItems?.replaceChildren();
      movieItems?.insertAdjacentHTML('beforeend', templates); // TODO : 리팩터링
    } else if (statusCode >= 400) {
      const templates = /* html */ `
      <div>에러가 발생했습니다.</div>
      <div>잠시 후 다시 이용해주세요.</div>
      `;
      movieItems?.replaceChildren();
      movieItems?.insertAdjacentHTML('beforeend', templates); // TODO : 리팩터링
    }
  },
};

export default errorMessage;
