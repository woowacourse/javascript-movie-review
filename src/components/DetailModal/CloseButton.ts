import createDOMElement from "../../util/createDomElement";

const CloseButton = () => {
  return createDOMElement({
    tag: "form",
    method: "dialog",
    children: [
      createDOMElement({
        tag: "button",
        className: "close-modal",
        id: "closeModal",
        children: [
          createDOMElement({
            tag: "img",
            src: "./images/modal_button_close.png",
          }),
        ],
      }),
    ],
  });
};

export default CloseButton;
