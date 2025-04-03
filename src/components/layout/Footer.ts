import Component from "../base/Component";

export default class Footer extends Component {
  private static instance: Footer;

  protected createElement(): HTMLElement {
    const $footer = document.createElement("footer");
    $footer.className = "footer";
    return $footer;
  }

  static getInstance(): Footer {
    if (!Footer.instance) Footer.instance = new Footer();
    return Footer.instance;
  }

  render() {
    this.$element.innerHTML = /*html*/ `
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
}
