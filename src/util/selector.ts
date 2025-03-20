function $(selector: string) {
  return document.querySelector(selector);
}

function $all(selector: string) {
  return document.querySelectorAll(selector);
}

export { $, $all };
