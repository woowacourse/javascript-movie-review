import { images } from "../../assets/images";

const Footer = () => {
  return `
    <footer class="footer">
        <p>&copy; 우아한테크코스 All Rights Reserved.</p>
        <p><img src="${images.woowacourse}" width="180" /></p>
    </footer>
  `;
};

export default Footer;
