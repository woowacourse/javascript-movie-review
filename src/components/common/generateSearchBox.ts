import createElement from "../utils/createElement";

interface Props {
  placeholder?: string;
  buttonText?: string;
  onSubmitHandler: (e: Event) => void;
}

const generateSearchBox = ({
  placeholder = "",
  buttonText = "",
  onSubmitHandler,
}: Props) => {
  const $input = createElement({
    tagName: "input",
    attribute: { placeholder, type: "text", name: "query" },
  });

  const $button = createElement({
    tagName: "button",
    attribute: { class: "search-button" },
    children: [buttonText],
  });

  const $form = createElement({
    tagName: "form",
    attribute: { class: "search-box" },
    addEventListener: {
      submit: onSubmitHandler,
    },
    children: [$input, $button],
  });

  return $form;
};

export default generateSearchBox;
