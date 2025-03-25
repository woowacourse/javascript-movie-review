import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';

function Footer() {
  return createDOMElement({
    tag: 'footer',
    className: 'footer',
    children: [
      createDOMElement({
        tag: 'p',
        innerText: '© 우아한테크코스 All Rights Reserved.'
      }),
      createDOMElement({
        tag: 'p',
        children: [
          createDOMElement({
            tag: 'img',
            attributes: {
              src: './images/woowacourse_logo.png',
              width: '180'
            }
          })
        ]
      })
    ]
  });
}

export default Footer;

export const addFooter = () => {
  const wrap = $('#wrap');
  if (!wrap) return;

  const footer = Footer();
  wrap.appendChild(footer);
};
