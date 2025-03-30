import { createElement } from "../utils/dom.ts";

type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  const $title = createElement("h2", {
    class: ["main-title"],
    textContent: text,
  });

  return $title;
};

export default Title;
