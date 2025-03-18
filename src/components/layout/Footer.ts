import { createElement } from "../../utils/createElement";

const Footer = () => {
  return createElement(/*html*/ `
        <footer class="footer">
        <p>&copy; 우아한테크코스 All Rights Reserved.</p>
        <p><img src="./images/woowacourse_logo.png" width="180" /></p>
      </footer>
    `);
};

export default Footer;
