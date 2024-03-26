import logo from '../images/logo.png';

export default class Header {
  #headerElement = document.querySelector('header');

  constructor() {
    this.#generateHeaderContent();
  }

  #generateHeaderContent() {
    const content = /* html */ `
    <h1>
      <button id="home-button"><img src="${logo}" alt="MovieList 로고" /></button>
    </h1>`;

    if (this.#headerElement) this.#headerElement.innerHTML = content;
  }
}
