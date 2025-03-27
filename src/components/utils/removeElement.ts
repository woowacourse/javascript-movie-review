export default function removeElement(selector: string) {
  const el = document.querySelector(selector);
  if (el) el.remove();
}
