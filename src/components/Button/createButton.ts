import createElement from "../../utils/createElement";

const createButton = (
  content: string,
  onClickFunc?: (event: Event) => void
) => {
  const button = createElement(
    "button",
    { class: "btn primary full-width" },
    content
  );
  if (onClickFunc) button.onclick = onClickFunc;

  return button;
};

export default createButton;
