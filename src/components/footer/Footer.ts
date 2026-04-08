export default class Footer {
  #$element: HTMLElement;

  constructor() {
    this.#$element = document.createElement('footer');
    this.#$element.className = 'footer';
    this.#$element.innerHTML = `
      <p>&copy; 우아한테크코스 All Rights Reserved.</p>
      <p><img src="./images/woowacourse_logo.png" width="180" /></p>
    `;
  }

  get $element() {
    return this.#$element;
  }
}
