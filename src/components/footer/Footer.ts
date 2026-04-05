export const Footer = () => {
  const tempalte = `
    <p>&copy; 우아한테크코스 All Rights Reserved.</p>
    <p><img src="/images/woowacourse_logo.png" width="180" /></p>
  `;

  const $footer = document.createElement('footer');
  $footer.className = 'footer';
  $footer.innerHTML = tempalte;
  return $footer;
};
