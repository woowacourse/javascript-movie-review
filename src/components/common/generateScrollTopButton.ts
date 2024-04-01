import createElement from "../utils/createElement";

const generateScrollTopButton = () => {
  const $button = createElement({
    tagName: "button",
    children: ["맨 위로"],
    attribute: { class: "scroll-top" },
  });

  const $buttonDiv = createElement({
    tagName: "div",
    children: [$button],
    attribute: { class: "scroll-top" },
    eventListener: { click: scrollTop },
  });

  return $buttonDiv;
};

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export default generateScrollTopButton;
