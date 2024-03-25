import "./style.css";

import createElement from "../../utils/createElement";

const createSearchBox = (customEventName: string, placeHolder: string) => {
  const div = createElement({ tagName: "div", attrs: { class: "search-box" } });
  const input = createElement({
    tagName: "input",
    attrs: {
      type: "text",
      placeholder: placeHolder,
    },
  }) as HTMLInputElement;

  input.required = true;
  const button = createElement({
    tagName: "button",
    attrs: { class: "search-button" },
  });

  button.addEventListener("click", async (event) => {
    const keyword = input.value;

    document.dispatchEvent(
      new CustomEvent(customEventName, {
        bubbles: true,
        detail: { keyword },
      })
    );

    input.textContent = "";
  });

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      button.click();
    }
  });

  div.append(input, button);

  return div;
};

export default createSearchBox;
