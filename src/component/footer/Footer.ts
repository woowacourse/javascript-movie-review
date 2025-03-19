class Footer {
  #container;

  constructor() {
    this.#container = document.createElement('div');
    this.render();
  }

  render() {
    this.#container.innerHTML = `
    <footer class="footer">
        <p><img src="./woowacourse_logo.png" width="180" /></p>
        <p>&copy; 우아한테크코스 All Rights Reserved.</p>
      </footer>`;
  }

  get element() {
    return this.#container.firstElementChild;
  }
}

export default Footer;

/*
      <footer class="footer">
        <p>&copy; 우아한테크코스 All Rights Reserved.</p>
        <p><img src="./images/woowacourse_logo.png" width="180" /></p>
      </footer>
*/
