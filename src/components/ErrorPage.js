class ErrorPage extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <section class="error-view">
        <h1>페이지를 가져오다가 놓쳤어요 😢</h1>
        <p>네트워크 연결을 확인해주세요</p>
        <p>서버 문제일 수 있으니 나중에 다시 방문해주세요</p>
      </section>
    `;
  }
}

export default ErrorPage;
