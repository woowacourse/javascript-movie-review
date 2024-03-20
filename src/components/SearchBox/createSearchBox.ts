import "./style.css";

import createElement from "../../utils/createElement";

const createSearchBox = (customEventName: string, placeHolder: string) => {
  const div = createElement("div", { class: "search-box" });
  const input = createElement("input", {
    type: "text",
    placeholder: placeHolder,
  }) as HTMLInputElement;
  (input as HTMLInputElement).required = true;
  const button = createElement("button", { class: "search-button" });

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
