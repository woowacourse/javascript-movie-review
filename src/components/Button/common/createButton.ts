import createElement from "../../../utils/createElement";

const createButton = (
  contents: string,
  onClickFunc?: (event: Event) => void
) => {
  const button = createElement({
    tagName: "button",
    contents,
    attrs: { class: "btn primary full-width" },
  });

  if (onClickFunc) button.onclick = onClickFunc;

  return button;
};

export default createButton;
