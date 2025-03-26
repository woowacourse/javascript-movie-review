import "./Footer.css";

class Footer {
  render() {
    const $footer = document.createElement("footer");
    $footer.classList.add("footer");
    $footer.innerHTML = /*html*/ `
    <p>&copy; 우아한테크코스 All Rights Reserved.</p>
    <p><img src="./images/woowacourse_logo.png" width="180" /></p>
    `;

    return $footer;
  }
}
export default Footer;
