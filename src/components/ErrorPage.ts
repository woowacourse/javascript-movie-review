import { STATUS_MESSAGES_MAP } from '../constants';

class ErrorPage extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const statusCode = Number(this.getAttribute('status-code'));
    const statusMessages = STATUS_MESSAGES_MAP[statusCode] ?? ['나중에 다시 시도해주세요'];
    this.innerHTML = /* html */ `
      <section class="error-view">
        <h1>페이지를 가져오지 못했어요 😢</h1>
        ${statusMessages.map((message) => /* html */ `<p>${message}</p>`).join('')}
      </section>
    `;
  }
}

export default ErrorPage;
