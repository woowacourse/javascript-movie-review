import createDOMElement from "../util/createDomElement";

const Spinner = () => {
  return createDOMElement({
    tag: "div",
    class: "orbit-spinner",
    children: [
      createDOMElement({
        tag: "div",
        class: "planet",
      }),
      createDOMElement({
        tag: "div",
        class: "orbit",
        children: [
          createDOMElement({
            tag: "div",
            class: "satellite satellite-1",
          }),
          createDOMElement({
            tag: "div",
            class: "satellite satellite-2",
          }),
        ],
      }),
    ],
  });
};

export default Spinner;
