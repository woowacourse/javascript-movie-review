import createDOMElement from "../util/createDomElement";

const Spinner = () => {
  return createDOMElement({
    tag: "div",
    className: "spinner-wrapper",
    children: createDOMElement({
      tag: "div",
      className: "orbit-spinner",
      children: [
        createDOMElement({
          tag: "div",
          className: "planet",
        }),
        createDOMElement({
          tag: "div",
          className: "orbit",
          children: [
            createDOMElement({
              tag: "div",
              className: "satellite satellite-1",
            }),
            createDOMElement({
              tag: "div",
              className: "satellite satellite-2",
            }),
          ],
        }),
      ],
    }),
  });
};

export default Spinner;
