import createDOMElement from "../../util/createDomElement";

const CloseButton = () => {
  return createDOMElement({
    tag: "button",
    class: "close-modal",
    id: "closeModal",
    children: createDOMElement({
      tag: "img",
      src: "./images/modal_button_close.png",
    }),
  });
};

export default CloseButton;
