export const createElement = (htmlTemplate:string) => {
  const $el = document.createElement("div");
  $el.innerHTML = htmlTemplate.trim();
  return $el.firstChild;
};
