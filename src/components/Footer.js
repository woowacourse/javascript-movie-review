import createElement from './utils/createElement';

const Footer = () => {
  const $footer = createElement({
    tag: 'footer',
    classNames: ['footer'],
  });

  const $copy = createElement({
    tag: 'p',
  });

  const $p = createElement({
    tag: 'p',
  });

  const $img = createElement({
    tag: 'img',
    src: './images/woowacourse_logo.png',
    width: '180',
  });

  $copy.textContent = '우아한테크코스 All Rights Reserved.';

  $footer.appendChild($copy);
  $footer.appendChild($p);
  $p.appendChild($img);

  return $footer;
};

export default Footer;
