import createDOMElement from '../util/createDomElement';

function Footer() {
  return createDOMElement({
    tag: 'footer',
    className: 'footer',
    children: [
      createDOMElement({
        tag: 'p',
        textContent: '© 우아한테크코스 All Rights Reserved.'
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
