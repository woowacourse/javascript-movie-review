import { createElementWithAttribute } from "../utils";

interface Props {
  forId: string;
  textContent: string;
  className?: string;
}
const Label = ({ forId, textContent, className }: Props) => {
  const $label = createElementWithAttribute("label", {
    forId,
  });
  if (className) $label.classList.add(className);

  $label.textContent = textContent;

  return $label;
};

export default Label;
