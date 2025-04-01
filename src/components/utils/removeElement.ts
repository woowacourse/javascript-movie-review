export default function removeElement(selector: string) {
  const $element = document.querySelector(selector);
  if ($element) $element.remove();
}
