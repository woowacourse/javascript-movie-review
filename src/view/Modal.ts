import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';

function Modal() {
  return createDOMElement({
    tag: 'dialog',
    className: 'modal',
    id: 'modal',
    children: [
      createDOMElement({
        tag: 'button',
        className: 'close-modal',
        id: 'closeModal',
        children: [
          createDOMElement({
            tag: 'img',
            attributes: {
              src: 'images/modal_button_close.png',
              alt: '모달 닫기 버튼'
            }
          })
        ],
        event: { click: modalClose }
      }),
      createDOMElement({
        tag: 'div',
        className: 'modal-container',
        children: [
          createDOMElement({
            tag: 'div',
            className: 'modal-image',
            children: [
              createDOMElement({
                tag: 'img'
              })
            ]
          }),
          createDOMElement({
            tag: 'div',
            className: 'modal-description',
            children: [
              createDOMElement({
                tag: 'h2'
              }),
              createDOMElement({
                tag: 'p',
                className: 'category'
              }),
              createDOMElement({
                tag: 'p',
                className: 'rate',
                children: [
                  createDOMElement({
                    tag: 'img',
                    className: 'star',
                    attributes: {
                      src: 'images/star_filled.png'
                    }
                  }),
                  createDOMElement({
                    tag: 'span',
                    id: 'movieAverage'
                  })
                ]
              }),
              createDOMElement({
                tag: 'hr'
              }),
              createDOMElement({
                tag: 'p',
                className: 'detail'
              })
            ]
          })
        ]
      })
    ]
  });
}

const modalClose = () => {
  const modal = $('#modal') as HTMLDialogElement;

  modal?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) modal?.close();
  });

  $('#closeModal')?.addEventListener('click', () => {
    modal?.close();
  });
};

export default Modal;
