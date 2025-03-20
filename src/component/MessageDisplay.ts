import createDOMElement from '../util/createDomElement';

function MessageDisplay({ text }: { text: string }) {
  return createDOMElement({
    tag: 'div',
    className: 'no-result',
    children: [
      createDOMElement({
        tag: 'img',
        attributes: {
          src: 'images/으아아행성이.svg'
        }
      }),
      createDOMElement({
        tag: 'p',
        textContent: text
      })
    ]
  });
}

export default MessageDisplay;
