export default class Footer {
  private static instance: Footer;
  private $footer: HTMLElement;

  private constructor() {
    this.$footer = document.createElement("footer");
    this.$footer.className = "footer";
    this.render();
  }

  static getInstance(): Footer {
    if (!Footer.instance) Footer.instance = new Footer();
    return Footer.instance;
  }

  render() {
    this.$footer.innerHTML = /*html*/ `
      <p>&copy; 우아한테크코스 All Rights Reserved.</p>
      <p>
        <img
          src="./images/woowacourse_logo.png"
          width="180"
          alt="woowacourse_logo"
        />
      </p>
    `;
  }

  getElement() {
    return this.$footer;
  }
}
