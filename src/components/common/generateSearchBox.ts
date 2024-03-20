import createElement from "../utils/createElement";

interface Props {
  placeholder?: string;
  buttonText?: string;
  onClickHandler: (e: Event) => void;
  onChangeHandler: (e: Event) => void;
  onKeyDownHandler: (e: Event) => void;
}

const generateSearchBox = ({
  placeholder = "",
  buttonText = "",
  onClickHandler,
  onChangeHandler,
  onKeyDownHandler,
}: Props) => {
  const $input = createElement({
    tagName: "input",
    attribute: { placeholder, type: "text" },
    addEventListener: {
      keydown: onKeyDownHandler,
      change: onChangeHandler,
    },
  });

  const $button = createElement({
    tagName: "button",
    attribute: { class: "search-button" },
    addEventListener: { click: onClickHandler },
    children: [buttonText],
  });

  const $div = createElement({
    tagName: "div",
    attribute: { class: "search-box" },
    children: [$input, $button],
  });

  return $div;
};

export default generateSearchBox;
