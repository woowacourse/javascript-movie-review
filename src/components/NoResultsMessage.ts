import { movieApi } from "../domain/movieApi";

export default class NoResultsMessage extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
    <section id="no-result" class="center">
      <h2>
        "${movieApi.urlParams.get("query")}"에 일치하는 검색 결과가 없습니다.
      </h2>
      <p>[ 제안 ]</p>
      <ul>
        <li>다른 키워드를 입력하세요.</li>
        <li>특수 문자가 포함되어 있다면 제거해 주세요.</li>
        <li>더 짧은 키워드를 입력해 보세요.</li>
      </ul>
    </section>
    `;
  }
}
