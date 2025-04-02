class Footer {
  #footer;

  constructor() {
    this.#footer = document.createElement('footer');
    this.#footer.className = 'footer';
    this.render();
  }

  render() {
    this.#footer.innerHTML = `
        <p><img src="./woowacourse_logo.png" width="180" alt="우아한테크코스 로고"/></p>
        <p>&copy; 우아한테크코스 All Rights Reserved.</p>
      `;
  }

  get element() {
    return this.#footer;
  }
}

export default Footer;
