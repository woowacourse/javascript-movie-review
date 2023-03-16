import { $ } from '../utils/domSelector';

const InvalidMessage = {
  renderNoSearchMessage: (searchKey: string) => {
    const template = `
      <div class="error-message">
        <h3>입력하신 검색어 "${searchKey}"(와)과 일치하는 결과가 없습니다.</h3>
        <p>다른 키워드를 입력해 보세요.</p>
      </div>`;

    $<HTMLElement>('.item-view').insertAdjacentHTML('afterbegin', template);
  },

  renderErrorMessage: (statusCode: number) => {
    $<HTMLElement>('.item-view').replaceChildren();

    const template = `
      <div class="error-message">
      ${
        statusCode >= 500
          ? `<h3>서비스 이용에 불편을 드려 죄송합니다.</h3>
        <p>새로고침 단추를 클릭하거나 나중에 다시 시도해 주세요.</p>`
          : `<h3>요청하신 작업을 할 수 없습니다.</h3>
        <p>다시 시도해 주세요.</p>`
      }
      </div>`;

    $<HTMLElement>('.item-view').insertAdjacentHTML('afterbegin', template);
  },
};

export default InvalidMessage;
