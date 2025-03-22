import { IMAGE_URL } from '../../constants/systemConstants';

class Footer {
  #footer;

  constructor() {
    this.#footer = document.createElement('footer');
    this.#footer.className = 'footer';
    this.render();
  }

  render() {
    this.#footer.innerHTML = `
        <p><img src=${IMAGE_URL.WOOWA_LOGO} width="180" /></p>
        <p>&copy; 우아한테크코스 All Rights Reserved.</p>
      `;
  }

  get element() {
    return this.#footer;
  }
}

export default Footer;
