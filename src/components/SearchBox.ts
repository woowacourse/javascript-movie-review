import createElementWithAttribute from "../utils/createElementWithAttribute";

const Input = () => {
  const InputAttribute = {
    type: "text",
    placeholder: "검색",
  };
  return createElementWithAttribute("input", InputAttribute);
};

const Button = () => {
  const $button = document.createElement("button");
  $button.setAttribute("class", "search-button");
  $button.textContent = "검색";
  return $button;
};

const SearchBox = () => {
  const $searchBox = createElementWithAttribute("div", {
    class: "search-box",
  }) as HTMLDivElement;
  $searchBox.appendChild(Input() as HTMLInputElement);
  $searchBox.appendChild(Button() as HTMLButtonElement);

  return $searchBox;
};
export default SearchBox;
