import createDOMElement from "../util/createDomElement";

const MessageModal = (message: string) => {
  return createDOMElement({
    tag: "dialog",
    className: "modal-container",
    children: [
      createDOMElement({
        tag: "div",
        className: "modal-content-box",
        children: [
          createDOMElement({
            tag: "img",
            src: "./images/empty_planet.svg",
          }),
          createDOMElement({
            tag: "span",
            textContent: message,
          }),
        ],
      }),
    ],
  });
};

export default MessageModal;
