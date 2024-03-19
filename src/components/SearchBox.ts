import setAttributeToElement from "../utils/setAttributeToElement";

const Input = () => {
  const InputAttribute = {
    type: "text",
    placeholder: "검색",
  };
  return setAttributeToElement(InputAttribute, document.createElement("input"));
};

const Button = () => {
  const $button = document.createElement("button");
  $button.setAttribute("class", "search-button");
  $button.textContent = "검색";
  return $button;
};

const SearchBox = () => {
  const $searchBox = setAttributeToElement(
    { class: "search-box" },
    document.createElement("div"),
  ) as HTMLDivElement;
  $searchBox.appendChild(Input() as HTMLInputElement);
  $searchBox.appendChild(Button() as HTMLButtonElement);

  return $searchBox;
};
export default SearchBox;
