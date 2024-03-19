import createElementWithAttribute from "../utils/createElementWithAttribute";

const Input = () => {
  const InputAttribute = {
    type: "text",
    placeholder: "검색",
  };

  return createElementWithAttribute("input", InputAttribute);
};

const Button = () => {
  const $button = createElementWithAttribute("button", {
    class: "search-button",
  });
  $button.textContent = "검색";

  return $button;
};

const SearchBox = () => {
  const $searchBox = createElementWithAttribute("div", {
    class: "search-box",
  });
  $searchBox.appendChild(Input());
  $searchBox.appendChild(Button());

  return $searchBox;
};
export default SearchBox;
