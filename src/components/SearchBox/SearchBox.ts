const $SearchBox = () => {
  const $searchBox = createElement("form", {
    className: "search-box",
  });
  const $searchInput = createElement("input", {
    className: "search-input",
    type: "text",
    placeholder: "검색어를 입력하세요",
  });
  const $searchButton = createElement("button", {
    type: "button",
  });
  const $searchIcon = createElement("img", {
    src: "/images/search.svg",
    alt: "search",
  });
  $searchButton.appendChild($searchIcon);
  $searchBox.append($searchInput, $searchButton);
  return $searchBox;
};

export default $SearchBox;
