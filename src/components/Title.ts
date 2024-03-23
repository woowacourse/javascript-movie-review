import { createElementWithAttribute } from "../utils";

const Title = (text: string) => {
  const $title = createElementWithAttribute("h2", { class: "list-title" });
  $title.textContent = text;

  return $title;
};
export default Title;
