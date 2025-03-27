export const toElement = (element: string) => {
  const template = document.createElement("template");
  template.innerHTML = element;
  const el = template.content.firstElementChild;

  if (!el) {
    throw new Error("유효하지 않은 HTML 형식입니다. 값을 다시 확인해주세요.");
  }

  return el;
};
