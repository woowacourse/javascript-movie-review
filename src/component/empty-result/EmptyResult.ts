class EmptyResult {
  #container;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('empty-result');

    this.render();
  }

  render() {
    this.#container.innerHTML = `
        <img src="./no-result.png" alt="으아아 행성이"/>
        <p class="text-subtitle">저런! 검색 결과가 없네요 ㅋㅋ</p>
    `;
  }

  get element() {
    return this.#container;
  }
}

export default EmptyResult;
