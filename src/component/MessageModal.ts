import createDOMElement from "../util/createDomElement";

const MessageModal = (message: string) => {
  return createDOMElement({
    tag: "div",
    class: "modal-background",
    children: createDOMElement({
      tag: "div",
      class: "modal-content-box",
      children: [
        createDOMElement({
          tag: "img",
          src: "./images/empty_planet.svg",
        }),
        createDOMElement({
          tag: "span",
          class: "modal-text",
          textContent: message,
        }),
      ],
    }),
  });
};

export default MessageModal;
