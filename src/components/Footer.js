function Footer() {
  const $footer = document.createElement("footer");
  $footer.classList.add("footer");
  $footer.innerHTML = `<p>&copy; 우아한테크코스 All Rights Reserved.</p>
    <p><img src="./woowacourse_logo.png" width="180" /></p>`;

  return $footer;
}

export default Footer;
