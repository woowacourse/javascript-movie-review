import createDOMElement from "../util/createDomElement";

const MessageModal = (message: string) => {
  return createDOMElement({
    tag: "dialog",
    class: "modal-container",
    children: [
      createDOMElement({
        tag: "div",
        class: "modal-content-box",
        children: createDOMElement({
          tag: "span",
          textContent: message,
        }),
      }),
    ],
  });
};

export default MessageModal;
