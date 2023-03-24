import { STATUS_MESSAGES_MAP } from '../constants';

class ErrorPage extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const statusCode = Number(this.getAttribute('status-code'));
    this.innerHTML = /* html */ `
      <section class="error-view">
        <h1>페이지를 가져오지 못했어요 😢</h1>
        ${STATUS_MESSAGES_MAP[statusCode].map((message) => /* html */ `<p>${message}</p>`).join('')}
      </section>
    `;
  }
}

export default ErrorPage;
