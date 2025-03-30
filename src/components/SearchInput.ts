import { createElement } from "../utils/dom.ts";

type SearchInputProps = {
  type: "text" | null;
  placeholder: string;
  onSubmit: (query: string) => void;
};

const SearchInput = ({ type, placeholder, onSubmit }: SearchInputProps) => {
  const searchWrapper = createElement("div", {
    class: ["search-wrapper"],
    innerHTML: `
      <input type="${
        type ?? "text"
      }" class="search-input" placeholder="${placeholder}" />
      <img src="images/Search.png" class="search-icon" alt="검색" />
    `,
  });

  const searchInput = searchWrapper.querySelector(
    ".search-input"
  ) as HTMLInputElement;
  const searchIcon = searchWrapper.querySelector(".search-icon");

  const search = () => {
    const query = searchInput.value.trim();
    if (query !== "") {
      onSubmit(query);
    }
  };

  searchIcon?.addEventListener("click", search);

  searchInput?.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      search();
    }
  });

  return searchWrapper;
};

export default SearchInput;
