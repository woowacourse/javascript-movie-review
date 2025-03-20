import createElement from './utils/createElement';

const LOGO_IMG_SRC = './images/woowacourse_logo.png';

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
    src: LOGO_IMG_SRC,
    width: '180',
  });

  const COPY_TEXT = '우아한테크코스 All Rights Reserved.';
  $copy.textContent = COPY_TEXT;

  $footer.appendChild($copy);
  $footer.appendChild($p);
  $p.appendChild($img);

  return $footer;
};

export default Footer;
